import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Contact form submissions from the pilot interest form.
 * Stored in Cloudflare D1 (SQLite).
 * Run `npm run db:generate` after changing this file,
 * then `npm run db:migrate` to apply locally.
 */
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull().default(""),
  // ISO 8601 string — D1 has no native timestamp type
  createdAt: text("created_at").notNull(),
  // Store the raw IP for abuse review only — never exposed publicly
  ipAddress: text("ip_address"),
});
