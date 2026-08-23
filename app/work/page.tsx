import type { ReactNode } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { ProofStrip } from "@/components/work/ProofStrip";
import { CaseCard } from "@/components/work/CaseCard";
import { MethodTeaser } from "@/components/work/MethodTeaser";
import { IntakeCard } from "@/components/work/intake/IntakeCard";
import homeJson from "@/content/work/home.json";
import intakeJson from "@/content/work/intake.json";
import globalJson from "@/content/global.json";
import type { GlobalContent, IntakeContent, WorkHomeContent } from "@/lib/content";

const home = homeJson as WorkHomeContent;
const intake = intakeJson as unknown as IntakeContent;
const globalContent = globalJson as GlobalContent;

/** Work home (Design Spec §6): hero → case cards → method teaser → Intake. */
export default function WorkHome() {
  return (
    <main>
      {/* §6.1 hero — flat --bg, no photo, everything in the first fold */}
      <section className="container-site pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="max-w-[800px]">
          <MonoLabel bold as="p">
            {home.hero.eyebrow.text}
          </MonoLabel>
          <h1 className="type-display-xl mt-4 text-ink">
            {withAccent(home.hero.headline.text ?? "", home.hero.headline.accentPhrase)}
          </h1>
          {home.hero.subline.pending && (
            <div className="mt-5 max-w-md">
              <Pending id={home.hero.subline.pending} note={home.hero.subline.note} />
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href="#intake">{home.hero.ctaPrimary.text}</Button>
            <Button variant="secondary" href="#cases">
              {home.hero.ctaSecondary.text}
            </Button>
          </div>
          <ProofStrip stats={home.proofStrip.stats} />
        </div>
      </section>

      {/* §6.2 the receipts */}
      <section id="cases" className="container-site scroll-mt-20 py-16 md:py-24">
        <Reveal>
          <MonoLabel bold as="p">
            {home.cases.sectionEyebrow.text}
          </MonoLabel>
          <h2 className="type-display-m mt-2 text-ink">{home.cases.sectionTitle.text}</h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-5">
          {home.cases.cards.map((card, i) => (
            <Reveal key={card.slug} delay={i * 60}>
              <CaseCard card={card} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* §6.3 method teaser */}
      <section className="container-site py-4 md:py-8">
        <Reveal>
          <MethodTeaser content={home.methodTeaser} />
        </Reveal>
      </section>

      {/* §6.4 contact + the Intake (§10 shell — flow goes live in Phase 3) */}
      <section id="intake" className="container-site scroll-mt-20 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-start gap-4">
            {globalContent.footer.email.pending && (
              <Pending
                id={globalContent.footer.email.pending}
                note={globalContent.footer.email.note}
              />
            )}
            {globalContent.footer.calendarUrl.pending && (
              <Pending
                id={globalContent.footer.calendarUrl.pending}
                note={globalContent.footer.calendarUrl.note}
              />
            )}
          </div>
          <div className="mt-6">
            <IntakeCard content={intake} />
          </div>
        </Reveal>
      </section>
    </main>
  );
}

/** Wraps the single accent phrase of the headline in coral (§6.1). */
function withAccent(text: string, phrase?: string): ReactNode {
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-accent-deep">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}
