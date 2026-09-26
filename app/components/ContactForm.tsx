"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = new FormData(e.currentTarget);

    // Client-side honeypot — bots fill hidden fields, humans never see it
    if (data.get("_trap")) { setStatus("sent"); return; }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          role: data.get("role"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong — please try again.");
      }

      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  const sending = status === "sending";
  const sent = status === "sent";

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users, autocomplete=off so browsers don't fill it */}
      <label className="hp" aria-hidden="true">
        Leave blank
        <input type="text" name="_trap" tabIndex={-1} autoComplete="off" />
      </label>

      <label>
        Name
        <input required name="name" placeholder="Your full name" autoComplete="name" disabled={sending || sent} />
      </label>
      <label>
        Work email
        <input required type="email" name="email" placeholder="name@organisation.co.za" autoComplete="email" disabled={sending || sent} />
      </label>
      <label>
        I am a
        <select name="role" required defaultValue="" disabled={sending || sent}>
          <option value="" disabled>Select your role</option>
          <option>Taxi owner or association</option>
          <option>Insurer or financial partner</option>
          <option>Research or public sector partner</option>
          <option>Other supporter</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Tell us how you would like to participate" maxLength={2000} disabled={sending || sent} />
      </label>

      <p className="consentNote">
        We use these details only to follow up on your interest in the pilot.
        We do not share contact information with third parties.
      </p>

      <button type="submit" disabled={sending || sent}>
        {sending ? "Sending…" : sent ? "Interest received ✓" : "Register interest"}
        {!sent && <span aria-hidden="true">↗</span>}
      </button>

      {sent && (
        <p className="formNote" role="status" aria-live="polite">
          Thank you — we have your details and will be in touch directly.
        </p>
      )}
      {status === "error" && (
        <p className="formError" role="alert">{error}</p>
      )}
    </form>
  );
}
