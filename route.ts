import { NextRequest, NextResponse } from "next/server";

// Runs on the edge — matches how the rest of this project deploys via Wrangler.
export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LEN = 2000;
const VALID_ROLES = [
  "Taxi owner or association",
  "Insurer or financial partner",
  "Research or public sector partner",
  "Other supporter",
];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const role = String(body.role ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Defence in depth — the client already screens the honeypot, this
  // is the check that actually matters since clients can't be trusted.
  if (body.companyWebsite) {
    return NextResponse.json({ ok: true }); // fake success, don't tip the bot off
  }

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Please select a role." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // --- Persistence -------------------------------------------------
  // Your project already has db/index.ts and db/schema.ts wired for
  // Cloudflare D1 via Drizzle (per examples/d1/app/api/notes/route.ts).
  // I haven't seen the contents of your schema.ts, so I'm not going to
  // guess its shape here — wire the insert against your real schema:
  //
  //   import { db } from "@/db";
  //   import { contactSubmissions } from "@/db/schema";
  //   await db.insert(contactSubmissions).values({ name, email, role, message, createdAt: new Date() });
  //
  // Add a `contactSubmissions` table to db/schema.ts, then run
  // `npm run db:generate` to produce the migration, following the
  // exact pattern in examples/d1/db/schema.ts.
  // -------------------------------------------------------------------

  // --- Notification --------------------------------------------------
  // Sending an actual email needs an API key you control — Resend works
  // well from Workers (plain fetch, no SDK required). Set RESEND_API_KEY
  // as a Wrangler secret, then uncomment:
  //
  // await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "MzansiMove <pilot@mzansimove.co.za>",
  //     to: "team@mzansimove.co.za",
  //     subject: `Pilot interest: ${name} (${role})`,
  //     text: `${name} <${email}>\n${role}\n\n${message}`,
  //   }),
  // });
  // ---------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
