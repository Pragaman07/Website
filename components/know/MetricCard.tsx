"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { CountUp } from "@/components/ui/CountUp";
import type { NumbersContent } from "@/lib/content";

/**
 * §11.3 — one parody-dashboard stat card: mono-label metric, mono-stat-xl
 * value (count-up when numeric), optional sticker trend + deadpan footnote.
 */
export function MetricCard({ stat }: { stat: NumbersContent["stats"][number] }) {
  const numeric = /^\d+(\.\d+)?$/.test(stat.value);

  return (
    <div className="break-inside-avoid rounded-card border border-line bg-surface p-6">
      <MonoLabel bold className="block">
        {stat.metric}
      </MonoLabel>
      <p className="type-mono-stat-xl mt-3 text-ink">
        {numeric ? (
          <CountUp id={`numbers.${stat.metric}`} value={parseFloat(stat.value)} />
        ) : (
          stat.value
        )}
        {stat.trend && (
          <span
            className="type-mono-stat ml-3"
            style={{ color: `var(--${stat.sticker ?? "teal"})` }}
            aria-hidden
          >
            {stat.trend}
          </span>
        )}
      </p>
      {stat.footnote?.text && (
        <p className="mt-2 text-[13px] leading-snug text-muted">{stat.footnote.text}</p>
      )}
    </div>
  );
}
