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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
require("dotenv/config");
// Create a connection pool (use your env var)
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    // optional: max: 20, etc. for tuning
});
const adapter = new adapter_pg_1.PrismaPg(pool);
// Now instantiate with the adapter
const client = new client_1.PrismaClient({ adapter });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/hooks/catch/:userId/:zapId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, zapId } = req.params;
    const body = req.body;
    yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const run = yield tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            },
        });
        yield tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            },
        });
    }));
    res.json({ message: 'Hook received' });
}));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
