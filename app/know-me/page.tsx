import { PolaroidHero } from "@/components/know/PolaroidHero";
import { LevelGrid } from "@/components/know/LevelGrid";
import { lockedKnowSlugs } from "@/lib/know";
import hubJson from "@/content/know/hub.json";
import type { KnowHubContent } from "@/lib/content";

const hub = hubJson as KnowHubContent;

export const metadata = { title: "know me — pragaman" };

/** Know Me hub (§11.0–11.1): playful hero → the level-select grid. */
export default function KnowMeHub() {
  return (
    <main className="container-site py-16 md:py-20">
      <PolaroidHero hero={hub.hero} />
      <section className="mt-20 md:mt-28">
        <LevelGrid
          levels={hub.levels}
          lockedSlugs={lockedKnowSlugs()}
          chips={hub.statusChips}
        />
      </section>
    </main>
  );
}
