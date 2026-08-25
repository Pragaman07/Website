import Link from "next/link";
import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { RentFreeCard } from "@/components/know/RentFreeCard";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import { SHOW_PENDING } from "@/lib/flags";
import rentFreeJson from "@/content/know/rent-free.json";
import type { RentFreeContent } from "@/lib/content";

const content = rentFreeJson as RentFreeContent;

export const metadata = { title: "rent-free — pragaman" };

/** §11.5 — Rent-Free: a pinboard of things squatting in his head, as a
 *  CSS-columns masonry of pinned cards. Empty → locked tile + 404. */
export default function RentFreePage() {
  const locked = lockedKnowSlugs().has("rent-free");
  if (locked && !SHOW_PENDING) notFound();

  return (
    <main className="container-site py-12 md:py-16">
      <Link
        href="/know-me"
        className="type-mono-label font-bold text-muted transition-colors duration-200 hover:text-ink"
      >
        ← LEVEL SELECT
      </Link>

      <header className="mt-8">
        <MonoLabel bold as="p">
          {content.eyebrow.text}
        </MonoLabel>
        <h1 className="type-display-l mt-3 -rotate-1 text-ink">{content.subline.text}</h1>
      </header>

      <Reveal className="mt-12">
        {content.items.length > 0 ? (
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
            {content.items.map((item, i) => (
              <RentFreeCard key={i} item={item} index={i} />
            ))}
            {content.pending && (
              <div className="break-inside-avoid">
                <Pending id={content.pending} note={content.note} />
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-md">
            <Pending id={content.pending ?? "P21-P24"} note={content.note} />
          </div>
        )}
      </Reveal>

      <LevelFooterNav current="rent-free" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
