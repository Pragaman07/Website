import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
};

/**
 * §6.1 — primary: coral, ink text, 10px radius, hover → --accent-deep + 2px lift,
 * a 3% squash on press (chunk 6; off under reduced motion).
 * secondary: text link in --accent-deep (small coral text rule §13), underline on hover.
 */
export function Button({
  variant = "primary",
  href,
  onClick,
  type = "button",
  className,
  children,
}: ButtonProps) {
  /* §13 contrast rulings (DECISIONS.md): primary = ink on coral (5.8:1 at
     any size) — --on-accent, which stays ink in the dark theme too;
     secondary = ink text with a coral underline — small accent-deep text
     alone misses AA (3.45:1). */
  const styles =
    variant === "primary"
      ? cn(
          "inline-block rounded-btn bg-accent px-5 py-3 font-bold text-on-accent",
          "transition-[background-color,transform,scale] duration-200 ease-out",
          "hover:-translate-y-0.5 hover:bg-accent-deep active:scale-[0.97]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
        )
      : cn(
          "inline-block font-medium text-ink underline decoration-accent decoration-2 underline-offset-4",
          "transition-colors duration-200 hover:text-accent-deep",
        );

  if (href) {
    return (
      <Link href={href} className={cn(styles, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(styles, className)}>
      {children}
    </button>
  );
}
