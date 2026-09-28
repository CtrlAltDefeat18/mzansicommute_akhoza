# MzansiCommute web

MzansiCommute is a pre-pilot mobility data venture focused on South Africa's minibus taxi economy.

This repository contains the public-facing landing page and pilot-interest flow. The site is intended to establish trust with taxi owners and associations, insurers and financial-services partners, and research/public-sector partners.

## Product status

The venture is pre-pilot and pre-revenue.

Any scorecard or traction number on the site must be clearly labelled as a target, verified result, or sourced published statistic. Do not present pilot targets as achieved traction.

Founder-identifying information is intentionally excluded from the public site and repository. See `AGENTS.md` before changing copy, imagery, backing information, or public contact details.

## Stack

- Next.js App Router / React
- vinext + Vite
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- TypeScript
- ESLint with jsx-a11y
- Tailwind 4 through PostCSS, with authored site classes in `app/globals.css`

Some infrastructure identifiers still use the previous `mzansimove-*` naming. Do not rename Worker, D1, binding, deployment, or domain identifiers as part of a cosmetic brand cleanup.

## Local development

Requirements:
- Node.js 22.13 or newer
- npm

Install and run:

```bash
npm ci
npm run dev
```

## Quality checks

Before opening or merging a PR:

```bash
npm run check
```

This runs linting, TypeScript checking, a production build, and the repository tests.

Individual commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

GitHub Actions runs the baseline quality workflow for pull requests and pushes to `main`.

## Database

The contact form stores submissions in Cloudflare D1 through Drizzle ORM.

```bash
npm run db:generate
npm run db:migrate
npm run db:migrate:prod
```

Never commit production contact submissions, database exports, API tokens, or real environment secrets.

## Deployment

Deployment uses Cloudflare Workers through Wrangler:

```bash
npm run deploy
```

Review `wrangler.toml`, `vite.config.ts`, and `worker/index.ts` before changing deployment behaviour. These files are load-bearing.

## AI/Codex contributors

Read `AGENTS.md` fully before making changes. It defines product-safety, founder-privacy, accessibility, performance, security, data-migration, and definition-of-done requirements.
