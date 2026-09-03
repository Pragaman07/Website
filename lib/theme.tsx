"use client";

/**
 * Night mode (DECISIONS.md, 3 Sep 2026) — the second axis beside mode.
 * State: data-theme="light|dark" on <html>. Resolution order: an explicit
 * override in localStorage("pragaman-theme"), else the OS preference —
 * and the OS is followed live until the visitor overrides it. The boot
 * script in app/layout.tsx stamps the attribute before paint; this
 * provider takes over after hydration. No sound on a theme change
 * (rule 8's trigger list is closed).
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

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "pragaman-theme";

/* the colour interpolation in globals.css runs 100ms + 400ms */
const SHIFT_TOTAL = 500;

type ThemeContextValue = {
  /** The theme currently on <html> (resolved, never "system"). */
  theme: Theme;
  /** Set and persist an explicit override. */
  setTheme: (theme: Theme) => void;
  /** Flip light ↔ dark (persists the result). */
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readDocumentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function readOverride(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const timer = useRef<number | undefined>(undefined);

  /* Apply to the document with the soft colour shift (skipped under
     reduced motion — the CSS rule is already gated, this avoids a stray
     class), then mirror into React state. */
  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (root.dataset.theme === next) {
      setThemeState(next);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      root.classList.add("theme-shifting");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => root.classList.remove("theme-shifting"),
        SHIFT_TOTAL,
      );
    }
    root.dataset.theme = next;
    setThemeState(next);
  }, []);

  useEffect(() => {
    // Adopt whatever the boot script decided.
    setThemeState(readDocumentTheme());

    // Follow the OS until an explicit override exists.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (readOverride()) return;
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.clearTimeout(timer.current);
    };
  }, [apply]);

  const setTheme = useCallback(
    (next: Theme) => {
      apply(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode etc. — the attribute still holds for the session */
      }
    },
    [apply],
  );

  const toggle = useCallback(() => {
    setTheme(readDocumentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
