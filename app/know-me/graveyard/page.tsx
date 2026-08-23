import Link from "next/link";
import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Tombstone } from "@/components/know/Tombstone";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import { SHOW_PENDING } from "@/lib/flags";
import graveyardJson from "@/content/know/graveyard.json";
import hubJson from "@/content/know/hub.json";
import type { GraveyardContent, KnowHubContent } from "@/lib/content";

const content = graveyardJson as GraveyardContent;
const title =
  (hubJson as KnowHubContent).levels.find((l) => l.slug === "graveyard")?.title ?? "";

export const metadata = { title: "the graveyard — pragaman" };

/**
 * §11.2 — The Graveyard. Title wears Black Ops One: its ONLY appearance
 * on the whole site. Empty section → 404 in prod (locked tile on the hub);
 * dev renders three placeholder tombstones so the design is reviewable.
 */
export default function GraveyardPage() {
  const locked = lockedKnowSlugs().has("graveyard");
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
        <h1
          className="mt-3 text-ink"
          style={{
            fontFamily: "var(--font-stencil)",
            fontSize: "clamp(34px, 6vw, 56px)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        <MonoLabel className="mt-3 block">{content.subline.text}</MonoLabel>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.items.length > 0
          ? content.items.map((item, i) => (
              <Tombstone
                key={item.name}
                name={item.name}
                born={item.born}
                died={item.died}
                epitaph={item.epitaph}
                causeOfDeath={item.causeOfDeath}
                rotate={((i % 3) - 1) as -1 | 0 | 1}
              />
            ))
          : [0, 1, 2].map((i) => (
              <Tombstone key={i} rotate={((i % 3) - 1) as -1 | 0 | 1}>
                <div className="mt-2 text-left">
                  <Pending
                    id="P9-P12"
                    note="A real abandoned idea takes this plot once Section 2 answers land."
                  />
                </div>
              </Tombstone>
            ))}
      </section>

      <LevelFooterNav current="graveyard" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
