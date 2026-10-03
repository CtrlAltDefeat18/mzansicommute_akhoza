# Security and Privacy

## Highest-priority security property: trust

The product handles or may eventually handle sensitive operational and financial signals.

Security failures are therefore not only technical failures; they can destroy legitimacy with operators and associations.

## Founder safety

Do not expose founder-identifying data in public code/content unless explicitly approved.

This includes:
- names;
- photographs;
- initials as identity marks;
- detailed biographies;
- private contact details;
- neighbourhood/school/association details that narrow identity or location.

## Secrets

Never commit:
- Cloudflare API tokens;
- email-provider keys;
- production credentials;
- real `.env` values;
- database exports.

Use platform secret stores.

## Contact data

Contact submissions are personal data.

Rules:
- collect only what is needed;
- avoid logging full submissions;
- restrict access;
- define retention before volume increases;
- never reuse contact data for unrelated marketing without a deliberate policy.

## Future mobility data

Trip/fare/route data can become highly sensitive.

Before collecting at scale, define:
- participant identity model;
- consent model;
- access roles;
- retention;
- aggregation;
- anonymisation limits;
- incident response;
- partner access;
- auditability.

## Security headers

Do not claim CSP or other edge-security headers are active unless they have been configured and verified in deployed output.

## Abuse

Forms should include:
- server-side validation;
- anti-bot controls;
- rate-limiting strategy when needed;
- safe error responses.

## Principle

Security controls must not quietly turn the product into surveillance infrastructure.
