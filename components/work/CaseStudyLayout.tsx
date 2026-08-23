import type { ReactNode } from "react";
import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { StatStrip } from "@/components/ui/StatStrip";
import { ResultsStrip } from "@/components/work/ResultsStrip";
import { DataTable } from "@/components/work/DataTable";
import { BenchmarkTable } from "@/components/work/BenchmarkTable";
import { InversionViz } from "@/components/work/InversionViz";
import { WorkflowBeforeAfter } from "@/components/work/WorkflowBeforeAfter";
import { LinkOutCard } from "@/components/work/LinkOutCard";
import { PullQuote } from "@/components/work/PullQuote";
import { ReceiptCard } from "@/components/work/ReceiptCard";
import { getFact } from "@/lib/content";
import sharedJson from "@/content/work/case-study.json";
import homeJson from "@/content/work/home.json";
import type { CaseMeta, CaseStudySharedContent, WorkHomeContent } from "@/lib/content";

const shared = sharedJson as CaseStudySharedContent;
const homeCards = (homeJson as WorkHomeContent).cases.cards;

/**
 * §7.0 — the shared case-study template: one page, two reading speeds.
 * Layer 1 (30-second read): breadcrumb → tags → title + framing → problem
 * card → the moves → dark results strip → divider. Layer 2: the study's
 * signature blocks + full-story prose (children) + tables/receipts per
 * study → prev/next + intake link.
 */
export function CaseStudyLayout({
  meta,
  children,
}: {
  meta: CaseMeta;
  children: ReactNode;
}) {
  const framing = meta.framing.factId
    ? getFact(meta.framing.factId).value
    : meta.framing.text;

  return (
    <main className="container-site py-12 md:py-16">
      {/* ---- Layer 1: the 30-second read ---- */}
      <Link
        href="/work"
        className="type-body-s font-medium text-muted transition-colors duration-200 hover:text-accent-deep"
      >
        {shared.breadcrumb.text}
      </Link>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
        {meta.tags.map((tag, i) => (
          <MonoLabel key={tag} bold>
            {i > 0 && <span aria-hidden className="mr-3 text-line">·</span>}
            {tag}
          </MonoLabel>
        ))}
      </div>

      <h1 className="type-display-l mt-4 max-w-[800px] text-ink">{meta.title}</h1>
      {framing && <p className="type-body-l mt-3 max-w-[60ch] text-muted">{framing}</p>}

      {meta.problem && (
        <Reveal className="mt-10">
          <div className="max-w-[720px] rounded-card border border-line border-l-[3px] border-l-accent bg-surface p-6">
            {meta.problem.text ? (
              <p className="type-body-l text-ink">{meta.problem.text}</p>
            ) : meta.problem.pending ? (
              <Pending id={meta.problem.pending} note={meta.problem.note} />
            ) : null}
          </div>
        </Reveal>
      )}

      {meta.anchorScene && (
        <Reveal className="mt-10">
          <div className="max-w-[68ch]">
            {meta.anchorScene.text ? (
              <p className="type-body-l text-ink first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold first-letter:[font-family:var(--font-display)]">
                {meta.anchorScene.text}
              </p>
            ) : meta.anchorScene.pending ? (
              <Pending id={meta.anchorScene.pending} note={meta.anchorScene.note} />
            ) : null}
          </div>
        </Reveal>
      )}

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {meta.moves.map((move, i) => (
          <Reveal key={move.n} delay={i * 60}>
            <div className="h-full rounded-card border border-line bg-surface p-6">
              <MonoLabel bold>{move.n}</MonoLabel>
              <p className="type-display-s mt-2 text-ink">{move.name}</p>
              {move.line.text ? (
                <p className="type-body mt-2 text-muted">{move.line.text}</p>
              ) : move.line.factId ? (
                <p className="type-body mt-2 text-muted">{getFact(move.line.factId).value}</p>
              ) : move.line.pending ? (
                <div className="mt-3">
                  <Pending id={move.line.pending} note={move.line.note} />
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <ResultsStrip results={meta.resultsStrip} slug={meta.slug} />
        {meta.resultsStrip.pending && (
          <div className="mt-3">
            <Pending
              id={meta.resultsStrip.pending}
              note="Interim strip — harder numbers replace it when they land."
            />
          </div>
        )}
      </Reveal>

      {/* ---- divider ---- */}
      <div className="mt-16 flex items-center gap-5" aria-hidden>
        <span className="h-px flex-1 bg-line" />
        <MonoLabel bold>{shared.divider.text}</MonoLabel>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* ---- Layer 2: the full story ---- */}
      {meta.inversionViz && (
        <Reveal className="mt-12">
          <InversionViz
            paidFactId={meta.inversionViz.beforeFactId}
            organicFactId={meta.inversionViz.afterFactId}
          />
        </Reveal>
      )}

      {meta.beforeAfter && (
        <Reveal className="mt-12">
          <WorkflowBeforeAfter content={meta.beforeAfter} />
        </Reveal>
      )}

      <article className="prose-col mt-12">{children}</article>

      {meta.pullQuotes && (
        <div className="prose-col">
          {meta.pullQuotes.quotes.map((quote) => (
            <PullQuote key={quote.sourceRef + quote.text.slice(0, 16)} sourceRef={quote.sourceRef}>
              {quote.text}
            </PullQuote>
          ))}
        </div>
      )}

      {meta.tables && (
        <div className="mt-14 flex flex-col gap-8">
          {Object.entries(meta.tables).map(([key, table]) => (
            <Reveal key={key}>
              <DataTable title={table.title} factIds={table.factIds} footnote={table.footnote} />
            </Reveal>
          ))}
        </div>
      )}

      {meta.benchmark && (
        <Reveal className="mt-8">
          <BenchmarkTable factIds={meta.benchmark.factIds} caption={meta.benchmark.caption} />
        </Reveal>
      )}

      {meta.receipt && (
        <Reveal className="mt-8">
          <ReceiptCard receipt={meta.receipt} downloadLabel={shared.downloadLabel} />
        </Reveal>
      )}

      {meta.socialStrip && (
        <Reveal className="mt-8">
          <StatStrip factIds={meta.socialStrip.factIds} />
        </Reveal>
      )}

      {meta.linkOut && (
        <Reveal className="mt-8">
          <LinkOutCard linkOut={meta.linkOut} />
        </Reveal>
      )}

      {/* ---- study footer: prev/next + intake ---- */}
      <FooterNav slug={meta.slug} />
    </main>
  );
}

function FooterNav({ slug }: { slug: string }) {
  const i = homeCards.findIndex((c) => c.slug === slug);
  const prev = homeCards[(i - 1 + homeCards.length) % homeCards.length];
  const next = homeCards[(i + 1) % homeCards.length];

  return (
    <footer className="mt-20 border-t border-line pt-10">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: shared.prevLabel.text, card: prev },
          { label: shared.nextLabel.text, card: next },
        ].map(({ label, card }) => (
          <Link
            key={card.slug}
            href={`/work/${card.slug}`}
            className="group rounded-card border border-line bg-surface p-5 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none"
          >
            <MonoLabel bold className="block">
              {label}
            </MonoLabel>
            <span className="type-display-s mt-2 block text-ink">{card.title}</span>
            <span className="type-mono-stat mt-1 block text-muted">
              {card.heroStat.render}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/work#intake"
          className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-deep"
        >
          {shared.intakeCta.text}
        </Link>
      </p>
    </footer>
  );
}
