import { config } from 'dotenv';

config({ path: '.env.local' });

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    }
});