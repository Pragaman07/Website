"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { useCounters } from "@/lib/useCounters";
import type { Counters } from "@/lib/kv";
import type { CopyString } from "@/lib/content";

export type FooterCounterRow = { key: keyof Counters; label: CopyString };

/**
 * §2.3 as amended (DECISIONS.md 3 Sep 2026, "§2.3 footer") — the LIVE
 * column: Problems pitched · Replies sent · Coffee, read from /api/counters
 * through useCounters(). Dashes until the first answer (as IntakeCounter
 * does); the list is aria-live polite + atomic so a screen reader hears
 * label and value together when the numbers land (rule 10). Labels come
 * from content — intake.json → counter for the first two, global.json →
 * footer.counters for coffee. Display numerals wear type-mono-stat.
 */
export function FooterCounters({ rows }: { rows: FooterCounterRow[] }) {
  const counters = useCounters();

  return (
    <dl aria-live="polite" aria-atomic="true" className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.key}>
          <MonoLabel as="dt">{row.label.text}</MonoLabel>
          <dd className="type-mono-stat mt-0.5 text-ink">
            {counters ? String(counters[row.key]) : "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
