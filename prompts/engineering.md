# Engineering Baseline

Read `AGENTS.md` and relevant technical docs.

Goal: make the repository engineering baseline green without redesigning the product.

Work in this order:
1. dependency/lockfile consistency;
2. build/runtime configuration;
3. generated/runtime typings;
4. lint;
5. typecheck;
6. stale tests;
7. production build.

Run:
- npm ci
- npm run lint
- npm run typecheck
- npm run test
- npm run build

Do not deploy. Do not change product strategy. Report remaining technical debt.
