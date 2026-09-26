"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type Lenis from "lenis";
import { usePerfTier } from "./PerfProvider";

const LenisCtx = createContext<{ current: Lenis | null }>({ current: null });
export const useLenis = () => useContext(LenisCtx);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<Lenis | null>(null);
  const tier = usePerfTier();

  useEffect(() => {
    if (tier !== "full") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number;
    let cancelled = false;

    import("lenis").then(({ default: Ctor }) => {
      if (cancelled) return;
      const lenis = new Ctor({
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      ref.current = lenis;
      const raf = (time: number) => { lenis.raf(time); frameId = requestAnimationFrame(raf); };
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      ref.current?.destroy();
      ref.current = null;
    };
  }, [tier]);

  return <LenisCtx.Provider value={ref}>{children}</LenisCtx.Provider>;
}
