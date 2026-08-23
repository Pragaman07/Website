"use client";

import { useCallback } from "react";
import { useSfx } from "@/lib/sound";

/**
 * Shared easter-egg rules (§12): every egg plays `egg-found` on its FIRST
 * discovery only, tracked per egg in localStorage("pragaman-egg-{n}").
 * Nothing is tracked beyond the local flag.
 */
export function useEggFound(): (n: number) => void {
  const playFound = useSfx("egg-found");

  return useCallback(
    (n: number) => {
      const key = `pragaman-egg-${n}`;
      try {
        if (localStorage.getItem(key)) return;
        localStorage.setItem(key, "1");
      } catch {
        return; // no storage → treat as already found, never spam the chime
      }
      playFound();
    },
    [playFound],
  );
}
