"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Counters } from "@/lib/kv";
import type { IntakeContent } from "@/lib/content";

/**
 * §10 public counter — `Problems pitched: N · Replies sent: N`, mono-stat,
 * aria-live polite, revalidates on window focus. `override` lets the flow
 * push fresh counters from a submit response (optimistic + reconciled).
 */
export function IntakeCounter({
  content,
  override,
}: {
  content: IntakeContent["counter"];
  override?: Counters | null;
}) {
  const [counters, setCounters] = useState<Counters | null>(null);

  useEffect(() => {
    let live = true;
    const load = async () => {
      try {
        const res = await fetch("/api/counters");
        if (!res.ok) return;
        const data = (await res.json()) as { counters?: Counters };
        if (live && data.counters) setCounters(data.counters);
      } catch {
        /* stays as dashes */
      }
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      live = false;
      window.removeEventListener("focus", load);
    };
  }, []);

  const shown = override ?? counters;
  const num = (n?: number) => (shown && n !== undefined ? String(n) : "—");

  return (
    <p aria-live="polite" className="type-mono-stat flex flex-wrap gap-x-2 text-muted">
      <span>
        {content.pitchedLabel.text}:{" "}
        <Tick value={num(shown?.pitched)} className="text-ink" />
      </span>
      <span aria-hidden>·</span>
      <span>
        {content.repliedLabel.text}:{" "}
        <Tick value={num(shown?.replied)} className="text-ink" />
      </span>
    </p>
  );
}

/** Small scale-pulse when the value changes (the §10 tick). */
function Tick({ value, className }: { value: string; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.25 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {value}
    </motion.span>
  );
}
