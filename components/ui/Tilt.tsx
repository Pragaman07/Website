"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Pointer tilt (chunk 6 — DECISIONS.md 3 Sep 2026, "§5 / D-7 motion
 * budget"): a card rotates up to `max` degrees toward the mouse pointer
 * (with perspective) and springs flat on leave. Mouse only — touch and
 * reduced motion leave it inert. Wraps a full-height child; the card's own
 * hover lift/shadow live on the card, this only turns it.
 */
export function Tilt({
  max = 4,
  className,
  children,
}: {
  max?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.6 });

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 2 * max);
    rx.set(-py * 2 * max);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("h-full", className)}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.div>
  );
}
