"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg"); // ← new import
const kafkajs_1 = require("kafkajs");
require("dotenv/config"); // ← if you're using .env (recommended)
// Load from .env — make sure DATABASE_URL is set
// Example: postgresql://user:password@localhost:5432/mydb?schema=public
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set in .env");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString,
    // Optional extras you can add:
    // schema: 'public',          // if using non-default schema
    // ssl: { rejectUnauthorized: false },   // if self-signed cert / Supabase etc.
});
const prisma = new client_1.PrismaClient({
    adapter, // ← this is the required change for Prisma 7+
    // Optional: useful for debugging
    // log: ['query', 'info', 'warn', 'error'],
});
const kafka = new kafkajs_1.Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"],
});
const TOPIC_NAME = "zap-events";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        yield producer.connect();
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const pendingRows = yield prisma.zapRunOutbox.findMany({
                where: {},
                take: 10, // limit
            });
            if (pendingRows.length === 0) {
                // Optional: avoid tight loop when no work → sleep 1–5 seconds
                yield new Promise((resolve) => setTimeout(resolve, 2000));
                continue;
            }
            yield producer.send({
                topic: TOPIC_NAME,
                messages: pendingRows.map((r) => ({
                    value: r.zapRunId, // assuming zapRunId is string or you want to JSON.stringify it
                    // Optional: better to send structured data
                    // value: JSON.stringify({ zapRunId: r.zapRunId, ...otherFields })
                })),
            });
            yield prisma.zapRunOutbox.deleteMany({
                where: {
                    id: {
                        in: pendingRows.map((x) => x.id),
                    },
                },
            });
            console.log(`Processed and deleted ${pendingRows.length} outbox rows`);
        }
    });
}
main();
