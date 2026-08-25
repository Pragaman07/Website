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
      {stat.sparkline && (
        <svg
          aria-hidden
          width="120"
          height="28"
          viewBox="0 0 120 28"
          fill="none"
          className="mt-3"
        >
          {/* §11.3 — tiny fake sparkline, hand-wobbled on purpose */}
          <path
            d="M2 23 C 10 21, 15 25, 24 19 S 38 9, 50 15 S 64 21, 76 11 S 94 14, 104 7 S 114 6, 118 3"
            stroke="var(--teal)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {stat.footnote?.text && (
        <p className="mt-2 text-[13px] leading-snug text-muted">{stat.footnote.text}</p>
      )}
    </div>
  );
}
