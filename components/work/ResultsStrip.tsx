import { MonoLabel } from "@/components/ui/MonoLabel";
import { AnimatedStat } from "@/components/work/AnimatedStat";
import type { CaseMeta } from "@/lib/content";

/**
 * §7.0 layer-1 results strip — THE one dark surface in Work mode, reserved
 * for results: --ink card, warm-white text, mono-stat-xl count-ups, source
 * line beneath in mono-label.
 */
export function ResultsStrip({
  results,
  slug,
}: {
  results: NonNullable<CaseMeta["resultsStrip"]>;
  slug: string;
}) {
  return (
    <div className="rounded-card bg-ink p-6 md:p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.stats.map((stat) => (
          <p key={stat.factId} className="type-mono-stat-xl" style={{ color: "var(--bg)" }}>
            <AnimatedStat id={`${slug}.${stat.factId}`} render={stat.render} />
          </p>
        ))}
      </div>
      <MonoLabel className="mt-6 block" style={{ color: "var(--muted-on-ink)" }}>
        {results.sourceLine}
      </MonoLabel>
    </div>
  );
}
