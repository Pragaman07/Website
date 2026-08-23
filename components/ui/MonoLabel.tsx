import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The mono-label voice (§1.2): Space Mono 11px, 0.14em tracking, uppercase.
 * Eyebrows, tags, version numbers, table headers — every label wears this.
 */
export function MonoLabel({
  as: Tag = "span",
  bold = false,
  accent = false,
  className,
  children,
}: {
  as?: ElementType;
  bold?: boolean;
  /** Small text — coral is only safe as --accent-deep here (§13). */
  accent?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "type-mono-label",
        bold && "font-bold",
        accent ? "text-accent-deep" : "text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
