"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMode } from "@/lib/mode";

/**
 * §3.3 step 1 — the "temperature front": a soft radial bloom at 8% opacity
 * originating from the toggle, expanding past 1.5× the viewport, then
 * fading. Warmth (sun) when entering Know Me; crisp white when entering
 * Work — both palette colors, nothing invented. Skipped under reduced
 * motion (the provider never sets a bloom then).
 */
export function TemperatureLayer() {
  const { bloom } = useMode();

  return (
    <AnimatePresence>
      {bloom && (
        <motion.span
          key={bloom.key}
          aria-hidden
          className="pointer-events-none fixed z-[90] h-[200px] w-[200px] rounded-pill"
          style={{
            left: bloom.x - 100,
            top: bloom.y - 100,
            background: `radial-gradient(circle, ${
              bloom.to === "know" ? "#ffc94d" : "#ffffff"
            } 0%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 0.08 }}
          animate={{
            scale: bloomScale(bloom.x, bloom.y),
            opacity: [0.08, 0.08, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], times: [0, 0.7, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

/** Scale factor that carries the 200px seed past 1.5× the viewport. */
function bloomScale(x: number, y: number): number {
  if (typeof window === "undefined") return 12;
  const w = Math.max(x, window.innerWidth - x);
  const h = Math.max(y, window.innerHeight - y);
  return (Math.hypot(w, h) * 1.5 * 2) / 200;
}
