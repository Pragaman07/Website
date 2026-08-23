"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Coffee } from "lucide-react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { useSfx } from "@/lib/sound";
import type { NumbersContent } from "@/lib/content";

/**
 * §12.4 — the coffee counter (egg 4): global, live, clickable. Click →
 * optimistic +1, POST /api/coffee (400ms debounce), coffee-sip sound,
 * cup tilts 15° on a spring, a little "+1" rises and fades. aria-live.
 */
export function CoffeeCounter({ content }: { content: NumbersContent["coffeeCounter"] }) {
  const [count, setCount] = useState<number | null>(null);
  const [particles, setParticles] = useState<number[]>([]);
  const [tiltKey, setTiltKey] = useState(0);
  const pending = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const playSip = useSfx("coffee-sip");
  const reduced = useReducedMotion();

  useEffect(() => {
    let live = true;
    fetch("/api/counters")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (live && d?.counters) setCount(d.counters.coffee);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const sip = () => {
    playSip();
    setCount((c) => (c ?? 0) + 1);
    setTiltKey((k) => k + 1);
    setParticles((p) => [...p.slice(-4), Date.now()]);

    // 400ms debounce: batch rapid clicks into one POST per pause.
    pending.current += 1;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      const clicks = pending.current;
      pending.current = 0;
      try {
        let latest: number | null = null;
        for (let i = 0; i < clicks; i++) {
          const res = await fetch("/api/coffee", { method: "POST" });
          if (res.status === 429) break;
          if (res.ok) latest = (await res.json()).coffee ?? latest;
        }
        if (latest !== null) setCount(latest);
      } catch {
        /* optimistic count stands; reconciles on next visit */
      }
    }, 400);
  };

  return (
    <div className="break-inside-avoid rounded-card border border-line bg-surface p-6 md:p-8">
      <MonoLabel bold className="block">
        {content.label.text}
      </MonoLabel>
      <div className="mt-4 flex items-center gap-5">
        <span aria-live="polite" className="type-mono-stat-xl text-ink">
          {count === null ? "—" : count.toLocaleString("en-US")}
        </span>
        <span className="relative">
          <button
            type="button"
            onClick={sip}
            aria-label={content.label.text ?? "Coffee counter"}
            className="grid h-14 w-14 place-items-center rounded-pill border border-line bg-bg text-ink transition-colors duration-150 hover:border-accent"
          >
            {/* keyed span (not the button) re-runs the tilt without
                remounting the button — focus survives every sip */}
            <motion.span
              key={tiltKey}
              initial={false}
              animate={reduced ? {} : { rotate: [0, 15, 0] }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Coffee size={26} aria-hidden />
            </motion.span>
          </button>
          <AnimatePresence>
            {particles.map((id) => (
              <motion.span
                key={id}
                aria-hidden
                className="type-mono-stat pointer-events-none absolute -top-1 left-1/2 font-bold text-accent-deep"
                initial={{ opacity: 1, y: 0, x: "-50%" }}
                animate={{ opacity: 0, y: -24 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.1 : 0.7, ease: "easeOut" }}
                onAnimationComplete={() =>
                  setParticles((p) => p.filter((x) => x !== id))
                }
              >
                +1
              </motion.span>
            ))}
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
