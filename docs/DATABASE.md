# Database

## Current database

Cloudflare D1 is the current persistence layer.

Drizzle ORM is used for schema definition and database access.

## Current known domain

The current confirmed persisted domain is contact/pilot-interest submission data.

Typical fields include:
- name;
- email;
- role;
- message;
- created timestamp;
- abuse-review metadata where applicable.

The exact schema in `db/schema.ts` remains authoritative.

## Rules

- Never hand-edit generated migration files casually.
- Run schema generation after schema changes.
- Review destructive operations explicitly.
- Treat column renames as migrations, not cosmetic refactors.
- Never commit production D1 data or exports.
- Do not log contact-submission payloads casually.

## Future data domains

The founder/product documents imply possible future domains such as:
- vehicles;
- operators/owners;
- drivers;
- routes/corridors;
- fare events;
- trips;
- maintenance records;
- association relationships;
- consent grants;
- partner-access policies.

These are **not yet approved schema requirements**.

Before implementing them, define:
1. who owns the data;
2. lawful/ethical basis for collection;
3. minimum fields required;
4. retention;
5. visibility/access;
6. deletion/correction process;
7. aggregation/anonymisation strategy.
