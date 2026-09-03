"use client";

import { motion, useReducedMotion } from "motion/react";
import { Memoji } from "@/components/ui/Memoji";
import type { IntakeContent } from "@/lib/content";

/** §10 — the card's face after a successful pitch: heart-hands memoji
    (memoji map, DECISIONS.md 3 Sep) beside the thank-you. */
export function SuccessState({ content }: { content: IntakeContent["success"] }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { rotateY: 80, opacity: 0 }}
      animate={reduced ? { opacity: 1 } : { rotateY: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 800 }}
    >
      <div className="flex items-start gap-5">
        <Memoji name="heart" sizes="96px" className="w-24 shrink-0 -rotate-3" />
        <div className="min-w-0">
          <h4 tabIndex={-1} className="type-display-s text-ink">
            {content.title.text}
          </h4>
          <p className="type-body mt-2 text-muted">{content.sub.text}</p>
        </div>
      </div>
    </motion.div>
  );
}
