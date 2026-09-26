export type PerfTier = "full" | "lite";

type NetworkInfo = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
};

const SLOW_TYPES = new Set(["slow-2g", "2g", "3g"]);
const PROBE_URL = "/probe.txt";
const PROBE_TIMEOUT_MS = 350;
const SESSION_KEY = "mm-perf";

function getNetworkInfo(): NetworkInfo | undefined {
  const nav = navigator as Navigator & {
    connection?: NetworkInfo;
    mozConnection?: NetworkInfo;
    webkitConnection?: NetworkInfo;
  };
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

async function measureProbe(): Promise<PerfTier> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), PROBE_TIMEOUT_MS);
  const t0 = performance.now();
  try {
    const r = await fetch(`${PROBE_URL}?_=${Date.now()}`, {
      cache: "no-store",
      signal: ctrl.signal,
    });
    await r.arrayBuffer();
    return performance.now() - t0 > PROBE_TIMEOUT_MS ? "lite" : "full";
  } catch {
    return "lite";
  } finally {
    clearTimeout(t);
  }
}

/**
 * Resolves perf tier. Three exits, fastest first:
 * 1. ?perf= query param — QA override, sticks for session.
 * 2. sessionStorage cache — no repeat work on subsequent navigations.
 * 3. navigator.connection — synchronous, most Android/Chrome/Edge.
 * 4. Timed probe — only Safari/iOS where the Network Info API is absent.
 */
export async function detectTier(): Promise<PerfTier> {
  if (typeof window === "undefined") return "full";

  const qs = new URLSearchParams(window.location.search).get("perf");
  if (qs === "lite" || qs === "full") {
    sessionStorage.setItem(SESSION_KEY, qs);
    return qs;
  }

  const cached = sessionStorage.getItem(SESSION_KEY);
  if (cached === "lite" || cached === "full") return cached;

  const info = getNetworkInfo();
  if (info) {
    const tier: PerfTier =
      info.saveData ||
      SLOW_TYPES.has(info.effectiveType ?? "") ||
      (info.downlink ?? 10) < 1.5
        ? "lite"
        : "full";
    sessionStorage.setItem(SESSION_KEY, tier);
    return tier;
  }

  const tier = await measureProbe();
  sessionStorage.setItem(SESSION_KEY, tier);
  return tier;
}
