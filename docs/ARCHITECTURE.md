# Architecture

## Current repository architecture

The current web application uses:

- Next.js-style App Router architecture.
- React Server Components by default.
- vinext + Vite as the bridge to Cloudflare Workers.
- Cloudflare Workers as the deployment runtime.
- Cloudflare D1 as the current database.
- Drizzle ORM for database access/migrations.
- TypeScript in strict mode.
- authored CSS in `app/globals.css`.
- performance-tier gating for heavier animation.

## Key areas

```text
app/
  api/
  components/
  lib/
  globals.css
  layout.tsx
  page.tsx

db/
worker/
public/
tests/

vite.config.ts
wrangler.toml
next.config.ts
eslint.config.mjs
tsconfig.json
```

## Rendering rule

Server Components are the default.

A component should become a Client Component only when it needs:
- browser APIs;
- client state/effects;
- event handling;
- client-only third-party libraries.

## Runtime boundary

Cloudflare Workers is not a conventional Node server.

Do not assume access to unrestricted:
- filesystem APIs;
- child processes;
- native Node modules.

## Performance boundary

Expensive motion/features must respect the repository's performance tier.

Heavy animation libraries should be dynamically imported rather than always bundled/initialised.

## Infrastructure naming

Legacy `mzansimove-*` names may still exist in deployed/configuration identifiers.

Do not rename those as part of ordinary brand cleanup. Treat infrastructure renaming as a migration task.

## Current unresolved engineering items

Codex onboarding reported:
- lockfile inconsistency;
- build configuration issues;
- stale tests;
- lint/type errors;
- missing Cloudflare typing setup.

These are engineering-baseline issues and should be resolved before major product expansion.

## Architecture principle

Prefer boring, explicit, inspectable architecture over abstraction for its own sake.

This is a small pre-pilot product. Complexity must earn its maintenance cost.
