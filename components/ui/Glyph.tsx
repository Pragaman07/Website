import type { ReactNode, SVGProps } from "react";
import type { GlyphName } from "@/lib/content";

/**
 * The site's custom glyph set (DECISIONS.md 3 Sep 2026 — Icons): the five
 * level tiles + the coffee / receipt / call marks. Drawn in the site's line
 * grammar — the strata glyph in MethodTeaser is the reference: 1.5px ink
 * strokes on a 24-unit grid, rounded caps and joins, ink = currentColor so
 * both themes work. The coral rule the set enforces: exactly ONE integral
 * coral cell per glyph — a pill or a dot that belongs to the drawing (the
 * plaque, the tallest bar, the save point, the pin head…) — never a floating
 * decoration, and it inherits the ink edge. Decorative by default
 * (aria-hidden); wrap in an element with its own label when the glyph
 * carries meaning. lucide stays for chrome (menu, ×, mute, sun/moon).
 * Picked by a judge from three candidate sets (set #1, "clean line") with
 * eight tweaks applied on install.
 */
export function Glyph({
  name,
  size = 24,
  className,
  ...rest
}: { name: GlyphName; size?: number; className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "name"
>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {GLYPHS[name]}
    </svg>
  );
}

/** Inner markup per glyph — geometry attributes only, so the same markup is valid as raw SVG. */
const GLYPHS: Record<GlyphName, ReactNode> = {
  /* Tombstone: arched slab on a ground line, the coral plaque and two
     engraved lines beneath it (so it reads as a headstone, not a door). */
  graveyard: (
    <>
      <path d="M6 21V9a6 6 0 0 1 12 0v12" />
      <path d="M3 21h18" />
      <rect x="9" y="10.5" width="6" height="3.5" rx="1.75" fill="var(--accent)" />
      <path d="M9.5 16.5h5" />
      <path d="M9.5 18.5h3" />
    </>
  ),
  /* Bar chart: three bars on a baseline; the hero bar is the coral cell,
     pill-topped so it rhymes with the other pills. */
  numbers: (
    <>
      <path d="M3 21h18" />
      <path d="M3 21v-7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7" />
      <path d="M10 21v-12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12" />
      <path d="M17 21V8a2 2 0 0 1 4 0v13z" fill="var(--accent)" />
    </>
  ),
  /* Folded map (tri-fold, narrow flaps); the coral cell is the save point. */
  map: (
    <>
      <path d="M2.5 5.5 7 3l10 2.5L21.5 3v15.5L17 21 7 18.5l-4.5 2.5z" />
      <path d="M7 3v15.5" />
      <path d="M17 5.5V21" />
      <circle cx="12" cy="12" r="2" fill="var(--accent)" />
    </>
  ),
  /* Push-pin, upright: coral pill head, short neck, trapezoid flange, needle. */
  pin: (
    <>
      <rect x="7.5" y="3" width="9" height="4.5" rx="2.25" fill="var(--accent)" />
      <path d="M12 7.5v2.5" />
      <path d="M6.5 13 8.5 10h7l2 3z" />
      <path d="M12 13v8" />
    </>
  ),
  /* Speech bubble with a question mark; the coral cell is the mark's dot. */
  faq: (
    <>
      <path d="M6 3h12a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3h-7.5L7 21.5v-3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
      <path d="M9.5 7.5a2.5 2.5 0 1 1 3.75 2.17Q12.4 10.5 12 11.25" />
      <circle cx="12" cy="15" r="1.75" fill="var(--accent)" />
    </>
  ),
  /* Mug with two S-curls of steam; the coral cell is the label band. Compact
     and centred so the counter's 15° sip tilt never clips. */
  coffee: (
    <>
      <path d="M4 10h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M17 12h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8.5 3.5c-1.5 1.5 1.5 2.5 0 4.5" />
      <path d="M12.5 3.5c-1.5 1.5 1.5 2.5 0 4.5" />
      <rect x="7.5" y="12.75" width="6" height="3.5" rx="1.75" fill="var(--accent)" />
    </>
  ),
  /* Till slip: torn bottom edge, two itemised lines and the coral total. */
  receipt: (
    <>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-3.5-1.5-3.5 1.5-3.5-1.5L5 21V4a1 1 0 0 1 1-1z" />
      <path d="M8.5 7.5h7" />
      <path d="M8.5 11h5" />
      <rect x="8.5" y="14" width="7" height="3.5" rx="1.75" fill="var(--accent)" />
    </>
  ),
  /* Handset: a tapered quarter-ring between two end caps; the coral cell sits
     in the crook of the handset — the ring, not a notification badge. */
  call: (
    <>
      <path d="M3 7.5V5a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2v2.5A6 6 0 0 0 16.5 14.5H19a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2h-2.5A16 16 0 0 1 3 7.5z" />
      <circle cx="14.5" cy="9" r="2" fill="var(--accent)" />
    </>
  ),
};
