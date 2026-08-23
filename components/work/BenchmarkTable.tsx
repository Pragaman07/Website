import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";
import { getFact } from "@/lib/content";
import type { CopyString } from "@/lib/content";

/**
 * §7.1 benchmark block — 9 rows vs 2026 B2B standards. Verdict chips:
 * filled coral dot + OUTPERFORM, outline dot + ON PAR. The on-par row
 * (PRD's "yellow row") STAYS VISIBLE — one honest tie makes eight wins
 * believable. That is a locked decision, not an oversight.
 */
export function BenchmarkTable({
  factIds,
  caption,
}: {
  factIds: string[];
  caption: CopyString;
}) {
  const rows = factIds.map(getFact);

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-bg">
                <th scope="col" className="type-mono-label sticky left-0 bg-bg px-5 py-3 font-bold text-muted">
                  KPI
                </th>
                <th scope="col" className="type-mono-label px-5 py-3 text-right font-bold text-muted">
                  2026 B2B standard
                </th>
                <th scope="col" className="type-mono-label px-5 py-3 text-right font-bold text-muted">
                  Filing Buddy
                </th>
                <th scope="col" className="type-mono-label px-5 py-3 text-right font-bold text-muted">
                  Verdict
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((fact) => {
                const onPar = fact.verdict === "on-par";
                return (
                  <tr key={fact.id} className="border-t border-line transition-colors duration-150 hover:bg-bg">
                    <th scope="row" className="type-mono-label sticky left-0 bg-surface px-5 py-3.5 font-normal text-ink">
                      {fact.label}
                    </th>
                    <td className="type-mono-stat px-5 py-3.5 text-right font-normal text-muted">
                      {fact.standard}
                    </td>
                    <td className="type-mono-stat px-5 py-3.5 text-right text-ink">{fact.value}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center justify-end gap-2">
                        <span
                          aria-hidden
                          className={cn(
                            "inline-block h-2 w-2 rounded-pill",
                            onPar ? "border border-accent bg-transparent" : "bg-accent",
                          )}
                        />
                        <MonoLabel bold className="text-ink">
                          {onPar ? "ON PAR" : "OUTPERFORM"}
                        </MonoLabel>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 md:hidden"
          style={{ background: "linear-gradient(to left, var(--surface), transparent)" }}
        />
      </div>
      <figcaption className="border-t border-line px-5 py-3">
        <p className="type-body-s text-muted">{caption.text}</p>
      </figcaption>
    </figure>
  );
}
