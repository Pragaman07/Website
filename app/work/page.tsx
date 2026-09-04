import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Memoji } from "@/components/ui/Memoji";
import { Rise, RiseWords } from "@/components/ui/Rise";
import { Spring } from "@/components/ui/Spring";
import { Magnetic } from "@/components/ui/Magnetic";
import { ProofStrip } from "@/components/work/ProofStrip";
import { CaseCards } from "@/components/work/CaseCards";
import { MethodTeaser } from "@/components/work/MethodTeaser";
import { PitchBlock } from "@/components/work/intake/PitchBlock";
import { MidnightLine } from "@/components/eggs/MidnightSwap";
import homeJson from "@/content/work/home.json";
import intakeJson from "@/content/work/intake.json";
import type { IntakeContent, WorkHomeContent } from "@/lib/content";

const home = homeJson as WorkHomeContent;
const intake = intakeJson as unknown as IntakeContent;

/**
 * Work home (Design Spec §6): hero → case cards → method teaser → the pitch
 * block. The receipts and the pitch sections are full-bleed on the coral
 * wash (DECISIONS.md 3 Sep 2026 "Revamp brief — scope" — the site's only
 * gradient); the §6.1 hero stays flat. Chunk 6 choreographs the first fold:
 * eyebrow → headline words → sub-line → CTAs → proof strip rise in sequence
 * (CSS, LCP-safe), the memoji springs in after them and then breathes, the
 * primary CTA is magnetic (DECISIONS.md 3 Sep, "§5 / D-7 motion budget").
 */
export default function WorkHome() {
  return (
    <main>
      {/* §6.1 hero — flat --bg, everything in the first fold. The hands-on-
          waist memoji joins it (memoji map, DECISIONS.md 3 Sep — a memoji,
          not the photo §6.1 kept out): small and top-right on mobile, a right
          column standing on the proof strip's baseline from md up. */}
      <section className="container-site pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
          <Spring delay={0.45} className="mb-6 ml-auto w-32 md:order-2 md:mb-0 md:w-56 lg:w-64">
            <Memoji
              name="hands"
              priority
              sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 128px"
              className="bob w-full"
            />
          </Spring>
          <div className="max-w-[800px] md:order-1">
            <Rise>
              <MonoLabel bold as="p">
                {home.hero.eyebrow.text}
              </MonoLabel>
            </Rise>
            <h1 className="type-display-xl mt-4 text-ink">
              <RiseWords
                text={home.hero.headline.text ?? ""}
                accentPhrase={home.hero.headline.accentPhrase}
                startDelay={80}
              />
            </h1>
            {/* sub-line slot — reserved line; egg 7 swaps it after midnight */}
            <Rise delay={520} className="mt-5">
              <MidnightLine
                normal={home.hero.subline}
                midnight={home.hero.midnightSubline}
                className="max-w-md"
              />
            </Rise>
            <Rise delay={600} className="mt-8 flex flex-wrap items-center gap-6">
              <Magnetic>
                <Button href="#intake">{home.hero.ctaPrimary.text}</Button>
              </Magnetic>
              <Button variant="secondary" href="#cases">
                {home.hero.ctaSecondary.text}
              </Button>
            </Rise>
            <Rise delay={680}>
              <ProofStrip stats={home.proofStrip.stats} />
            </Rise>
          </div>
        </div>
      </section>

      {/* §6.2 the receipts — 3-up cards / mobile swipe rail (DECISIONS.md
          3 Sep "§6.2 case cards") on the coral wash */}
      <section id="cases" className="wash-coral scroll-mt-20">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <MonoLabel bold as="p">
              {home.cases.sectionEyebrow.text}
            </MonoLabel>
            <h2 className="type-display-m mt-2 text-ink">{home.cases.sectionTitle.text}</h2>
          </Reveal>
          <CaseCards cases={home.cases} />
        </div>
      </section>

      {/* §6.3 method teaser */}
      <section className="container-site py-4 md:py-8">
        <Reveal>
          <MethodTeaser content={home.methodTeaser} />
        </Reveal>
      </section>

      {/* §6.4 the pitch block — centred lead + the §10 card expanding inline
          (DECISIONS.md 3 Sep "§10 pitch block"). The contact block now lives
          in the footer (§2.3 as amended). */}
      <section id="intake" className="wash-coral scroll-mt-20">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <PitchBlock content={intake} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
