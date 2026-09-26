"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close menu on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="MzansiMove home" onClick={close}>
        <span className="brandMark">MM</span>
        <span>MzansiMove</span>
      </a>

      <div className="navLinks" id="main-nav-links" data-open={open} role="list">
        <a href="#solution" onClick={close} role="listitem">Solution</a>
        <a href="#traction" onClick={close} role="listitem">Pilot</a>
        <a href="#founder" onClick={close} role="listitem">Backing</a>
        <a href="#contact" onClick={close} role="listitem">Contact</a>
      </div>

      <a className="navCta" href="#contact" onClick={close}>Join the pilot</a>

      <button
        className="menuToggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="main-nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menuIcon" aria-hidden="true">
          {open ? "✕" : "☰"}
        </span>
      </button>
    </nav>
  );
}
