import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import saveStatesJson from "@/content/know/save-states.json";
import type { SaveStatesContent } from "@/lib/content";

const content = saveStatesJson as SaveStatesContent;

export const metadata = { title: "save states — pragaman" };

/** §11.4 — Save States. Interim shell: the India map + checkpoint path +
 *  slot panel land in chunk 4C. */
export default function SaveStatesPage() {
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
        <h1 className="type-display-l mt-2 -rotate-1 text-ink">{content.subline.text}</h1>
      </header>

      <div className="mt-10 max-w-md">
        <Pending
          id="PHASE-4C.map"
          note="India map (license-clean SVG), the four solid-coral home states, dotted checkpoint path, save-slot panel + mobile snap-rail — next chunk."
        />
      </div>

      <LevelFooterNav current="save-states" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
