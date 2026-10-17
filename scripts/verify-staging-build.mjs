import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

// This path was verified against the vinext/Cloudflare Vite build output.
const configPath = "dist/server/wrangler.json";
const config = JSON.parse(await readFile(configPath, "utf8"));
const source = await readFile("wrangler.toml", "utf8");
const staging = source.slice(source.indexOf("[env.staging]"));
const value = (key) => staging.match(new RegExp(`^${key} = "([^"]+)"`, "m"))?.[1];
assert.equal(config.targetEnvironment, "staging");
assert.equal(config.name, "mzansimove-web-staging");
assert.equal(config.account_id, value("account_id"));
assert.equal(config.vars.SITE_ENV, "staging");
assert.equal(config.workers_dev, true);
assert.ok(config.compatibility_flags.includes("nodejs_compat"));
assert.equal(config.observability.enabled, true);
assert.equal(config.observability.head_sampling_rate, 1);
assert.equal(config.d1_databases.length, 1);
assert.equal(config.d1_databases[0].binding, "DB");
assert.equal(config.d1_databases[0].database_name, "mzansicommute-staging");
assert.equal(config.d1_databases[0].database_id, value("database_id"));
assert.equal(config.d1_databases[0].migrations_dir, "drizzle");
assert.equal(config.assets.binding, "ASSETS");
assert.equal(config.main, "index.js");
assert.equal(config.assets.directory, "../client");
await access(resolve(dirname(configPath), config.main));
assert.ok((await readdir(resolve(dirname(configPath), config.assets.directory))).length > 0);
const redirect = JSON.parse(await readFile(".wrangler/deploy/config.json", "utf8"));
assert.equal(resolve(".wrangler/deploy", redirect.configPath), resolve(configPath));
console.log(`Verified staging deployment config: ${configPath}`);
// Print deployment settings only; avoid dumping any future unrelated vars/secrets.
console.log(JSON.stringify({
  name: config.name,
  account_id: config.account_id,
  targetEnvironment: config.targetEnvironment,
  main: config.main,
  assets: config.assets,
  d1_databases: config.d1_databases,
  vars: { SITE_ENV: config.vars.SITE_ENV },
  compatibility_flags: config.compatibility_flags,
  workers_dev: config.workers_dev,
  observability: config.observability,
}, null, 2));
