import type { ComponentPropsWithoutRef } from "react";
import { Pending } from "@/components/ui/Pending";
import { PullStat } from "@/components/work/PullStat";
import { PullQuote } from "@/components/work/PullQuote";

/**
 * Components available inside case-study story MDX (§7.0 layer 2).
 * Prose: body-l in a 68ch column (the wrapper sets the column); section
 * titles display-m.
 */
export const storyComponents = {
  Pending,
  PullStat,
  PullQuote,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="type-display-m mt-14 text-ink first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="type-display-s mt-10 text-ink" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="type-body-l mt-5 text-ink" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="type-body-l mt-5 list-disc pl-6 text-ink" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="mt-2" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-accent-deep underline-offset-4 hover:underline"
      {...props}
    />
  ),
};
