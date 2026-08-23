"use client";

import { cn } from "@/lib/cn";
import type { IntakeStep } from "@/lib/content";

/**
 * §10 step 4 — severity as 4 large radio cards (locked copy). Native
 * radios (visually hidden) keep arrow-key group navigation for free;
 * selected = coral border + tint.
 */
export function SeverityCards({
  step,
  value,
  onChange,
}: {
  step: IntakeStep;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={step.question.text} className="grid gap-3 sm:grid-cols-2">
      {(step.options ?? []).map((option) => {
        const selected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex min-h-16 cursor-pointer items-center rounded-card border px-5 py-4 transition-colors duration-150",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline",
              selected
                ? "border-accent bg-accent/10"
                : "border-line bg-surface hover:border-accent",
            )}
          >
            <input
              type="radio"
              name="severity"
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className={cn("type-body font-medium", selected ? "text-ink" : "text-ink")}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
