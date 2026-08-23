import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { lockedKnowSlugs } from "@/lib/know";
import { SHOW_PENDING } from "@/lib/flags";
import faqJson from "@/content/know/faq.json";
import type { FaqContent } from "@/lib/content";

const content = faqJson as FaqContent;

export const metadata = { title: "faq nobody asked — pragaman" };

/** §11.6 — FAQ Nobody Asked. Empty → locked tile + 404; the accordion
 *  builds when Section 2 + W34–37 feeders land. */
export default function FaqPage() {
  if (lockedKnowSlugs().has("faq") && !SHOW_PENDING) notFound();

  return (
    <main className="container-site py-12 md:py-16">
      <MonoLabel bold as="p">
        {content.eyebrow.text}
      </MonoLabel>
      <p className="type-body mt-2 text-muted">{content.subline.text}</p>
      <div className="mt-8 max-w-md">
        <Pending id={content.pending ?? "SECTION-2"} note={content.note} />
      </div>
    </main>
  );
}
