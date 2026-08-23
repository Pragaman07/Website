"use client";

import Link from "next/link";
import { CountUp } from "@/components/ui/CountUp";
import { getFact, type StatRef } from "@/lib/content";

/**
 * §6.1 proof strip — one wrapping row, mono-stat, `·` separators, count-up
 * on load. Every stat links to the Filing Buddy case study. Audited-only,
 * straight from facts.json (render strings live in content, not here).
 */
export function ProofStrip({ stats }: { stats: StatRef[] }) {
  return (
    <p className="type-mono-stat mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-ink">
      {stats.map((stat, i) => (
        <span key={stat.factId} className="inline-flex items-baseline gap-x-3">
          {i > 0 && (
            <span aria-hidden className="text-muted">
              ·
            </span>
          )}
          <Link
            href="/work/filing-buddy"
            className="transition-colors duration-200 hover:text-accent-deep"
            title={`Source: ${getFact(stat.factId).source}`}
          >
            <AnimatedRender id={stat.factId} render={stat.render} />
          </Link>
        </span>
      ))}
    </p>
  );
}

/**
 * Renders a strip entry, animating its final numeric token (the payoff
 * number) while the rest stays static — e.g. "ORGANIC SHARE 39% → 75%"
 * counts up the 75.
 */
function AnimatedRender({ id, render }: { id: string; render: string }) {
  const match = render.match(/^(.*?)(\d+(?:\.\d+)?)(%?)$/);
  if (!match) return <>{render}</>;
  const [, head, num, pct] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return (
    <>
      {head}
      <CountUp
        id={`proof.${id}`}
        value={parseFloat(num)}
        decimals={decimals}
        suffix={pct}
      />
    </>
  );
}
