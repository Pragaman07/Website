"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMode } from "@/lib/mode";
import { useSfx } from "@/lib/sound";
import { useEggFound } from "@/lib/eggs";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Memoji } from "@/components/ui/Memoji";
import eggsJson from "@/content/eggs.json";
import type { EggsContent } from "@/lib/content";

const eggs = eggsJson as EggsContent;

/**
 * §12.1 — identity_crisis.exe. ≥8 toggle flips inside 10s → an on-brand
 * fake error card (ink card, coral titlebar, mono chrome — NOT a BSOD
 * clone), glitch sound, 2px page shake, once per session. Esc or the
 * button dismisses; focus is trapped on the dialog.
 */
export function IdentityCrisisOverlay() {
  const { rapidFlipCount } = useMode();
  const [open, setOpen] = useState(false);
  const playGlitch = useSfx("glitch");
  const markFound = useEggFound();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (rapidFlipCount < 8 || open) return;
    try {
      if (sessionStorage.getItem("pragaman-egg1-shown")) return;
      sessionStorage.setItem("pragaman-egg1-shown", "1");
    } catch {
      /* still show it once for this render */
    }
    setOpen(true);
    playGlitch();
    markFound(1);
    document.documentElement.classList.add("egg-shake");
    window.setTimeout(
      () => document.documentElement.classList.remove("egg-shake"),
      250,
    );
  }, [rapidFlipCount, open, playGlitch, markFound]);

  useEffect(() => {
    if (!open) return;
    buttonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // single-control focus trap
      if (e.key === "Tab") {
        e.preventDefault();
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-6"
      style={{ background: "var(--scrim)" }}
    >
      <motion.div
        role="alertdialog"
        aria-modal="true"
        aria-label={eggs.identityCrisis.chrome.text}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.1 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md overflow-hidden rounded-card border border-line bg-surface shadow-hover"
      >
        <div className="flex items-center justify-between bg-accent px-4 py-2.5">
          <MonoLabel bold className="text-on-accent">
            {eggs.identityCrisis.chrome.text}
          </MonoLabel>
          <span aria-hidden className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-pill bg-on-accent/30" />
            ))}
          </span>
        </div>
        <div className="flex items-start gap-4 p-6">
          {/* the surprised face — memoji map, DECISIONS.md 3 Sep */}
          <Memoji name="surprise" sizes="64px" className="w-16 shrink-0 -rotate-6" />
          <div className="min-w-0">
          <p className="type-data text-ink">{eggs.identityCrisis.body.text}</p>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="mt-6 rounded-btn bg-accent px-5 py-2.5 font-bold text-on-accent transition-colors duration-150 hover:bg-accent-deep"
          >
            {eggs.identityCrisis.button.text}
          </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
