import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";   // ← new import
import { Kafka } from "kafkajs";
import "dotenv/config";   // ← if you're using .env (recommended)

// Load from .env — make sure DATABASE_URL is set
// Example: postgresql://user:password@localhost:5432/mydb?schema=public
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const adapter = new PrismaPg({
  connectionString,
  // Optional extras you can add:
  // schema: 'public',          // if using non-default schema
  // ssl: { rejectUnauthorized: false },   // if self-signed cert / Supabase etc.
});

const prisma = new PrismaClient({
  adapter,   // ← this is the required change for Prisma 7+
  // Optional: useful for debugging
  // log: ['query', 'info', 'warn', 'error'],
});

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap-events";

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10, // limit
    });

    if (pendingRows.length === 0) {
      // Optional: avoid tight loop when no work → sleep 1–5 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      continue;
    }

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => ({
        value: r.zapRunId,   // assuming zapRunId is string or you want to JSON.stringify it
        // Optional: better to send structured data
        // value: JSON.stringify({ zapRunId: r.zapRunId, ...otherFields })
      })),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x) => x.id),
        },
      },
    });

    console.log(`Processed and deleted ${pendingRows.length} outbox rows`);
  }
}

main();