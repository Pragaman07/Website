"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMode } from "@/lib/mode";
import { useSfx } from "@/lib/sound";
import { MonoLabel } from "@/components/ui/MonoLabel";
import type { GlobalContent } from "@/lib/content";

/**
 * §3.2 — the persistent toggle. Pill 72×36, 30px knob carrying the
 * headshot (Work) / memoji (Know Me) — permanent, locked. Flip slides the
 * knob (180ms spring), crossfades the face mid-slide, fires the §3.3
 * temperature transition + toggle-flip sound.
 */
export function ModeToggle({ content }: { content: GlobalContent["toggle"] }) {
  const { mode, flip } = useMode();
  const playFlip = useSfx("toggle-flip");
  const knobRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isKnow = mode === "know";

  const onFlip = () => {
    playFlip();
    const rect = knobRef.current?.getBoundingClientRect();
    flip(
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined,
    );
  };

  const aria = (isKnow ? content.ariaToWork.text : content.ariaToKnow.text) ?? "Switch mode";

  return (
    <div className="flex items-center gap-2">
      <MonoLabel bold className="hidden md:inline" aria-hidden>
        {(isKnow ? content.knowLabel.text : content.workLabel.text) ?? ""}
      </MonoLabel>
      <button
        type="button"
        onClick={onFlip}
        aria-pressed={isKnow}
        aria-label={aria}
        className="relative h-9 w-[72px] shrink-0 rounded-pill border border-line"
        style={{
          background: "color-mix(in srgb, var(--ink) 8%, var(--bg))",
        }}
      >
        <motion.span
          ref={knobRef}
          className="absolute top-[2px] block h-[30px] w-[30px] overflow-hidden rounded-pill bg-surface shadow-s"
          initial={false}
          animate={{ left: isKnow ? 38 : 2 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 700, damping: 30, mass: 0.6 }
          }
        >
          {/* Face crossfade at mid-slide (~90ms). Placeholder art until
              Pragaman's real headshot + memoji arrive (PENDING: PHOTOS). */}
          <motion.img
            src="/images/placeholder-headshot.svg"
            alt=""
            className="absolute inset-0 h-full w-full"
            initial={false}
            animate={{ opacity: isKnow ? 0 : 1 }}
            transition={{ duration: reduced ? 0 : 0.09, delay: reduced ? 0 : 0.045 }}
          />
          <motion.img
            src="/images/placeholder-memoji.svg"
            alt=""
            className="absolute inset-0 h-full w-full"
            initial={false}
            animate={{ opacity: isKnow ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.09, delay: reduced ? 0 : 0.045 }}
          />
        </motion.span>
      </button>
    </div>
  );
}
