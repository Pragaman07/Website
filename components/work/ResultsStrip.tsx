import { MonoLabel } from "@/components/ui/MonoLabel";
import { AnimatedStat } from "@/components/work/AnimatedStat";
import type { CaseMeta } from "@/lib/content";

/**
 * §7.0 layer-1 results strip — THE one emphasis band in Work mode,
 * reserved for results: --band card (ink in the light theme, a raised
 * surface in the dark one), --on-band text, stat-xl count-ups, source line
 * beneath in mono-label (--muted-on-band, contrast ruling round 3).
 */
export function ResultsStrip({
  results,
  slug,
}: {
  results: NonNullable<CaseMeta["resultsStrip"]>;
  slug: string;
}) {
  return (
    <div className="rounded-card bg-band p-6 md:p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.stats.map((stat) => (
          <p key={stat.factId} className="type-mono-stat-xl text-on-band">
            <AnimatedStat id={`${slug}.${stat.factId}`} render={stat.render} />
          </p>
        ))}
      </div>
      <MonoLabel className="mt-6 block text-muted-on-band">{results.sourceLine}</MonoLabel>
    </div>
  );
}
