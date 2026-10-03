# Decision Log

Use this file for durable product/architecture decisions.

## ADR-001 — Operator value before data monetisation

**Status:** Accepted

MzansiCommute must create useful operator-side value before treating institutional data access as the product.

## ADR-002 — Associations are a legitimacy and scale layer

**Status:** Accepted

The product should work with association structures rather than treating them as obstacles to bypass.

## ADR-003 — Founder identity stays off the public product by default

**Status:** Accepted

Physical/operational safety outweighs conventional founder-marketing patterns.

## ADR-004 — Server Components by default

**Status:** Accepted

Use client components only for behaviour that requires them.

## ADR-005 — Cloudflare Workers + D1 remain the current platform baseline

**Status:** Current

This is the current repository architecture, not a permanent ideological commitment. Re-evaluate only when a concrete limitation justifies migration.

## ADR-006 — Legacy infrastructure naming is not changed during cosmetic rebrand work

**Status:** Accepted

Remote resources may depend on existing identifiers.

## ADR-007 — Performance-tier gating remains part of the UX architecture

**Status:** Accepted

Heavy motion should not penalise low-connectivity or constrained-device users.

## Template

### ADR-XXX — Title

**Status:** Proposed / Accepted / Superseded

**Context:**  
What problem forced a decision?

**Decision:**  
What are we doing?

**Consequences:**  
What becomes easier/harder?

**Date:** YYYY-MM-DD
