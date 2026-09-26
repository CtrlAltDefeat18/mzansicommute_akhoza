import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. " +
      "Make sure wrangler.toml has [[d1_databases]] with binding = \"DB\", " +
      "and that you have run: wrangler d1 create mzansimove-db"
    );
  }
  return drizzle(env.DB, { schema });
}
