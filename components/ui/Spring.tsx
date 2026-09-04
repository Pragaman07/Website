"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Spring-in (chunk 6 — DECISIONS.md 3 Sep 2026, "§5 / D-7 motion budget"):
 * the child arrives on a spring — from `from` (offset / scale) to rest —
 * after `delay` seconds. For the figures that bring a page to life (the
 * hero memoji, the Door's memoji, the polaroid); text uses the CSS `Rise`.
 * Reduced motion: a 150ms fade, no transform. Decorative only — whatever
 * sits inside must already be fine at rest without this wrapper.
 */
export function Spring({
  delay = 0,
  from = { y: 24, scale: 0.92 },
  className,
  children,
}: {
  /** seconds after mount */
  delay?: number;
  from?: { y?: number; x?: number; scale?: number; rotate?: number };
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...from }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      transition={
        reduced
          ? { duration: 0.15, delay }
          : { type: "spring", stiffness: 260, damping: 20, mass: 0.8, delay }
      }
    >
      {children}
    </motion.div>
  );
}
