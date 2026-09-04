import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Glyph } from "@/components/ui/Glyph";
import { Tilt } from "@/components/ui/Tilt";
import { Rise } from "@/components/ui/Rise";
import { cn } from "@/lib/cn";
import { SHOW_PENDING } from "@/lib/flags";
import type { KnowHubContent } from "@/lib/content";

type Level = KnowHubContent["levels"][number];

/**
 * §11.0 — the level-select grid: game-tile cards, ±1° resting rotation,
 * straighten + lift on hover; each tile wears its custom glyph (DECISIONS.md
 * 3 Sep 2026 — Icons; the emoji were the spec's own placeholders). Chunk 6:
 * tiles rise in sequence on load and turn toward the mouse (Tilt). Sections without content render as
 * non-clickable LOCKED tiles — the placeholder system as a joke, honest.
 * Chips: sticker-tinted bg with ink text (§13 — darken text, not chip).
 */
export function LevelGrid({
  levels,
  lockedSlugs,
  chips,
}: {
  levels: Level[];
  lockedSlugs: Set<string>;
  chips: KnowHubContent["statusChips"];
}) {
  return (
    <ul className="flex flex-wrap justify-center gap-5">
      {levels.map((level, i) => {
        const locked = lockedSlugs.has(level.slug);
        const rotation = i % 2 === 0 ? "-rotate-1" : "rotate-1";
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3">
              <MonoLabel bold>LEVEL {level.level}</MonoLabel>
              <Glyph
                name={level.glyph}
                size={28}
                className="shrink-0 text-ink transition-colors duration-200 group-hover:text-accent-deep motion-reduce:transition-none"
              />
            </div>
            <p className="type-display-s mt-3 text-ink">{level.title}</p>
            <p className="type-body mt-1 text-muted">{level.tease.text}</p>
            <span
              className="type-mono-label mt-4 inline-block rounded-chip px-2 py-1 font-bold text-ink"
              style={{
                background: locked
                  ? "color-mix(in srgb, var(--muted) 18%, transparent)"
                  : "color-mix(in srgb, var(--purple) 18%, transparent)",
              }}
            >
              {locked ? chips.locked.text : chips.unlocked.text}
            </span>
          </>
        );

        return (
          <li key={level.slug} className="w-full sm:w-80">
            <Rise delay={i * 70} className="h-full">
            {locked && SHOW_PENDING ? (
              /* Dev/preview: locked tiles stay honest but click through to
                 the placeholder page for design review. Prod: inert. */
              <Link
                href={`/know-me/${level.slug}`}
                className={cn(
                  "block h-full rounded-card border border-dashed border-line bg-surface p-6 opacity-70",
                  rotation,
                )}
              >
                {inner}
              </Link>
            ) : locked ? (
              <div
                aria-disabled="true"
                className={cn(
                  "h-full rounded-card border border-line bg-surface p-6 opacity-60",
                  rotation,
                )}
              >
                {inner}
              </div>
            ) : (
              <Tilt>
              <Link
                href={`/know-me/${level.slug}`}
                className={cn(
                  "group block h-full rounded-card border border-line bg-surface p-6",
                  "transition-[transform,box-shadow] duration-200 ease-out",
                  "hover:rotate-0 hover:-translate-y-0.5 hover:shadow-hover",
                  "motion-reduce:transition-none",
                  rotation,
                )}
              >
                {inner}
              </Link>
              </Tilt>
            )}
            </Rise>
          </li>
        );
      })}
    </ul>
  );
}
