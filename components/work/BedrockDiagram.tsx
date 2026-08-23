"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";
import type { MethodContent } from "@/lib/content";

/**
 * §8.2 — the Bedrock diagram: a vertical geological cross-section. The
 * coral drill line descends stratum by stratum once the diagram scrolls
 * into view (5 steps, ~350ms each); each band's label fades in as the
 * line reaches it; hitting bedrock raises a small building at the surface
 * (--spring) with the BUILT ON BEDROCK label.
 *
 * The bands are real DOM text (an ordered list), so the method reads
 * naturally to screen readers; decorative texture is aria-hidden.
 * Reduced motion: fully drawn, no animation.
 */
export function BedrockDiagram({ diagram }: { diagram: MethodContent["diagram"] }) {
  const strata = diagram.strata;
  const total = strata.length;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // step: 0 = untouched · 1..total = drill reached band N · total+1 = payoff
  const [step, setStep] = useState(0);
  const done = step > total;

  useEffect(() => {
    if (reduced) {
      setStep(total + 1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let interval: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let s = 0;
        interval = window.setInterval(() => {
          s += 1;
          setStep(s);
          if (s > total) window.clearInterval(interval);
        }, 350);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (interval) window.clearInterval(interval);
    };
  }, [reduced, total]);

  /* progressive darkness: surface = bare bg → bedrock = ink */
  const tint = (i: number) =>
    i === total - 1
      ? "var(--ink)"
      : `color-mix(in srgb, var(--ink) ${[0, 5, 10, 18][i] ?? 12}%, var(--bg))`;

  return (
    <div ref={ref} className="relative">
      {/* the payoff: a small building rises at the surface, on the lane */}
      <div className="pointer-events-none absolute -top-14 left-8 md:left-16">
        <motion.div
          initial={false}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 18, mass: 0.7 }
          }
          className="flex items-end gap-3"
        >
          <svg aria-hidden width="34" height="30" viewBox="0 0 34 30" fill="none">
            <rect x="1" y="12" width="12" height="18" rx="1.5" fill="var(--accent)" />
            <rect x="15" y="2" width="12" height="28" rx="1.5" fill="var(--accent)" />
            <rect x="29" y="18" width="4" height="12" rx="1" fill="var(--accent)" />
          </svg>
          <MonoLabel bold className="text-ink">
            {diagram.payoff.text}
          </MonoLabel>
        </motion.div>
      </div>

      {/* the drill line — 2px coral, descending through the strata */}
      <span
        aria-hidden
        className="absolute bottom-0 top-0 left-8 w-0.5 md:left-16"
        style={{ background: "color-mix(in srgb, var(--line) 60%, transparent)" }}
      />
      <span
        aria-hidden
        className="absolute top-0 left-8 w-0.5 bg-accent transition-[height] duration-300 ease-linear motion-reduce:transition-none md:left-16"
        style={{ height: `${(Math.min(step, total) / total) * 100}%` }}
      />

      <ol className="overflow-hidden rounded-card border border-line">
        {strata.map((band, i) => {
          const reached = step >= i + 1;
          const bedrock = i === total - 1;
          return (
            <li
              key={band.n}
              className={cn(
                "relative border-t border-line pl-16 pr-6 first:border-t-0 md:pl-28",
                "flex min-h-[88px] flex-col justify-center py-5 md:min-h-[118px]",
              )}
              style={{ background: tint(i) }}
            >
              {/* faint scattered ? texture on the questions band */}
              {i === 1 && <QuestionTexture />}
              <div
                className={cn(
                  "transition-opacity duration-300",
                  reached ? "opacity-100" : "opacity-0",
                )}
              >
                {bedrock ? (
                  <span className="inline-block -rotate-2 border-2 border-accent px-2 py-1">
                    <MonoLabel bold className="text-accent">
                      {band.name}
                    </MonoLabel>
                  </span>
                ) : (
                  /* ink, not muted — the deeper strata tints eat muted's
                     contrast (3.2:1 on band 04) */
                  <MonoLabel bold className="block text-ink">
                    {band.n} · {band.name}
                  </MonoLabel>
                )}
                <p
                  className={cn("type-display-s mt-1", bedrock ? "" : "text-ink")}
                  style={bedrock ? { color: "var(--bg)" } : undefined}
                >
                  {band.line.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const MARKS: Array<{ top: string; left: string; rotate: string }> = [
  { top: "12%", left: "38%", rotate: "-8deg" },
  { top: "58%", left: "30%", rotate: "6deg" },
  { top: "24%", left: "58%", rotate: "10deg" },
  { top: "62%", left: "70%", rotate: "-5deg" },
  { top: "18%", left: "84%", rotate: "4deg" },
  { top: "60%", left: "90%", rotate: "-10deg" },
];

function QuestionTexture() {
  return (
    <span aria-hidden className="absolute inset-0">
      {MARKS.map((m, i) => (
        <span
          key={i}
          className="type-mono-stat absolute select-none text-ink"
          style={{ top: m.top, left: m.left, transform: `rotate(${m.rotate})`, opacity: 0.12 }}
        >
          ?
        </span>
      ))}
    </span>
  );
}
