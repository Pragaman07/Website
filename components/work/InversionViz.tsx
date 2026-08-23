"use client";

import { useEffect, useRef, useState } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { getFact } from "@/lib/content";

/**
 * §7.1 — the signature graphic: two stacked horizontal bars, BEFORE
 * 61.3% paid / 38.7% organic → AFTER 25.2% / 74.8%. Organic = coral,
 * paid = muted at 30%. Bars fill on reveal (700ms). Labels Space Mono.
 * One graphic, whole story. Numbers come from facts.json.
 */
export function InversionViz({
  paidFactId,
  organicFactId,
}: {
  paidFactId: string;
  organicFactId: string;
}) {
  const paid = getFact(paidFactId);
  const organic = getFact(organicFactId);
  const pct = (s?: string) => parseFloat((s ?? "0").replace("%", ""));

  const rows = [
    {
      label: "BEFORE",
      organic: pct(organic.before),
      paid: pct(paid.before),
    },
    {
      label: "AFTER",
      organic: pct(organic.after),
      paid: pct(paid.after),
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilled(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="rounded-card border border-line bg-surface p-6 md:p-8">
      <div className="flex flex-col gap-6">
        {rows.map((row) => (
          <div key={row.label}>
            <MonoLabel bold className="mb-2 block">
              {row.label}
            </MonoLabel>
            <div className="flex h-10 w-full overflow-hidden rounded-chip">
              <div
                className="flex items-center overflow-hidden bg-accent transition-[width] duration-700 motion-reduce:transition-none"
                style={{
                  width: filled ? `${row.organic}%` : "0%",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              >
                <MonoLabel bold className="whitespace-nowrap px-3 text-white">
                  ORGANIC {row.organic}%
                </MonoLabel>
              </div>
              <div
                className="flex items-center overflow-hidden transition-[width] duration-700 motion-reduce:transition-none"
                style={{
                  width: filled ? `${row.paid}%` : "0%",
                  background: "color-mix(in srgb, var(--muted) 30%, transparent)",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              >
                <MonoLabel bold className="whitespace-nowrap px-3 text-ink">
                  PAID {row.paid}%
                </MonoLabel>
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4">
        <MonoLabel className="block">SOURCE: {organic.source}</MonoLabel>
      </figcaption>
    </figure>
  );
}
