// export * from "drizzle-orm/expressions";

// const psClient = new Client({ url: connectionStr.href });

// export const db = drizzle(psClient, { schema });

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env as envChecker } from '../env'
import * as schema from './schema'

// import { drizzle } from "drizzle-orm/planetscale-serverless";

// import { connectionStr } from "./drizzle.config";
// import * as auth from "./schema/auth";
// import * as post from "./schema/post";

// export const schema = { ...auth, ...post };

export { tableCreator } from './schema/_table'

const env = envChecker as {
  DATABASE_URL: string
  NODE_ENV: string
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const client =
  globalForDb.conn ??
  postgres(env.DATABASE_URL as unknown as string, {
    max: 1,
    onnotice: () => null,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
  })

if ((env.NODE_ENV as unknown as string) !== 'production')
  globalForDb.conn = client

export const db = drizzle(client, {
  schema,
  logger: true,
})
