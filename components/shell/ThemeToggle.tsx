"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import type { GlobalContent } from "@/lib/content";

/**
 * Night-mode control (DECISIONS.md, 3 Sep 2026) — beside mute in the
 * header on ≥md, inside the nav panel below, repeated in the footer.
 * Both icons are in the DOM and CSS picks one from data-theme, so the
 * right icon shows on the very first paint (no post-hydration flip).
 */
export function ThemeToggle({ content }: { content: GlobalContent["theme"] }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const label = (dark ? content.toLight.text : content.toDark.text) ?? "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-btn text-muted transition-colors duration-200 hover:text-ink"
    >
      <Moon size={18} aria-hidden className="dark:hidden" />
      <Sun size={18} aria-hidden className="hidden dark:block" />
    </button>
  );
}
