import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import type { WorkHomeContent } from "@/lib/content";

type CardData = WorkHomeContent["cases"]["cards"][number];

/**
 * §6.2 — full-width case-study row card: tag · title + hook · ONE hero
 * stat · arrow that slides 4px on hover. Whole card clickable, lift+shadow.
 */
export function CaseCard({ card }: { card: CardData }) {
  return (
    <Link
      href={`/work/${card.slug}`}
      className="group grid items-center gap-x-8 gap-y-3 rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[110px_1fr_auto_24px] md:p-8"
    >
      <MonoLabel bold>{card.tag}</MonoLabel>
      <span className="min-w-0">
        <span className="type-display-s block text-ink">{card.title}</span>
        {card.hook.text ? (
          <span className="type-body mt-1 block text-muted">{card.hook.text}</span>
        ) : card.hook.pending ? (
          <span className="mt-2 block max-w-sm">
            <Pending id={card.hook.pending} note={card.hook.note} />
          </span>
        ) : null}
      </span>
      <span className="type-mono-stat-xl text-ink md:text-right">
        {card.heroStat.render}
      </span>
      <span
        aria-hidden
        className="hidden font-bold text-accent-deep transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none md:block"
      >
        →
      </span>
    </Link>
  );
}
