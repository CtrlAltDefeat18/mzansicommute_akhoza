# AI Contributor Guidelines

This document supplements `AGENTS.md`.

## Role

AI agents are implementation partners.

They may:
- inspect;
- propose;
- code;
- refactor;
- test;
- document;
- compare approaches.

They do not own product truth.

## Required behaviour

Before editing:
1. read `AGENTS.md`;
2. inspect relevant files;
3. identify load-bearing infrastructure;
4. state assumptions when important.

After editing:
1. run relevant checks;
2. review the diff;
3. report failures honestly;
4. distinguish fixes from unrelated pre-existing issues.

## Never silently change

- founder-privacy rules;
- target/result labels;
- consent meaning;
- data-sharing promises;
- infrastructure identifiers;
- database semantics;
- indexing/publication status;
- partner claims;
- business model.

## Product language

AI agents must not upgrade hypotheses into facts.

Examples:
- "could support underwriting" is not "improves underwriting";
- "pilot target" is not "traction";
- "planned in Makhanda" is not "operating in Makhanda" until verified.

## Scope control

Prefer one coherent change over a giant "clean up everything" task.

Do not introduce frameworks, services, or dependencies merely because they are fashionable.

## External tools

Any new external service should answer:
- why is it needed;
- what data leaves the system;
- what recurring cost/maintenance it creates;
- what happens if it disappears.
