import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { AnimatedStat } from "@/components/work/AnimatedStat";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/cn";
import type { CopyString, WorkHomeContent } from "@/lib/content";

type CardData = WorkHomeContent["cases"]["cards"][number];

/**
 * §6.2 as amended (DECISIONS.md 3 Sep 2026 "§6.2 case cards") — one
 * card-style case study: tag (+ featured chip) → title → hook → ONE hero
 * stat (count-up) → three ✓ receipts straight from facts.json render
 * strings → link. Exactly one interactive element: the bottom link,
 * stretched over the whole card, so hover lift/shadow and the focus ring
 * belong to the card. The featured card is raised by its rail (CaseCards),
 * carries shadow-m at rest and a faint coral edge — Work mode restraint.
 * Chunk 6: the card turns toward the mouse (Tilt) and its button squashes
 * on press; both inert for touch and reduced motion.
 */
export function CaseCard({
  card,
  featured = false,
  featuredLabel,
  readLabel,
}: {
  card: CardData;
  featured?: boolean;
  featuredLabel: CopyString;
  readLabel: CopyString;
}) {
  const titleId = `case-${card.slug}-title`;
  const linkId = `case-${card.slug}-link`;

  return (
    <Tilt>
      <article
        className={cn(
          "group relative flex h-full flex-col rounded-card border bg-surface p-6 md:p-8",
          "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          /* the ring travels to the card — the link is the whole card (§13) */
          "has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent",
          featured ? "border-accent/40 shadow-m" : "border-line",
        )}
      >
        {/* the featured chip hangs on the card's top edge like a sticker, so it
            never fights the tag for width in a narrow md column (the rail's
            pt-3 leaves room for it above the card) */}
        {featured && featuredLabel.text && (
          <span className="type-mono-label absolute -top-3 right-5 whitespace-nowrap rounded-pill bg-band px-2.5 py-1 text-on-band">
            {featuredLabel.text}
          </span>
        )}
        <MonoLabel bold as="p">
          {card.tag}
        </MonoLabel>

        <h3 id={titleId} className="type-display-s mt-3 text-ink">
          {card.title}
        </h3>
        {card.hook.text ? (
          <p className="type-body mt-1 text-muted">{card.hook.text}</p>
        ) : card.hook.pending ? (
          <div className="mt-2">
            <Pending id={card.hook.pending} note={card.hook.note} />
          </div>
        ) : null}

        {/* card-scale numerals: the xl size only from lg, where a column is
            ~317px — at md (221px) it steps down so a stat holds two lines */}
        <p className="type-mono-stat-xl mt-6 text-balance text-ink md:text-[24px] lg:text-[clamp(26px,3vw,36px)]">
          <AnimatedStat id={`cases.${card.slug}.${card.heroStat.factId}`} render={card.heroStat.render} />
        </p>

        {/* three ✓ receipts — render strings live in home.json, ids in facts.json */}
        <ul className="mt-5 flex flex-col gap-2">
          {card.receipts.map((receipt) => (
            <li key={receipt.factId} className="flex items-start gap-2.5">
              <CheckMark />
              <span className="type-data text-ink">{receipt.render}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Link
            id={linkId}
            href={`/work/${card.slug}`}
            aria-labelledby={`${linkId} ${titleId}`}
            className={cn(
              /* stretched link: the ::after covers the card (article is relative) */
              "after:absolute after:inset-0 after:rounded-card focus-visible:outline-none",
              featured
                ? "inline-block rounded-btn bg-accent px-5 py-3 font-bold text-on-accent transition-[background-color,scale] duration-200 ease-out group-hover:bg-accent-deep active:scale-[0.97] focus-visible:rounded-btn motion-reduce:active:scale-100"
                : "inline-block font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-accent-deep",
            )}
          >
            {readLabel.text}
          </Link>
        </div>
      </article>
    </Tilt>
  );
}

/** The ✓ in the site's line grammar: 1.5px currentColor stroke, coral-deep. */
function CheckMark() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-[3px] shrink-0 text-accent-deep"
    >
      <polyline
        points="3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
