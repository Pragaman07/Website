"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { useCounters } from "@/lib/useCounters";
import type { Counters } from "@/lib/kv";
import type { CopyString } from "@/lib/content";

type Row = { key: keyof Counters; label: CopyString };

/**
 * §2.3 as amended (DECISIONS.md 3 Sep 2026, "§2.3 footer") — the LIVE
 * column: Problems pitched · Replies sent · Coffee, read from the shared
 * counters store (lib/useCounters). Dashes until the first answer, as
 * IntakeCounter does. The list turns aria-live only AFTER that first answer,
 * so a screen reader hears real changes (a sip, a pitch, a revalidation that
 * moved a number) — not the dashes→numbers swap on every page load; each row
 * is atomic so one change reads one label + value. Labels come from content:
 * intake.json → counter for the first two, global.json → footer.counters for
 * coffee. Numerals wear type-mono-stat.
 */
export function FooterCounters({ rows }: { rows: Row[] }) {
  const counters = useCounters();
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (counters) setArmed(true);
  }, [counters]);

  return (
    <dl aria-live={armed ? "polite" : "off"} className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.key} aria-atomic="true">
          <MonoLabel as="dt">{row.label.text}</MonoLabel>
          <dd className="type-mono-stat mt-0.5 text-ink">
            {counters ? String(counters[row.key]) : "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
