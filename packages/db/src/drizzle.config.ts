import type { Config } from 'drizzle-kit'

import { env as envChecker } from '../env'

const env = envChecker as {
  DATABASE_URL: string
  NODE_ENV: string
}

const dbUrl = env.DATABASE_URL

if (!dbUrl) {
  console.debug('🔴 Cannot find database url')
}

export default {
  schema: './schema',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: dbUrl,
  },
} satisfies Config

// Push requires SSL so use URL instead of username/password
// export const connectionStr = new URL(`mysql://${env.DB_HOST}/${env.DB_NAME}`);
// connectionStr.username = env.DB_USERNAME;
// connectionStr.password = env.DB_PASSWORD;
// connectionStr.searchParams.set("ssl", '{"rejectUnauthorized":true}');

// export default {
//   schema: "./src/schema",
//   driver: "mysql2",
//   dbCredentials: { uri: connectionStr.href },
//   tablesFilter: ["t3turbo_*"],
// } satisfies Config;
