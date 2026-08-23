"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";

/** §9 Work-dress filter chips: ALL · WORK. */
export function TagFilter({
  value,
  onChange,
}: {
  value: "all" | "work";
  onChange: (value: "all" | "work") => void;
}) {
  return (
    <div role="group" aria-label="Filter entries" className="flex gap-2">
      {(["all", "work"] as const).map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onChange(chip)}
          aria-pressed={value === chip}
          className={cn(
            "rounded-pill border px-3 py-1.5 transition-colors duration-150",
            value === chip
              ? "border-accent bg-accent/10"
              : "border-line bg-surface hover:border-accent",
          )}
        >
          <MonoLabel bold className="text-ink">
            {chip.toUpperCase()}
          </MonoLabel>
        </button>
      ))}
    </div>
  );
}
