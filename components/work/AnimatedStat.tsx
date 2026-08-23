"use client";

import { CountUp } from "@/components/ui/CountUp";

/**
 * Renders a stat string, animating its LAST numeric token (the payoff
 * number) with count-up while everything around it stays static:
 * "ORGANIC SHARE 39% → 75%" counts the 75; "213K AI OVERVIEW IMPRESSIONS"
 * counts the 213 and keeps the K. Numbers always arrive via facts.json
 * render strings — this component only decides what moves.
 */
export function AnimatedStat({ id, render }: { id: string; render: string }) {
  const matches = [...render.matchAll(/\d+(?:\.\d+)?/g)];
  const last = matches[matches.length - 1];
  if (!last || last.index === undefined) return <>{render}</>;

  const num = last[0];
  const head = render.slice(0, last.index);
  const tail = render.slice(last.index + num.length);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;

  return (
    <>
      {head}
      <CountUp id={id} value={parseFloat(num)} decimals={decimals} />
      {tail}
    </>
  );
}
