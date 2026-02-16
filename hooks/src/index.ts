import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import "dotenv/config";

// Create a connection pool (use your env var)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // optional: max: 20, etc. for tuning
});

const adapter = new PrismaPg(pool);

// Now instantiate with the adapter
const client = new PrismaClient({ adapter });

const app = express();
app.use(express.json());

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;


    await client.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

  res.json({ message: 'Hook received' }); 
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});