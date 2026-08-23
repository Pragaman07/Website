"use client";

import { useMidnight } from "@/lib/midnight";
import { Pending } from "@/components/ui/Pending";
import { cn } from "@/lib/cn";
import type { CopyString } from "@/lib/content";

/**
 * §12.7 — a line that swaps after midnight (00:00–04:59). Renders the
 * normal copy (or its Pending) by day; the midnight variant in the small
 * hours. The slot always reserves its line — no layout shift.
 */
export function MidnightLine({
  normal,
  midnight,
  className,
  doodle = false,
}: {
  normal: CopyString;
  midnight: CopyString;
  className?: string;
  /** Know Me annotation variant (Caveat, aria-hidden). */
  doodle?: boolean;
}) {
  const isMidnight = useMidnight();
  const text = isMidnight ? midnight.text : normal.text;

  if (doodle) {
    return (
      <span aria-hidden className={cn("type-doodle", className)}>
        {text ?? ""}
      </span>
    );
  }

  return (
    <div className={cn("min-h-[1.7em]", className)}>
      {text ? (
        <p className="type-body-l text-muted">{text}</p>
      ) : normal.pending && !isMidnight ? (
        <Pending id={normal.pending} note={normal.note} />
      ) : null}
    </div>
  );
}
