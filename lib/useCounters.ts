"use client";

import { useEffect, useState } from "react";
import type { Counters } from "@/lib/kv";

/**
 * Live counters for the UI (CLAUDE.md core systems — GET /api/counters):
 * one fetch on mount, revalidate on window focus, `null` until the first
 * answer so render targets show dashes rather than a fake zero. Mirrors
 * IntakeCounter's inline loader so the footer's LIVE column (DECISIONS.md
 * 3 Sep 2026, "§2.3 footer") and the pitch block read one source. A failed
 * or 503 answer stays null — never an invented number.
 */
export function useCounters(): Counters | null {
  const [counters, setCounters] = useState<Counters | null>(null);

  useEffect(() => {
    let live = true;
    const load = async () => {
      try {
        const res = await fetch("/api/counters");
        if (!res.ok) return;
        const data = (await res.json()) as { counters?: Counters };
        if (live && data.counters) setCounters(data.counters);
      } catch {
        /* stays null → dashes */
      }
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      live = false;
      window.removeEventListener("focus", load);
    };
  }, []);

  return counters;
}
