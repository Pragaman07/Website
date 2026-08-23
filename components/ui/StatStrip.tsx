import { MonoLabel } from "@/components/ui/MonoLabel";
import { getFact } from "@/lib/content";

/** Small stat cards from facts — e.g. the §7.1 social proof strip. */
export function StatStrip({ factIds }: { factIds: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {factIds.map((id) => {
        const fact = getFact(id);
        const value =
          fact.before && fact.after
            ? `${fact.before} → ${fact.after}`
            : (fact.value ?? fact.change ?? "—");
        return (
          <div key={id} className="rounded-card border border-line bg-surface p-5">
            <MonoLabel bold className="block">
              {fact.label}
            </MonoLabel>
            <p className="type-mono-stat mt-2 text-ink">{value}</p>
            {fact.change && fact.before && (
              <p className="type-mono-stat mt-1 font-bold text-ink">{fact.change}</p>
            )}
            {fact.note && <p className="type-body-s mt-2 text-muted">{fact.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
