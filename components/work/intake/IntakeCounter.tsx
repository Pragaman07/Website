"use client";

import { motion } from "motion/react";
import { useCounters } from "@/lib/useCounters";
import type { Counters } from "@/lib/kv";
import type { IntakeContent } from "@/lib/content";

/**
 * §10 public counter — `Problems pitched: N · Replies sent: N`, display
 * numerals, aria-live polite. Reads the shared counters store
 * (lib/useCounters — one request per page for every readout, revalidated on
 * focus, updated in place by submits and sips). `override` lets the flow
 * push fresh counters from a submit response (optimistic + reconciled).
 */
export function IntakeCounter({
  content,
  override,
}: {
  content: IntakeContent["counter"];
  override?: Counters | null;
}) {
  const live = useCounters();
  const shown = override ?? live;
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
