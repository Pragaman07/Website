import { MonoLabel } from "@/components/ui/MonoLabel";
import { getFact } from "@/lib/content";

/**
 * §7.0 layer-2 pull-stat — floats right (240px) on xl, sits inline between
 * paragraphs below xl. Always fact-sourced, always source-labeled.
 */
export function PullStat({ id }: { id: string }) {
  const fact = getFact(id);
  const value =
    fact.before && fact.after
      ? `${fact.before} → ${fact.after}`
      : (fact.value ?? fact.change ?? "—");

  return (
    <aside className="my-6 rounded-card border border-line bg-surface p-5 xl:float-right xl:my-1 xl:ml-8 xl:w-60 xl:-mr-24">
      <MonoLabel bold className="block">
        {fact.label ?? fact.id}
      </MonoLabel>
      <p className="type-mono-stat mt-2 text-ink">{value}</p>
      {fact.change && fact.before && (
        <p className="type-mono-stat mt-1 text-accent-deep">{fact.change}</p>
      )}
      <MonoLabel className="mt-3 block">SOURCE: {fact.source}</MonoLabel>
    </aside>
  );
}
