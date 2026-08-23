import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { lockedKnowSlugs } from "@/lib/know";
import { SHOW_PENDING } from "@/lib/flags";
import rentFreeJson from "@/content/know/rent-free.json";
import type { RentFreeContent } from "@/lib/content";

const content = rentFreeJson as RentFreeContent;

export const metadata = { title: "rent-free — pragaman" };

/** §11.5 — Rent-Free. Empty → locked tile + 404 (thin-section rule);
 *  the masonry grid builds when P21/P24 content lands. */
export default function RentFreePage() {
  if (lockedKnowSlugs().has("rent-free") && !SHOW_PENDING) notFound();

  return (
    <main className="container-site py-12 md:py-16">
      <MonoLabel bold as="p">
        {content.eyebrow.text}
      </MonoLabel>
      <p className="type-body mt-2 text-muted">{content.subline.text}</p>
      <div className="mt-8 max-w-md">
        <Pending id={content.pending ?? "P21-P24"} note={content.note} />
      </div>
    </main>
  );
}
