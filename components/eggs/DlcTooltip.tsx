"use client";

import { useEffect } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";

/**
 * §12.5 — the DLC tooltip: tap/click a grey state and it appears at the
 * point, auto-dismissing after 2.5s. Esc dismisses. (The egg-found
 * first-discovery chime joins in Phase 5 with the shared egg framework.)
 */
export function DlcTooltip({
  x,
  y,
  stateName,
  text,
  onDismiss,
}: {
  x: number;
  y: number;
  stateName: string;
  text: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 2500);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="pointer-events-none fixed z-[80] max-w-56 -translate-x-1/2 rounded-card border border-line bg-surface p-3 shadow-m"
      style={{ left: x, top: y + 12 }}
    >
      <MonoLabel bold className="block">
        LOCKED
      </MonoLabel>
      <p className="type-body-s mt-1 text-ink">{text}</p>
      <MonoLabel className="mt-1 block">{stateName}</MonoLabel>
    </div>
  );
}
