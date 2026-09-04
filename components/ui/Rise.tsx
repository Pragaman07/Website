import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Page-load rise (chunk 6 — DECISIONS.md 3 Sep 2026, "§5 / D-7 motion
 * budget"): a block lifts 0.5em into place after `delay` ms. CSS-driven
 * (globals.css `.rise`, gated on `html.js`), so it reaches rest without
 * hydration, no-JS visitors see everything at rest, and reduced motion turns
 * it off in the stylesheet. It starts from 20% opacity, never 0 — the hero
 * still paints (and counts for LCP) on the first frame.
 */
export function Rise({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  /** ms after load — stagger siblings by ~60ms */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn("rise", className)}
      style={{ "--rise-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The hero headline, word by word: each word rises in sequence (`stagger`
 * ms apart) and the single accent phrase keeps its coral (§6.1) — the phrase
 * may span several words. Whitespace is preserved so the line wraps exactly
 * as the plain text would.
 */
export function RiseWords({
  text,
  accentPhrase,
  startDelay = 0,
  stagger = 55,
}: {
  text: string;
  accentPhrase?: string;
  startDelay?: number;
  stagger?: number;
}) {
  const at = accentPhrase ? text.indexOf(accentPhrase) : -1;
  const segments =
    at === -1 || !accentPhrase
      ? [{ text, accent: false }]
      : [
          { text: text.slice(0, at), accent: false },
          { text: accentPhrase, accent: true },
          { text: text.slice(at + accentPhrase.length), accent: false },
        ];

  let index = 0;
  return (
    <>
      {segments.flatMap((segment, s) =>
        segment.text.split(/(\s+)/).map((token, t) => {
          if (token === "") return null;
          if (/^\s+$/.test(token)) return token;
          const delay = startDelay + index++ * stagger;
          return (
            <span
              key={`${s}-${t}`}
              className={cn("rise inline-block", segment.accent && "text-accent-deep")}
              style={{ "--rise-delay": `${delay}ms` } as CSSProperties}
            >
              {token}
            </span>
          );
        }),
      )}
    </>
  );
}
