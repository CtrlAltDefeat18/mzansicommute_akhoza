"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("companyWebsite")) {
      // Pretend success — don't tip the bot off that it was caught.
      setStatus("sent");
      return;
    }

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
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input required name="name" placeholder="Your full name" autoComplete="name" />
      </label>
      <label>
        Work email
        <input required type="email" name="email" placeholder="name@organisation.co.za" autoComplete="email" />
      </label>
      <label>
        I am a
        <select name="role" defaultValue="" required>
          <option value="" disabled>Select your role</option>
          <option>Taxi owner or association</option>
          <option>Insurer or financial partner</option>
          <option>Research or public sector partner</option>
          <option>Other supporter</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" placeholder="Tell us how you would like to participate" maxLength={2000} />
      </label>

      {/* Honeypot — hidden from sighted and screen-reader users via CSS + tabIndex, left unlabelled on purpose */}
      <label className="hp" aria-hidden="true">
        Company website
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <p className="consentNote">
        We'll use these details only to follow up about the pilot. We won't share them with third
        parties without asking you first.
      </p>

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : status === "sent" ? "Interest received" : "Register interest"}
        <span aria-hidden="true">↗</span>
      </button>

      <p className="formNote" role="status" aria-live="polite">
        {status === "sent" && "Thank you — we've got your details and will be in touch."}
      </p>
      {status === "error" && (
        <p className="formError" role="alert">{errorMsg}</p>
      )}
    </form>
  );
}
