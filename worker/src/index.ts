// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";   // ← new import
import { Kafka } from "kafkajs";
//import "dotenv/config";   // ← if you're using .env (recommended)

// Load from .env — make sure DATABASE_URL is set
// Example: postgresql://user:password@localhost:5432/mydb?schema=public
// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error("DATABASE_URL is not set in .env");
// }

// const adapter = new PrismaPg({
//   connectionString,
//   // Optional extras you can add:
//   // schema: 'public',          // if using non-default schema
//   // ssl: { rejectUnauthorized: false },   // if self-signed cert / Supabase etc.
// });

// const prisma = new PrismaClient({
//   adapter,   // ← this is the required change for Prisma 7+
//   // Optional: useful for debugging
//   // log: ['query', 'info', 'warn', 'error'],
// });

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});



async function main() {  
   
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });


    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
            // Here you would typically process the message and then mark it as processed in your database
            // For example, you might update a "processed" flag in your outbox table for the corresponding zapRunId
       
       

            await new Promise(r => setTimeout(r, 5000))

            console.log("Done processing message, committing offset...");

            //
            await consumer.commitOffsets([
                { topic, partition, offset: (Number(message.offset) + 1).toString() },
            ]);
        }
            

          
    })


}

main()

