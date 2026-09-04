"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Memoji } from "@/components/ui/Memoji";
import { IntakeCard } from "@/components/work/intake/IntakeCard";
import { IntakeCounter } from "@/components/work/intake/IntakeCounter";
import { cn } from "@/lib/cn";
import type { Counters } from "@/lib/kv";
import type { IntakeContent } from "@/lib/content";

/**
 * §10 as amended (DECISIONS.md 3 Sep 2026 "§10 pitch block") — the centred
 * lead block: title · sub · ONE pill CTA · the live counter as the
 * reassurance line · the call-me memoji beside the CTA/counter stack on
 * md+ (above the title below md). The 5-step card expands INLINE beneath
 * it — no modal: on the CTA (focus lands in step 1's field), on arriving
 * with #intake, on a hashchange to it, on any same-page a[href="#intake"]
 * click (Next's Link pushes state, so hashchange never fires for it), and
 * on the dev-only ?intake=success preview. Counters the card reports after
 * a submit feed the lead block's counter, so the reassurance line ticks.
 */
type Expanded = "closed" | "quiet" | "focus";

export function PitchBlock({ content }: { content: IntakeContent }) {
  const [expanded, setExpanded] = useState<Expanded>("closed");
  const [counters, setCounters] = useState<Counters | null>(null);
  const reduced = useReducedMotion();

  // Quiet expansions never downgrade a focus-carrying one.
  const openQuiet = useCallback(() => {
    setExpanded((prev) => (prev === "closed" ? "quiet" : prev));
  }, []);

  useEffect(() => {
    const isSuccessPreview = () =>
      process.env.NODE_ENV !== "production" &&
      new URLSearchParams(window.location.search).get("intake") === "success";
    if (window.location.hash === "#intake" || isSuccessPreview()) openQuiet();

    const onHash = () => {
      if (window.location.hash === "#intake") openQuiet();
    };
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target instanceof Element ? e.target : null;
      const anchor = target?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hash === "#intake" && anchor.pathname === window.location.pathname) {
        openQuiet();
      }
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [openQuiet]);

  const isOpen = expanded !== "closed";

  return (
    <div>
      {/* Below md: a centred stack, memoji first. From md: a 3-column grid —
          title/sub span it, the CTA + counter stack sits in the auto middle
          column (so it stays truly centred) and the memoji takes the right
          column beside that stack, never over the text. */}
      <div className="flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr]">
        <Memoji
          name="call"
          sizes="(min-width: 768px) 144px, 112px"
          className="order-first w-28 md:order-none md:col-start-3 md:row-span-2 md:row-start-3 md:ml-4 md:w-32 md:rotate-6 md:self-start md:justify-self-start lg:w-36"
        />
        <h2 className="type-display-l mt-6 max-w-[14ch] text-center text-ink md:col-span-3 md:row-start-1 md:mt-0 md:justify-self-center">
          {content.header.title.text}
        </h2>
        <p className="type-body-l mt-4 max-w-md text-center text-muted md:col-span-3 md:row-start-2 md:justify-self-center">
          {content.header.sub.text}
        </p>
        {!isOpen && (
          <button
            type="button"
            onClick={() => setExpanded("focus")}
            className={cn(
              "mt-8 rounded-pill bg-accent px-7 py-3.5 font-bold text-on-accent md:col-start-2 md:row-start-3 md:self-end",
              "transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-deep",
              "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            )}
          >
            {content.lead.cta.text}
          </button>
        )}
        {/* the reassurance line — aria-live, revalidates on focus */}
        <div className="mt-4 flex justify-center md:col-start-2 md:row-start-4 md:self-start">
          <IntakeCounter content={content.counter} override={counters} />
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: 16, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-[560px]"
        >
          <IntakeCard
            content={content}
            lead
            focusOnMount={expanded === "focus"}
            onCounters={setCounters}
          />
        </motion.div>
      )}
    </div>
  );
}
