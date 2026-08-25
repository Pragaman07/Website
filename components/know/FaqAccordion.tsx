"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { FaqContent } from "@/lib/content";

/**
 * §11.6 — the self-interview accordion. One answer open at a time;
 * standard disclosure pattern (button + aria-expanded + labelled region),
 * so keyboard is just Tab + Enter/Space. Answers flagged `unhinged`
 * render in Caveat (.type-doodle — Know Me only, never below 18px).
 */
export function FaqAccordion({ items }: { items: FaqContent["items"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex max-w-[720px] flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="rounded-card border border-line bg-surface"
          >
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-baseline justify-between gap-4 p-5 text-left"
              >
                <span className="type-display-s text-ink">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "type-mono-stat shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className="px-5 pb-5"
              >
                <p
                  className={cn(
                    item.unhinged ? "type-doodle text-ink" : "type-body text-muted",
                  )}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
