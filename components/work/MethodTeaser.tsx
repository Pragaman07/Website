import Link from "next/link";
import type { WorkHomeContent } from "@/lib/content";

/**
 * §6.3 — one row: a static excerpt of the §8 strata diagram (mini SVG,
 * ink linework + the coral drill line) + the teaser line + method link.
 */
export function MethodTeaser({ content }: { content: WorkHomeContent["methodTeaser"] }) {
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-surface p-6 md:p-8">
      <StrataGlyph />
      <p className="type-body-l min-w-0 flex-1 basis-64 text-ink">{content.line.text}</p>
      <Link
        href="/work/method"
        className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-deep"
      >
        {content.linkLabel.text}
      </Link>
    </div>
  );
}

function StrataGlyph() {
  return (
    <svg
      aria-hidden
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className="shrink-0"
      fill="none"
    >
      {/* four strata bands */}
      {[10, 19, 28, 37].map((y, i) => (
        <rect
          key={y}
          x="4"
          y={y}
          width="40"
          height="8"
          rx="1.5"
          stroke="var(--ink)"
          strokeWidth="1.5"
          fill="var(--line)"
          fillOpacity={0.25 + i * 0.15}
        />
      ))}
      {/* the drill line, surface to bedrock */}
      <line x1="24" y1="4" x2="24" y2="45" stroke="var(--accent)" strokeWidth="2" />
      {/* the thing built on top */}
      <rect x="19" y="2" width="10" height="6" rx="1" fill="var(--accent)" />
    </svg>
  );
}
