import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { CoffeeCounter } from "@/components/know/CoffeeCounter";
import { MetricCard } from "@/components/know/MetricCard";
import { LevelFooterNav } from "@/components/know/LevelFooterNav";
import { lockedKnowSlugs } from "@/lib/know";
import numbersJson from "@/content/know/numbers.json";
import type { NumbersContent } from "@/lib/content";

const content = numbersJson as NumbersContent;

export const metadata = { title: "life in numbers — pragaman" };

/** §11.3 — Life in Numbers: the parody metrics dashboard. The coffee
 *  counter (egg 4) is the biggest card; more KPIs land with P13–P20. */
export default function NumbersPage() {
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

      <Reveal className="mt-12">
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          <CoffeeCounter content={content.coffeeCounter} />
          {content.stats.map((stat) => (
            <MetricCard key={stat.metric} stat={stat} />
          ))}
          {content.pending && (
            <div className="break-inside-avoid">
              <Pending id={content.pending} note={content.note} />
            </div>
          )}
        </div>
      </Reveal>

      <LevelFooterNav current="numbers" lockedSlugs={lockedKnowSlugs()} />
    </main>
  );
}
