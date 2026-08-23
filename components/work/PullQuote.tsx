import type { ReactNode } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";

/**
 * §7.3 pull-quote — verbatim-Pragaman lines set display-s Bricolage 700
 * with a coral 3px left rule. Quotes are content, never invented here.
 */
export function PullQuote({
  children,
  sourceRef,
}: {
  children: ReactNode;
  sourceRef?: string;
}) {
  return (
    <blockquote className="my-8 border-l-[3px] border-accent pl-5">
      <p className="type-display-s text-ink">{children}</p>
      {sourceRef && (
        <footer className="mt-2">
          <MonoLabel>{sourceRef}</MonoLabel>
        </footer>
      )}
    </blockquote>
  );
}
