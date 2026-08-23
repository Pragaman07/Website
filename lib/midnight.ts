"use client";

import { useEffect, useState } from "react";

/**
 * §12.7 — after-midnight window: 00:00–04:59 visitor local time, checked
 * client-side on mount (no layout shift: consumers reserve their line).
 * Dev-only test hook (the Phase 5 gate's "fake the clock"): append
 * ?fakeHour=2 in development.
 */
export function useMidnight(): boolean {
  const [midnight, setMidnight] = useState(false);

  useEffect(() => {
    let hour = new Date().getHours();
    if (process.env.NODE_ENV === "development") {
      const fake = new URLSearchParams(window.location.search).get("fakeHour");
      if (fake !== null && !Number.isNaN(Number(fake))) hour = Number(fake);
    }
    setMidnight(hour >= 0 && hour < 5);
  }, []);

  return midnight;
}
