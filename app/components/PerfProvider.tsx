"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { detectTier, type PerfTier } from "../lib/perf";

type Tier = PerfTier | "pending";
const Ctx = createContext<Tier>("pending");
export const usePerfTier = () => useContext(Ctx);

export function PerfProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<Tier>("pending");
  useEffect(() => {
    let live = true;
    detectTier().then((t) => { if (live) setTier(t); });
    return () => { live = false; };
  }, []);
  return <Ctx.Provider value={tier}>{children}</Ctx.Provider>;
}
