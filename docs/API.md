# API

## Current confirmed API surface

The current application includes a contact submission route under the app API layer.

The route:
- accepts structured contact/pilot-interest data;
- validates input;
- checks a honeypot;
- writes through Drizzle to D1;
- returns a structured success/error response.

The implementation in `app/api/contact/route.ts` is authoritative.

## API principles

### Validate at the boundary
Never trust client validation alone.

### Bound input
Strings should have explicit maximum lengths.

### Stable response shape
Prefer predictable JSON responses for success and errors.

### Do not leak internals
Do not return database errors, stack traces, secrets, or infrastructure details to callers.

### Cloudflare compatibility
Routes must remain compatible with the Worker runtime.

## Future API design

Do not create future operator, trip, payment, insurer, or association APIs until:
- the data model is approved;
- authentication/authorisation is defined;
- consent implications are reviewed;
- the pilot workflow is known.

## Payment boundary

No payment API should be introduced based only on the vision document.

A payment implementation requires separate decisions covering:
- provider;
- settlement;
- refunds;
- PCI/payment-security responsibilities;
- reconciliation;
- failure handling;
- commuter identity requirements.
