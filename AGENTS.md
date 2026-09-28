# AGENTS.md — MzansiCommute Web

> This file is the repository-level source of truth for AI coding agents working on MzansiCommute.
> Read it before changing files. If a user request conflicts with a non-negotiable safety, privacy,
> security, or data-integrity rule here, surface the conflict instead of silently overriding it.

## 1. Product purpose

MzansiCommute is a pre-pilot, investor/insurer-facing landing page for a mobility data venture focused
on South Africa's minibus taxi industry.

Primary audiences:
1. Taxi owners and associations — potential pilot partners.
2. Insurers and financial-services firms — potential data-product partners.
3. Research and public-sector bodies — potential grant, evidence, and policy partners.

This is a trust-establishing product surface, not a commuter app. The venture is deliberately pre-pilot
and pre-revenue. Targets must never be presented as achieved traction.

### Founder safety — non-negotiable

The public site and repository must not expose information that identifies or narrows the identity or
location of the founder. Do not add:
- founder name;
- founder photograph or identifying imagery;
- founder initials as a visual identity/monogram;
- school, neighbourhood, association membership, private contact details, or similar identifying clues.

Institutional backing may be named where approved. Do not "improve" credibility by adding personal details.

## 2. Current architecture

- Next.js App Router with React Server Components by default.
- vinext + Vite bridge the Next-style application to Cloudflare Workers.
- Cloudflare Workers is the production runtime; do not assume a Node.js server runtime.
- Cloudflare D1 + Drizzle ORM store contact submissions.
- Tailwind 4 is present through PostCSS, but the site uses authored classes in `app/globals.css`, not utility-heavy JSX.
- `app/lib/perf.ts` provides the full/lite performance tier used to gate expensive motion.
- Existing client-only behaviour uses explicit `"use client"`; components without client needs should remain server-compatible.

Important paths:

```text
app/
  api/contact/route.ts
  components/
  lib/perf.ts
  globals.css
  layout.tsx
  page.tsx
db/
  index.ts
  schema.ts
worker/index.ts
public/
tests/
wrangler.toml
vite.config.ts
next.config.ts
eslint.config.mjs
tsconfig.json
```

### Legacy infrastructure names

Some deployed/configuration identifiers still use the old `mzansimove-*` naming (for example Worker/D1
identifiers). Do not rename infrastructure identifiers, bindings, database names, domains, or deployment
targets as part of a cosmetic brand change. Migrate them only through an explicit infrastructure task.

## 3. Commands

Use the package scripts as the canonical developer interface:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run check
npm run db:generate
npm run db:migrate
npm run db:migrate:prod
npm run deploy
```

`npm run check` is the normal pre-PR quality gate.

## 4. Coding standards

### TypeScript
- `strict: true` is non-negotiable.
- Do not use `@ts-ignore`.
- Avoid `any`; if unavoidable, explain why in a nearby comment.
- Use `unknown` for untyped external input and narrow it.
- Prefer `import type` for type-only imports.

### React
- Server Components by default, including files under `app/components/`.
- Add `"use client"` only for browser APIs, event handlers, client state/effects, or client-only libraries.
- Do not fetch application data in `useEffect` when a Server Component or route handler is appropriate.
- Prefer CSS over JS layout measurement.

### CSS
- Keep site styles in `app/globals.css` unless the architecture is deliberately changed.
- Use CSS custom properties for design tokens.
- Avoid inline styles except for genuinely dynamic values.
- Keep the existing authored-class approach; do not introduce utility-class soup into JSX.
- Build mobile-first and preserve touch/coarse-pointer behaviour.

### Naming and commits
- Components/files: PascalCase.
- TypeScript variables/functions: camelCase.
- Types/interfaces: PascalCase.
- True module-level constants may use SCREAMING_SNAKE_CASE.
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`, `ci:`.
- Keep commits focused.

## 5. Accessibility

Target WCAG 2.1 AA minimum.

Non-negotiables:
- All interactive elements work by keyboard.
- Visible focus must remain available; never globally remove outlines.
- Images need meaningful `alt` text or explicit decorative treatment.
- Form controls require associated labels.
- Errors use `role="alert"`; success/status messaging uses `role="status"` or an appropriate live region.
- Honeypot controls remain excluded from keyboard and assistive-technology interaction.
- Disabled states must remain visually distinguishable.

### Motion
- Respect `prefers-reduced-motion`.
- Lenis must not initialise when reduced motion is requested.
- GSAP/other expensive animation libraries must not be imported unconditionally at module scope.
- Gate expensive motion behind `tier === "full"`.

## 6. Performance

`app/lib/perf.ts` is load-bearing performance logic.

- `PROBE_TIMEOUT_MS = 350` is intentional; do not casually change it.
- Full tier may enable Lenis/GSAP.
- Lite tier must keep the site usable without heavy animation.
- Pending detection must not block core content.
- Keep third-party browser scripts out of the critical path.

Performance targets are targets, not proof. Measure before claiming that a budget is met.

## 7. Security and privacy

Never commit:
- Cloudflare API tokens;
- email-provider/API keys;
- real `.env` secrets;
- D1 query exports or contact-form submissions;
- founder-identifying information.

Use Wrangler secrets for runtime secrets.

For `app/api/contact/route.ts`:
- preserve server-side honeypot validation;
- validate and length-bound input before persistence;
- use parameterised Drizzle operations, not raw interpolated SQL;
- keep the route compatible with Cloudflare Worker execution;
- do not log submitted personal data.

`public/_headers` is currently not a verified security-header baseline. Do not claim CSP/security headers are
active merely because that file exists. Adding a CSP or other headers requires testing against vinext/Cloudflare
output so legitimate scripts/styles are not broken.

## 8. Data and migrations

- Schema source: `db/schema.ts`.
- Generated Drizzle migrations must not be hand-edited casually.
- After schema changes run `npm run db:generate`.
- Apply locally before production.
- Column renames/data migrations require explicit review because they can destroy production data.
- The D1 binding name is `DB`; do not rename it casually.

## 9. Testing and CI

Current baseline:
- ESLint with accessibility rules.
- TypeScript strict checking.
- Node built-in tests under `tests/`.
- GitHub Actions quality workflow on pushes/PRs.

Before merge, `npm run check` should pass.

Future testing may add unit tests, axe accessibility checks, and Playwright E2E coverage. Add those incrementally;
do not introduce multiple large testing/security platforms at once without a clear maintenance owner.

Security/dependency scanning tools such as Semgrep, Snyk, Codecov, Sentry, or BrowserStack are optional future
integrations, not assumed active infrastructure.

## 10. Definition of done

A change is done when applicable items below are true:

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] No secrets or submitted personal data were committed.
- [ ] No founder-identifying detail was introduced.
- [ ] Targets/results/published statistics are labelled accurately.
- [ ] New interaction is keyboard-operable with visible focus.
- [ ] New motion respects reduced-motion and performance-tier rules.
- [ ] New environment variables are documented safely.
- [ ] Schema changes include generated migrations.
- [ ] PR explains what changed and why.

## 11. Load-bearing decisions

Change these only when the task explicitly requires it and the consequences have been checked:

- `worker/index.ts` — Cloudflare/vinext Worker entry behaviour.
- `wrangler.toml` — runtime bindings, compatibility flags, deployment identifiers.
- `vite.config.ts` — vinext/Cloudflare Vite integration.
- `public/robots.txt` and `app/layout.tsx` robots metadata — pre-pilot indexing protection.
- Proof/scorecard target labels — prevent target figures being misrepresented as results.
- Backing/founder presentation — institutional attribution only; no identifying founder details.
- `db/schema.ts` column names — migration/data-loss risk.
- `app/lib/perf.ts` probe timeout and gating behaviour.
- `package-lock.json` — modify only through npm.
- LF line-ending policy in `.editorconfig`/`.gitattributes`.

## 12. Copy rules

Use South African English and direct, evidence-aware wording.

- Present tense for capabilities that exist now.
- Future/conditional wording for post-pilot capabilities.
- Do not make unsupported institutional, traction, safety, financial, or performance claims.
- Avoid hype such as "revolutionary", "world-class", "industry-leading", or "game-changer".
- Any number shown as traction/evidence must state whether it is a target, verified result, or sourced published statistic.
