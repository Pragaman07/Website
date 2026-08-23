"use client";

/**
 * Mode system (CLAUDE.md core systems + Design Spec §3.3).
 * State: data-mode on <html> + localStorage("pragaman-mode").
 * The no-flash boot script in app/layout.tsx sets data-mode before paint;
 * this provider takes over after hydration and orchestrates THE transition.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export type Mode = "work" | "know";

export const MODE_STORAGE_KEY = "pragaman-mode";

/** Route classification (Design Spec §2.1 + D-2). */
export function routeKind(pathname: string): "door" | "work" | "know" | "shared" {
  if (pathname === "/") return "door";
  if (pathname === "/work" || pathname.startsWith("/work/")) return "work";
  if (pathname === "/know-me" || pathname.startsWith("/know-me/")) return "know";
  return "shared"; // /changelog, 404 — dress follows current mode in place
}

type Bloom = { x: number; y: number; to: Mode; key: number };

type ModeContextValue = {
  mode: Mode;
  /** True during the ~700ms temperature transition. */
  shifting: boolean;
  /** Radial bloom origin for the TemperatureLayer (null when idle). */
  bloom: Bloom | null;
  /**
   * Flip modes. `origin` = toggle knob center (viewport px) for the bloom.
   * Handles D-2: on mode-exclusive routes the transition plays, then routes
   * to the other mode's home; on shared routes it re-dresses in place.
   */
  flip: (origin?: { x: number; y: number }) => void;
  /** Set a mode directly (the Door uses this — no transition, no sound). */
  setMode: (mode: Mode) => void;
  /** Toggle flips inside the sliding 10s window — feeds egg 1 (§12.1). */
  rapidFlipCount: number;
};

const ModeContext = createContext<ModeContextValue | null>(null);

function readDocumentMode(): Mode {
  if (typeof document === "undefined") return "work";
  return document.documentElement.dataset.mode === "know" ? "know" : "work";
}

function persist(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    /* private mode etc. — data-mode still works for the session */
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* §3.3 sequence timings (ms) */
const GARNISH_EXIT = 200; // stickers leave before the room cools (know → work)
const SHIFT_TOTAL = 700; // full scene
const CROSSFADE = 150; // route change at the end of an exclusive-route flip

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("work");
  const [shifting, setShifting] = useState(false);
  const [bloom, setBloom] = useState<Bloom | null>(null);
  const [rapidFlipCount, setRapidFlipCount] = useState(0);
  const flipTimes = useRef<number[]>([]);
  const timers = useRef<number[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Adopt whatever the boot script decided (incl. deep-link forcing).
  useEffect(() => {
    setModeState(readDocumentMode());
  }, []);

  // Deep links force their mode on client-side navigations too (§2.1).
  useEffect(() => {
    const kind = routeKind(pathname);
    if ((kind === "work" || kind === "know") && kind !== readDocumentMode()) {
      persist(kind);
      setModeState(kind);
    }
  }, [pathname]);

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const setMode = useCallback((next: Mode) => {
    persist(next);
    setModeState(next);
  }, []);

  const flip = useCallback(
    (origin?: { x: number; y: number }) => {
      const from = readDocumentMode();
      const to: Mode = from === "work" ? "know" : "work";
      const kind = routeKind(pathname);

      // Egg-1 feeder: sliding 10s window of flips.
      const now = Date.now();
      flipTimes.current = [...flipTimes.current.filter((t) => now - t < 10_000), now];
      setRapidFlipCount(flipTimes.current.length);

      const finish = () => {
        setShifting(false);
        setBloom(null);
        if (kind === "work" || kind === "know") {
          // D-2: exclusive routes route to the other mode's home,
          // with a short crossfade handled by the .page-fade class.
          document.documentElement.classList.add("page-fade");
          router.push(to === "work" ? "/work" : "/know-me");
          later(() => document.documentElement.classList.remove("page-fade"), CROSSFADE * 2);
        }
      };

      if (prefersReducedMotion()) {
        // §3.3 reduced motion: instant variable swap, no bloom;
        // the page-fade class gives the 150ms opacity crossfade.
        document.documentElement.classList.add("page-fade");
        setMode(to);
        later(() => {
          document.documentElement.classList.remove("page-fade");
          if (kind === "work" || kind === "know") {
            router.push(to === "work" ? "/work" : "/know-me");
          }
        }, CROSSFADE);
        return;
      }

      setShifting(true);
      document.documentElement.classList.add("mode-shifting");
      if (origin) setBloom({ ...origin, to, key: now });

      if (from === "know") {
        // Entering Work: garnish fades out FIRST (0–200ms), THEN the room
        // cools — Work never shows a sticker even mid-transition.
        document.documentElement.classList.add("garnish-exit");
        later(() => {
          setMode(to);
          document.documentElement.classList.remove("garnish-exit");
        }, GARNISH_EXIT);
      } else {
        // Entering Know Me: colors start shifting right away (the CSS rule
        // carries the 100ms delay); garnish staggers in via [data-garnish]
        // delays once data-mode flips.
        setMode(to);
      }

      later(() => {
        document.documentElement.classList.remove("mode-shifting");
        finish();
      }, SHIFT_TOTAL);
    },
    [pathname, router, setMode],
  );

  return (
    <ModeContext.Provider
      value={{ mode, shifting, bloom, flip, setMode, rapidFlipCount }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside <ModeProvider>");
  return ctx;
}
