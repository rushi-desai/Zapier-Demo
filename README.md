# Zapier Clone (Hooks + Processor)

Two separate services in this repo:

- `hooks`: Express webhook receiver for Zapier-style catch hooks.
- `processor`: Background worker placeholder for processing runs.

## Structure

```
/ hooks
  /prisma
  /src
/ processor
  /src
```

## Requirements

- Node.js 18+ (recommended)
- PostgreSQL

## Environment Variables

Create a `.env` file in `hooks/` with:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME"
```

## Setup

From the repo root:

```
cd hooks
npm install
```

## Database

Prisma is configured in `hooks/prisma.config.ts` and the schema is in `hooks/prisma/schema.prisma`.

Generate the Prisma client and run migrations as needed:

```
npx prisma generate
npx prisma migrate dev
```

## Run Hooks Service

```
cd hooks
npm run start
```

The webhook route is:

```
POST /hooks/catch/:userId/:zapId
```

## Processor Service

`processor` is currently a minimal placeholder. Add logic in `processor/src/index.ts` and wire up scripts in `processor/package.json` when ready.

## Notes

- The hooks service is intended to receive Zapier-like webhooks and enqueue work for processing.
- The processor service can later consume outbox records or queue messages and execute actions.
