# Cloudflare staging

This prepares a named staging Worker; it does not deploy or apply remote migrations.
Default Worker `mzansimove-web`, database `mzansimove-db`, `DB`/`ASSETS` bindings,
and production vars are preserved. The default database ID remains an unresolved
placeholder. The confirmed staging account and D1 ID live in `wrangler.toml`.

## Cloudflare Workers Builds settings

| Setting | Value |
| --- | --- |
| Project / Worker | `mzansimove-web-staging` |
| Root directory | Repository root (`/`) |
| Node | `24.19.0` verified; package requires >=22.13.0 |
| Install command | `npm ci` (or `bash scripts/install.sh`) |
| Build command | `npm run build:staging` |
| Build environment variable | `CLOUDFLARE_ENV=staging` (also set by the script) |
| Deploy command | `npm run deploy:staging` |
| Non-production branch deploy command | Disable automatic branch deployments during preparation |
| Worker variable | `SITE_ENV=staging` |
| Compatibility | `nodejs_compat`, date `2024-09-23` |
| workers.dev | Enabled |
| Observability | Enabled, head sampling rate 1 |

`deploy:staging` deliberately rebuilds and verifies staging before running
`wrangler deploy --config dist/server/wrangler.json`. This prevents a later
ordinary build or test command from causing deployment of the default Worker.
The generated config already resolves the named environment: do not pass `--env`
to that generated config. Configure Cloudflare authentication through platform
secrets, never repository files. No deployment command was executed in preparation.

Use Workers Builds, not a Pages upload of a guessed `_worker.js`. There is no
separate Pages output-directory setting for this Worker deployment.

## Verified build contract

- Source entrypoint: `worker/index.ts`, matching the installed vinext initializer's
  preference for an existing custom Worker. `worker/index.ts` is unchanged.
- Generated deployment configuration: `dist/server/wrangler.json`.
- Generated Worker: `dist/server/index.js` (`main = index.js` in generated config).
- Static output: `dist/client/` (`assets.directory = ../client` in generated config),
  with binding `ASSETS`.
- `.wrangler/deploy/config.json` points to the generated server config.
- `build:staging` verifies these paths, the staging Worker/account/D1 mapping,
  `DB`, `SITE_ENV`, compatibility and observability, then prints the verified
  deployment fields to build output. It does not dump arbitrary runtime vars.
- The same verifier rejects a default-environment build.

`vite.config.ts` already had no inline D1 block or fake UUID at the inspected
baseline. Wrangler remains the single source of binding configuration. All active
bindings (`ASSETS`, `DB`) and vars (`SITE_ENV`) are redeclared under `env.staging`.
The commented optional image binding remains inactive.

## Explicit migrations

```sh
npm run db:migrate:staging:local
# wrangler d1 migrations apply DB --env staging --local --config wrangler.toml

npm run db:migrate:staging:remote
# wrangler d1 migrations apply DB --env staging --remote --config wrangler.toml
```

Both commands explicitly read source `wrangler.toml`, not the build redirect.
`migrations_dir = drizzle` selects the generated SQL directory. `drizzle/` was
absent; `npm run db:generate` generated `0000_classy_cammi.sql` and metadata from
unchanged `db/schema.ts`. It creates only `contact_submissions` with the existing
seven columns. The local migration was applied successfully. Remote migrations
were not run; review existing remote schema/migration history before applying
this initial migration to an already-populated database.

Installation and boot must not run migrations. `scripts/install.sh` only installs.
The external workspace `/workspace/onboarding-install.sh` also had its automatic
`db:migrate` and nonexistent `check` calls removed; that external file is not part
of Git. Point future environment setup at the committed install script.

## Verification and remaining blockers

Verified with Node 24.19.0 / npm 11.9.0:

| Check | Baseline | After infrastructure changes |
| --- | --- | --- |
| `npm ci --no-audit --no-fund` | Failed: lock missing gsap and lenis | Passed: 481 packages installed |
| `npm run lint` | Failed: 5 application errors | Same 5 errors; 2 warnings from pre-existing ignored work declaration file |
| `npm run typecheck` | Missing script; direct tsc fails | Script added; still fails on existing component typing |
| `npm run test` | Fails; baseline build also fails | Default build passes, stale tests fail |
| `npm run build` | Missing `dist/_worker.js` source | Passes as part of test command |
| `npm run build:staging` | Missing script | Passes, including config/output verification |
| Local staging migration | Missing migration directory | Generated SQL applies successfully |

The first install attempt also hit sandbox network EPERM. Retrying with network
access exposed the reproducible lockfile mismatch. npm regenerated the lockfile;
no dependency version was intentionally upgraded. npm also normalised lockfile
formatting and optional-platform metadata.

Remaining application failures: four accessibility role errors in
`app/components/Nav.tsx`, one unescaped apostrophe in `app/page.tsx`, nullable SVG
references in `RouteLine.tsx`, and a `ContactForm.tsx` response-typing error with
the workspace's existing generated Worker declarations. An additional typecheck
excluding ignored `work/` files exposes missing `cloudflare:workers`, `Fetcher`
and `D1Database` types: a clean checkout still needs Cloudflare typing setup.
No ignored generated declarations are committed or relied upon for a passing check.

The rendered-HTML tests expect removed starter metadata and
`app/_sites-preview/SkeletonPreview.tsx`; direct execution confirms both failures.
No assertions were weakened. `check` remains absent and is not invoked at boot.

Build warnings remain for missing `/cursors/hand-open.svg` and
`/cursors/hand-point.svg`, and vinext's inability to statically classify `/`.
These do not fail the build. Passing a build does not establish full release
readiness while lint/type/tests fail.

`.github/workflows/ci.yml` is absent in the inspected repository and current main;
there is no existing deploy job to gate. No automatic production deployment job
was added. Default resource names/bindings and application/schema semantics are
unchanged.
