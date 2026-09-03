"use client";

import { useEffect, useRef, useState } from "react";

/**
 * §5 count-up — 0 → final over 800ms --ease-out on first reveal, tabular
 * figures (parent sets a stat type class), once per session per stat.
 * Reduced motion renders the final value immediately.
 */
export function CountUp({
  id,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 800,
}: {
  /** Session key — each stat animates once per session. */
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    `${prefix}${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  // Server render + no-JS fallback: the final value, always.
  const [text, setText] = useState(() => format(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sessionKey = `pragaman-countup:${id}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(sessionKey)) {
      setText(format(value));
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        sessionStorage.setItem(sessionKey, "1");
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          setText(format(value * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setText(format(0));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, value, decimals, prefix, suffix, durationMs]);

  return <span ref={ref}>{text}</span>;
}
