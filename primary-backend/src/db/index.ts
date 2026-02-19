// src/db/index.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Load .env early (best place is usually at the very top of your entry file, but this works too)
import "dotenv/config";  // ← ADD THIS LINE (or use your existing dotenv setup)

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env file");
}

const pool = new Pool({
  connectionString,
  // optional tuning for dev
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({
  adapter,
  // optional: see slow queries / debug in dev
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});