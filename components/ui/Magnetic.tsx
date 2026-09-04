"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Magnetic hover (chunk 6 — DECISIONS.md 3 Sep 2026, "§5 / D-7 motion
 * budget"): while a mouse pointer is over the wrapper, the child leans
 * toward it by up to `strength` px and springs back on leave. Mouse only —
 * touch pointers and reduced motion leave it inert — and purely a transform,
 * so the button's own hover/press grammar still applies inside.
 */
export function Magnetic({
  strength = 6,
  className,
  children,
}: {
  strength?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.div>
  );
}
