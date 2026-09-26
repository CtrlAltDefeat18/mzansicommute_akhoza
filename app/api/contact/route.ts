import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = new Set([
  "Taxi owner or association",
  "Insurer or financial partner",
  "Research or public sector partner",
  "Other supporter",
]);

function bad(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return bad("Invalid request."); }

  // Server-side honeypot — client already checks, but clients can't be trusted
  if (body._trap) return NextResponse.json({ ok: true }); // silent fake success

  const name    = String(body.name    ?? "").trim();
  const email   = String(body.email   ?? "").trim();
  const role    = String(body.role    ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 200)             return bad("Please enter your name.");
  if (!EMAIL_RE.test(email) || email.length > 320) return bad("Please enter a valid email address.");
  if (!VALID_ROLES.has(role))                 return bad("Please select a role.");
  if (message.length > 2000)                  return bad("Message is too long.");

  try {
    const db = getDb();
    await db.insert(contactSubmissions).values({
      name,
      email,
      role,
      message,
      createdAt: new Date().toISOString(),
      ipAddress: req.headers.get("cf-connecting-ip") ?? null,
    });
  } catch (err) {
    console.error("D1 insert failed:", err);
    return NextResponse.json({ error: "Could not save your submission. Please try again." }, { status: 500 });
  }

  // Optional: uncomment and set RESEND_API_KEY via `wrangler secret put RESEND_API_KEY`
  // to get an email notification on each submission.
  //
  // const RESEND_KEY = process.env.RESEND_API_KEY;
  // if (RESEND_KEY) {
  //   await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       from: "MzansiMove <pilot@mzansimove.co.za>",
  //       to: "team@mzansimove.co.za",
  //       subject: `Pilot interest: ${name} (${role})`,
  //       text: `${name} <${email}>\n${role}\n\n${message}`,
  //     }),
  //   }).catch(console.error);
  // }

  return NextResponse.json({ ok: true });
}
