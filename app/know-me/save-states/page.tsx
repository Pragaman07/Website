import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { SaveStatesClient } from "@/components/know/SaveStatesClient";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import { INDIA } from "@/lib/india";
import saveStatesJson from "@/content/know/save-states.json";
import type { SaveStatesContent } from "@/lib/content";

const content = saveStatesJson as SaveStatesContent;

export const metadata = { title: "save states — pragaman" };

/**
 * §11.4 — Save States: India as a memory card. The four home states
 * (the journey) are solid coral save slots; the rest is undiscovered DLC.
 * Map depiction per Pragaman's ruling: the whole of Kashmir is India.
 */
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

      <section className="mt-10">
        <SaveStatesClient
          viewBox={INDIA.viewBox}
          states={INDIA.states}
          cities={INDIA.cities}
          content={content}
        />
      </section>

      {content.visitedStates.pending && (
        <div className="mt-8 max-w-md">
          <Pending id={content.visitedStates.pending} note={content.visitedStates.note} />
        </div>
      )}

      <LevelFooterNav current="save-states" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
