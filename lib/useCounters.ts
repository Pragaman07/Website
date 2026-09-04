"use client";

import { useEffect, useState } from "react";
import type { Counters } from "@/lib/kv";

/**
 * The counters store (CLAUDE.md core systems — GET /api/counters). One
 * request per page shared by every readout (the footer's LIVE column, the
 * pitch block's reassurance line, the coffee counter), revalidated on window
 * focus and when the last answer is older than 30s; writes (a pitch, a sip)
 * publish their fresh values so every readout on the page agrees at once —
 * no second "live" number that disagrees until a refocus. `null` until the
 * first answer, so render targets show dashes rather than a fake zero; a
 * failed or 503 answer changes nothing — never an invented number.
 */
type Listener = (counters: Counters | null) => void;

const STALE_AFTER_MS = 30_000;

let cache: Counters | null = null;
let fetchedAt = 0;
let inflight: Promise<void> | null = null;
let focusBound = false;
const listeners = new Set<Listener>();

function notify() {
  for (const listener of listeners) listener(cache);
}

/** The last known counters, synchronously (an optimistic base for writes). */
export function readCounters(): Counters | null {
  return cache;
}

/** Fetch for everyone at once — concurrent callers share one request. */
export function refreshCounters(): Promise<void> {
  if (inflight) return inflight;
  inflight = fetch("/api/counters")
    .then(async (res) => {
      if (!res.ok) return;
      const data = (await res.json()) as { counters?: Counters };
      if (data.counters) {
        cache = data.counters;
        fetchedAt = Date.now();
        notify();
      }
    })
    .catch(() => {
      /* keep what we had */
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/**
 * Push fresh values from a write response. A partial (e.g. just coffee)
 * merges into the last answer; with nothing to merge into it waits for the
 * next fetch rather than inventing the other numbers.
 */
export function publishCounters(next: Partial<Counters>): void {
  if (cache) {
    cache = { ...cache, ...next };
  } else if (next.pitched !== undefined && next.replied !== undefined && next.coffee !== undefined) {
    cache = { pitched: next.pitched, replied: next.replied, coffee: next.coffee };
  } else {
    return;
  }
  fetchedAt = Date.now();
  notify();
}

export function useCounters(): Counters | null {
  const [counters, setCounters] = useState<Counters | null>(cache);

  useEffect(() => {
    listeners.add(setCounters);
    setCounters(cache);
    if (!cache || Date.now() - fetchedAt > STALE_AFTER_MS) void refreshCounters();
    if (!focusBound) {
      focusBound = true;
      window.addEventListener("focus", () => {
        void refreshCounters();
      });
    }
    return () => {
      listeners.delete(setCounters);
    };
  }, []);

  return counters;
}
