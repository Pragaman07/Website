import type { ElementType, HTMLAttributes, ReactNode } from "react";
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
  ...rest
}: {
  as?: ElementType;
  bold?: boolean;
  /** Small text — coral is only safe as --accent-deep here (§13). */
  accent?: boolean;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  // Default color only when the caller didn't set one — Tailwind class
  // ORDER in the stylesheet (not in the list) decides ties, so a caller's
  // text-accent could silently lose to our text-muted.
  const hasColor = accent || (className?.includes("text-") ?? false);
  return (
    <Tag
      className={cn(
        "type-mono-label",
        bold && "font-bold",
        accent && "text-accent-deep",
        !hasColor && "text-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
