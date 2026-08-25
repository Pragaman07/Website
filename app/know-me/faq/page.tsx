import Link from "next/link";
import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/know/FaqAccordion";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import { SHOW_PENDING } from "@/lib/flags";
import faqJson from "@/content/know/faq.json";
import type { FaqContent } from "@/lib/content";

const content = faqJson as FaqContent;

export const metadata = { title: "faq nobody asked — pragaman" };

/** §11.6 — FAQ Nobody Asked: a self-interview accordion. Empty → locked
 *  tile + 404 (thin-section rule §14). */
export default function FaqPage() {
  const locked = lockedKnowSlugs().has("faq");
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
          <FaqAccordion items={content.items} />
        ) : (
          <div className="max-w-md">
            <Pending id={content.pending ?? "SECTION-2"} note={content.note} />
          </div>
        )}
      </Reveal>

      {content.items.length > 0 && content.pending && (
        <div className="mt-8 max-w-md">
          <Pending id={content.pending} note={content.note} />
        </div>
      )}

      <LevelFooterNav current="faq" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
