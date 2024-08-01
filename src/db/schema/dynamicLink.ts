import { pgTable, text, timestamp, jsonb, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export type DynamicLink = typeof dynamicLinks.$inferSelect; // return type when queried
export type NewDynamicLink = typeof dynamicLinks.$inferInsert; // insert type
export const dynamicLinks = pgTable('dynamic_links', {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    shortCode: varchar('short_code', { length: 255 }).unique(),
    targetUrl: text('target_url'),
    createdBy:  text('created_by').references(() => users.id),
    qrStyleOptions: jsonb('qr_style_options'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  });