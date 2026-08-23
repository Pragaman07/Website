import type { ReactNode } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { BedrockDiagram } from "@/components/work/BedrockDiagram";
import { KnownIssues } from "@/components/work/KnownIssues";
import { getFact } from "@/lib/content";
import methodJson from "@/content/work/method.json";
import type { MethodContent } from "@/lib/content";

const method = methodJson as MethodContent;
const methodName = getFact(method.hero.title.factId).value ?? "";

export const metadata = { title: `${methodName} — pragaman` };

/** How I Work — The Bedrock Method (Design Spec §8). The page IS the diagram. */
export default function MethodPage() {
  const rule = getFact(method.rule.factId);
  const example = getFact(method.rule.exampleFactId);
  const range = getFact(method.range.factId);
  const tools = getFact(method.tools.factId);

  return (
    <main className="container-site py-12 md:py-16">
      {/* §8.1 hero */}
      <MonoLabel bold as="p">
        {method.hero.eyebrow.text}
      </MonoLabel>
      <h1 className="type-display-l mt-3 text-ink">{methodName}</h1>
      <p className="type-body-l mt-3 max-w-[52ch] text-muted">{method.hero.line.text}</p>

      {/* §8.2 the diagram — extra top room for the payoff glyph */}
      <section className="mt-24 md:mt-28">
        <BedrockDiagram diagram={method.diagram} />
        {method.diagram.textAlternative.pending && (
          <div className="mt-4 max-w-md">
            <Pending
              id={method.diagram.textAlternative.pending}
              note={method.diagram.textAlternative.note}
            />
          </div>
        )}
      </section>

      {/* §8.3 the 3–4× rule */}
      <Reveal className="mt-16 md:mt-24">
        <section className="rounded-card border border-line bg-surface p-6 md:p-10">
          <blockquote className="type-display-m max-w-[28ch] text-ink">
            {accentPhrase(rule.value ?? "", "3–4 times")}
          </blockquote>
          <div className="mt-8 rounded-card border border-line bg-bg p-5">
            <MonoLabel bold accent className="block">
              {method.rule.exampleLabel.text}
            </MonoLabel>
            <p className="type-body mt-2 text-ink">{example.value}</p>
            <p className="type-body-s mt-1 text-muted">{method.rule.exampleNext.text}</p>
          </div>
        </section>
      </Reveal>

      {/* §8.4 known issues */}
      <Reveal className="mt-8">
        <KnownIssues content={method.knownIssues} />
      </Reveal>

      {/* §8.1·5 range + tools */}
      <Reveal className="mt-16 md:mt-24">
        <section>
          <MonoLabel bold as="p">
            {method.range.eyebrow.text}
          </MonoLabel>
          <ul className="mt-4 flex max-w-[720px] flex-wrap gap-2">
            {(range.value ?? "").split(" · ").map((item) => (
              <li
                key={item}
                className="type-body-s rounded-pill border border-line bg-surface px-3 py-1.5 text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex max-w-md flex-col gap-3">
            {method.range.prose.pending && (
              <Pending id={method.range.prose.pending} note={method.range.prose.note} />
            )}
            {tools.pending && <Pending id={tools.pending} note={tools.note} />}
          </div>
        </section>
      </Reveal>
    </main>
  );
}

/** Coral on the load-bearing phrase — "3–4 times" (§8.3). */
function accentPhrase(text: string, phrase: string): ReactNode {
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
