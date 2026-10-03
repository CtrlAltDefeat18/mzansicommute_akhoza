# AGENTS.md — MzansiCommute

> Authoritative repository-level instructions for Codex and any other AI coding agent.
> Read this file fully before touching code.
> If a user request conflicts with a non-negotiable safety, privacy, security, or data-integrity rule here, surface the conflict instead of silently overriding it.

## 1. Product Purpose

MzansiCommute is a pre-pilot mobility-data venture focused on South Africa's minibus taxi industry.

The current public website is primarily a trust-establishing surface for:
1. Taxi owners and associations.
2. Insurers and financial-services firms.
3. Research and public-sector bodies.

This is not currently a commuter route-planning app and not a ride-hailing marketplace.

The venture is pre-pilot and pre-revenue. Any traction, usage, deployment, partner, safety, financial, or performance claim must clearly distinguish between verified results, pilot targets, sourced published statistics, and future plans or hypotheses.

Never present targets as achieved traction.

## 2. North Star

MzansiCommute exists to help the taxi industry become legible on its own terms.

The product thesis is:
- useful operator-side records first;
- consented data value later;
- trust before scale;
- utility before extraction.

Read `docs/NORTH_STAR.md`, `docs/CONSTITUTION.md`, and `docs/PRODUCT.md` before making product-level decisions.

## 3. Founder Safety — Non-Negotiable

The public site and repository must not expose information that identifies or narrows the identity or location of the founder where that creates avoidable risk.

Do not add:
- founder name;
- founder photograph or identifying imagery;
- founder initials as a visual identity or monogram;
- private contact details;
- school, neighbourhood, association membership, or similarly identifying personal detail;
- internal story details that make the founder or team easier to identify.

Do not improve credibility by adding personal biography.

Institutional backing may be named where approved.

The internal founder/origin story may contain real names and exact locations. Treat those as internal unless explicitly approved for publication.

## 4. Product Principles

### Build with, not at
MzansiCommute must not behave like an outsider arriving to fix the taxi industry.

### Utility before extraction
Do not design systems whose only meaningful beneficiary is an insurer, lender, investor, government body, or MzansiCommute itself.

### Consent is architecture
Any feature involving operational, payment, trip, route, driver, or partner-access data must consider what is collected, why it is collected, who benefits, who can access it, retention, aggregation, anonymisation limits, and revocation or permission changes.

### Performance is inclusion
The site must remain useful on constrained South African mobile networks and modest devices. Heavy animation is enhancement, not infrastructure.

## 5. Current Architecture

The current repository uses:
- Next.js-style App Router architecture;
- React Server Components by default;
- vinext + Vite;
- Cloudflare Workers runtime;
- Cloudflare D1;
- Drizzle ORM;
- TypeScript strict mode;
- ESLint with accessibility rules;
- Tailwind 4 through PostCSS, with authored classes in `app/globals.css`;
- performance-tier gating for expensive motion.

Important structure:

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

## 6. Server vs Client Components

Server Components are the default.

A component may live in `app/components/` without being a Client Component.

Add `"use client"` only when the component requires browser APIs, event handlers, React client state/effects, or client-only third-party libraries.

Avoid `useEffect` for data fetching when a Server Component or route handler is appropriate. Prefer CSS over client-side layout measurement.

## 7. Cloudflare Runtime Constraints

Production runs on Cloudflare Workers, not a conventional Node.js server.

Do not assume unrestricted access to `fs`, `path`, `child_process`, native Node modules, or long-lived local filesystem state.

Treat `worker/index.ts`, `vite.config.ts`, and `wrangler.toml` as load-bearing.

Do not casually alter deployment entrypoints, bindings, compatibility flags, or generated worker paths.

## 8. Legacy Infrastructure Names

Some infrastructure identifiers may still use older `mzansimove-*` naming.

Do not rename Worker names, D1 database names, bindings, domains, or deployment targets as part of cosmetic rebranding.

Infrastructure renaming must be handled as an explicit migration task after confirming remote resource mappings.

## 9. Commands

Use package scripts as the canonical interface.

Expected baseline:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
npm run db:generate
npm run db:migrate
npm run db:migrate:prod
npm run deploy
```

If one of these scripts does not yet exist or currently fails, report that fact instead of inventing success.

The normal pre-PR target is `npm run check`.

## 10. Current Engineering Baseline

Recent onboarding findings include:
- lockfile inconsistency;
- build/runtime configuration issues;
- stale tests;
- lint/type errors;
- Cloudflare typing/setup gaps.

Do not hide or work around these silently.

Prefer making the baseline green before large feature work.

When fixing baseline problems:
1. reproduce;
2. isolate the cause;
3. make the smallest coherent fix;
4. rerun the failing command;
5. rerun adjacent quality checks;
6. inspect the diff.

Do not redesign the product while fixing build infrastructure unless explicitly requested.

## 11. TypeScript Standards

- `strict: true` is non-negotiable.
- No `@ts-ignore`.
- Avoid `any`; if unavoidable, explain why in a nearby comment.
- Prefer `unknown` for untyped external input and narrow it.
- Use `import type` for type-only imports.

## 12. CSS and UI Standards

- Keep site styles in `app/globals.css` unless there is a deliberate architecture decision to change this.
- Use CSS custom properties for design tokens.
- Avoid inline styles except for genuinely dynamic values.
- Do not introduce utility-class soup into JSX.
- Build mobile-first.
- Preserve touch/coarse-pointer behaviour.
- Preserve the existing textured, high-contrast visual direction unless a redesign is explicitly requested.

Read `docs/BRAND.md`, `docs/DESIGN_SYSTEM.md`, and `docs/COPY_GUIDE.md` before significant visual changes.

## 13. Brand Direction

The product should feel:
- bold, not loud;
- serious with cultural warmth;
- accessible-first, premium in execution;
- textured, not sterile;
- confident without hype.

Useful reference qualities:
- Capitec: simplicity and accessibility;
- Yoco: infrastructure that fits South African business reality;
- Apple: precision and economy of language;
- Nike: confidence without lone-hero framing.

Explicit anti-reference:
- Uber-like disruption posture that bypasses local legitimacy.

Avoid generic SaaS minimalism that removes context and texture from the industry being represented.

## 14. Copy Rules

Use South African English.

Use direct, evidence-aware language.

Use present tense only for capabilities that exist now.

Use future or conditional language for post-pilot capabilities, insurer products, financial-service products, public-sector products, and unverified scale.

Avoid:
- revolutionary;
- world-class;
- industry-leading;
- game-changer;
- disrupting the taxi industry;
- formalising the informal sector;
- unsupported safety claims;
- unsupported insurance or lending claims.

Every quantitative claim must be clearly one of:
1. verified internal result;
2. sourced published statistic;
3. explicitly labelled target.

## 15. Accessibility

Target WCAG 2.1 AA minimum.

Non-negotiables:
- all interactive elements work by keyboard;
- visible focus remains available;
- never globally remove outlines;
- inputs/selects/textareas have associated labels;
- images have meaningful alt text or explicit decorative treatment;
- errors use `role="alert"`;
- success/status messaging uses `role="status"` or an appropriate live region;
- disabled controls are visibly distinct;
- touch targets remain usable;
- honeypot fields remain excluded from keyboard and assistive-technology interaction.

Accessibility is product quality, not polish.

## 16. Motion and Performance

The repository includes a full/lite performance-tier concept.

Rules:
- expensive animation libraries must not be imported unconditionally at module scope;
- heavy animation should be gated behind the full tier;
- lite-tier users receive a complete static experience;
- pending detection must not block core content;
- respect `prefers-reduced-motion`;
- Lenis must not initialise when reduced motion is requested;
- GSAP or similar animation must have a no-motion fallback.

Do not casually change performance-tier thresholds or probe timing.

## 17. Security and Privacy

Never commit:
- Cloudflare API tokens;
- email-provider keys;
- real `.env` secrets;
- D1 exports;
- user-submitted contact data;
- founder-identifying information.

Use platform secret stores for runtime secrets.

Do not log personal data casually.

Security controls must not turn the product into surveillance infrastructure.

## 18. Contact API

The current contact/pilot-interest route is a security boundary.

Preserve:
- server-side validation;
- server-side honeypot checking;
- explicit input length bounds;
- parameterised Drizzle operations;
- safe error responses;
- Cloudflare Worker compatibility.

Do not expose database errors, stack traces, infrastructure details, or user-submitted personal data.

## 19. Database and Migrations

The schema source is authoritative in `db/schema.ts`.

Rules:
- do not hand-edit generated migrations casually;
- run schema generation after schema changes;
- review destructive migrations explicitly;
- column renames require migration planning;
- do not commit real production data;
- preserve the current D1 binding unless a migration is explicitly planned.

Future data domains such as vehicles, owners, drivers, trips, routes, fare events, maintenance, consent, and partner access are not automatically approved schema requirements.

Before implementing a new domain, define:
1. purpose;
2. owner;
3. sensitivity;
4. minimum required fields;
5. access roles;
6. retention;
7. consent;
8. deletion/correction process;
9. migration strategy.

## 20. API Design

Validate at the boundary.

Prefer explicit input schemas, stable response shapes, bounded strings, safe errors, and Worker-compatible implementation.

Do not create payment, operator, trip, insurer, or association APIs based only on product aspiration.

A payment API requires separate decisions covering provider, settlement, refunds, PCI/security responsibility, reconciliation, failure handling, and commuter identity requirements.

## 21. Testing

Current and future tests should reflect the actual product, not a stale starter template.

Before merging applicable changes:
- lint;
- typecheck;
- tests;
- production build;
- targeted regression checks.

Future testing may include unit tests for pure utilities, axe accessibility checks, Playwright E2E, and dependency/security scanning.

Introduce tooling incrementally.

## 22. Definition of Done

A change is done when applicable items below are true:

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] `npm run build` passes.
- [ ] No secrets or submitted personal data were committed.
- [ ] No founder-identifying detail was introduced.
- [ ] Targets/results/statistics are labelled accurately.
- [ ] New interactions are keyboard-operable.
- [ ] Focus remains visible.
- [ ] New motion respects reduced-motion and performance-tier rules.
- [ ] New environment variables are documented safely.
- [ ] Schema changes include reviewed generated migrations.
- [ ] Infrastructure identifiers were not changed casually.
- [ ] The diff was reviewed.
- [ ] Remaining limitations are reported honestly.

## 23. Things Agents Must Never Casually Change

These require explicit task intent and consequence review:

- `worker/index.ts`
- `vite.config.ts`
- `wrangler.toml`
- Cloudflare/D1 binding names
- deployment entrypoints
- legacy infrastructure identifiers
- `public/robots.txt`
- indexing metadata in `app/layout.tsx`
- proof/scorecard target labels
- founder/backing presentation
- `db/schema.ts` column semantics
- performance-tier thresholds
- `package-lock.json` by manual editing
- LF line-ending policy
- consent/data-sharing meaning
- public partner claims

## 24. Git and Commits

Prefer Conventional Commits:
- `feat:`
- `fix:`
- `docs:`
- `test:`
- `refactor:`
- `chore:`
- `ci:`

Keep commits focused.

Do not commit debug noise, temporary logs, generated secrets, or unrelated cleanup bundled into a functional change.

## 25. AI Agent Workflow

Before editing:
1. Read `AGENTS.md`.
2. Read relevant docs.
3. Inspect relevant code.
4. Identify load-bearing files.
5. State important assumptions.
6. Keep the requested scope narrow.

After editing:
1. Run relevant checks.
2. Review the diff.
3. Report what changed.
4. Report what was tested.
5. Separate new failures from pre-existing failures.
6. Do not claim success if verification failed.

AI agents are contributors, not product authorities.

They must not silently:
- change product strategy;
- change privacy promises;
- relax security controls;
- expose founder identity;
- relabel targets as achievements;
- introduce new external data-sharing pathways;
- deploy to production.

## 26. Documentation Order for New Tasks

For most significant tasks, read in this order:

1. `AGENTS.md`
2. `docs/NORTH_STAR.md`
3. `docs/CONSTITUTION.md`
4. task-specific documentation

Common task docs:

### Product / strategy
- `docs/PRODUCT.md`
- `docs/ROADMAP.md`
- `docs/USER_PERSONAS.md`

### Brand / frontend
- `docs/BRAND.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/COPY_GUIDE.md`

### Backend / data
- `docs/ARCHITECTURE.md`
- `docs/DATABASE.md`
- `docs/API.md`
- `docs/SECURITY.md`

### Release / infrastructure
- `docs/DEPLOYMENT.md`
- `docs/OPERATIONS.md`

### AI-assisted implementation
- `docs/AI_GUIDELINES.md`
- relevant file under `prompts/`

## 27. Final Principle

When uncertain, optimise for trust, truth, consent, operator value, accessibility, and maintainability.

Do not optimise for novelty at their expense.

