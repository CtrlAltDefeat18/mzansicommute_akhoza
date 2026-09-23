"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<{ current: Lenis | null }>({ current: null });

/** Read the live Lenis instance from anywhere inside <SmoothScroll>. */
export const useLenis = () => useContext(LenisContext);

/**
 * Wraps native scroll with Lenis for a smoother, weightier feel.
 * Does nothing for prefers-reduced-motion — native scroll is already
 * the correct, accessible behaviour, not something to "smooth."
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number;
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
