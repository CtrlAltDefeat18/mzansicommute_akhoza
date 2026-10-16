# Contributing to MzansiCommute

## Before you begin

Read:
1. `AGENTS.md`
2. `docs/NORTH_STAR.md`
3. `docs/CONSTITUTION.md`
4. the relevant technical/product document for your task

## Workflow

Create a focused branch.

Prefer Conventional Commits:
- `feat:`
- `fix:`
- `docs:`
- `test:`
- `refactor:`
- `chore:`
- `ci:`

## Quality gate

Use the repository's current scripts. The intended baseline is:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

If the repository currently has known baseline failures, document them rather than hiding them.

## Product safety

Do not introduce:
- founder-identifying details;
- unsupported traction claims;
- unreviewed partner claims;
- silent consent changes;
- production secrets.

## Pull requests

A good PR explains:
- what changed;
- why;
- what was tested;
- known limitations;
- product/privacy implications where relevant.
