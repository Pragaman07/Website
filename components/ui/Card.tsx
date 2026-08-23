import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Base surface (§1.3): 18px radius, 1px --line border — shadow alone is
 * never the only edge. Hover grammar (§5): lift 2px + --shadow-hover.
 */
export function Card({
  hover = false,
  dashed = false,
  className,
  children,
}: {
  /** Apply the lift+shadow hover grammar (for clickable cards). */
  hover?: boolean;
  dashed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border bg-surface",
        dashed ? "border-dashed border-line" : "border-line",
        hover &&
          "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
