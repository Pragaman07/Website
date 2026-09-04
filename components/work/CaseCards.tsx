import { Reveal } from "@/components/ui/Reveal";
import { CaseCard } from "@/components/work/CaseCard";
import { cn } from "@/lib/cn";
import type { WorkHomeContent } from "@/lib/content";

/**
 * §6.2 as amended (DECISIONS.md 3 Sep 2026 "§6.2 case cards") — the
 * receipts, in spec order: a 3-up equal-height grid from md, a horizontal
 * snap rail below it (native scroll, no JS carousel — momentum, keyboard
 * and the browser's own scroll-into-view on tab all come for free). The
 * rail bleeds to the viewport edge and pads back by the container's inline
 * padding so the first card lines up with the heading above. The featured
 * card sits ~10px higher than its neighbours on md+ (a transform on the
 * list item, so the grid's row heights stay equal).
 */
export function CaseCards({ cases }: { cases: WorkHomeContent["cases"] }) {
  return (
    <ul
      role="list"
      className={cn(
        "-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 pt-3 scroll-px-6",
        "[-webkit-overflow-scrolling:touch] [scrollbar-color:var(--line)_transparent] [scrollbar-width:thin]",
        "md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-2.5",
      )}
    >
      {cases.cards.map((card, i) => {
        const featured = card.slug === cases.featured.slug;
        return (
          <li
            key={card.slug}
            className={cn(
              "w-[85vw] shrink-0 snap-start md:w-auto",
              featured && "md:-translate-y-2.5",
            )}
          >
            <Reveal delay={i * 60} className="h-full">
              <CaseCard
                card={card}
                featured={featured}
                featuredLabel={cases.featured.label}
                readLabel={cases.readLabel}
              />
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
