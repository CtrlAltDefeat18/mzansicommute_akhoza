# Deployment

## Current target

The repository is designed around Cloudflare Workers with vinext/Vite integration.

## Load-bearing files

Treat these as high-risk:
- `wrangler.toml`;
- `vite.config.ts`;
- `worker/index.ts`;
- D1 binding configuration;
- generated deployment entry paths.

## Legacy names

Some infrastructure identifiers still use the previous MzansiMove naming.

Do not rename:
- Worker names;
- D1 database names;
- binding names;
- domains;
- deployment targets

unless a migration has been planned and the remote resource mapping is understood.

## Pre-deploy gate

Before production deployment:
- clean install succeeds;
- lint passes;
- typecheck passes;
- tests pass;
- production build passes;
- secrets are present in platform secret storage;
- database migrations have been reviewed;
- robots/indexing state is intentional;
- public claims have been reviewed.

## Current limitation

The Codex onboarding process reported that the default build/deployment configuration needs cleanup.

Do not describe deployment as production-ready until that baseline is green.
