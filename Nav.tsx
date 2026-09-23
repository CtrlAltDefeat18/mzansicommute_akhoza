"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="MzansiMove home" onClick={() => setOpen(false)}>
        <span className="brandMark">MM</span>
        <span>MzansiMove</span>
      </a>

      <div className="navLinks" id="mobile-nav-links" data-open={open}>
        <a href="#solution" onClick={() => setOpen(false)}>Solution</a>
        <a href="#traction" onClick={() => setOpen(false)}>Pilot</a>
        <a href="#founder" onClick={() => setOpen(false)}>Backing</a>
        <a href="#contact" onClick={() => setOpen(false)}>Join the pilot</a>
      </div>

      <a className="navCta" href="#contact">Join the pilot</a>

      <button
        className="menuToggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </button>
    </nav>
  );
}
