import { MonoLabel } from "@/components/ui/MonoLabel";
import { getFact } from "@/lib/content";
import type { CopyString } from "@/lib/content";

/**
 * §7.0 data-table styling: surface card, header row mono-label on --bg,
 * numbers right-aligned Space Mono tabular, change column bold, row hover
 * tint. Mobile: horizontal scroll, sticky first column, right-edge fade.
 * Scoping notes on facts render as footnote lines.
 */
export function DataTable({
  title,
  factIds,
  footnote,
}: {
  title: CopyString;
  factIds: string[];
  footnote?: CopyString;
}) {
  const rows = factIds.map(getFact);
  const sources = [...new Set(rows.map((f) => f.source))];

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-surface">
      <figcaption className="border-b border-line px-5 py-4">
        <span className="type-display-s text-ink">{title.text}</span>
      </figcaption>
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-bg">
                {["Metric", "Before", "After", "Change"].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={
                      "type-mono-label px-5 py-3 font-bold text-muted " +
                      (i === 0 ? "sticky left-0 bg-bg" : "text-right")
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((fact) => (
                <tr key={fact.id} className="border-t border-line transition-colors duration-150 hover:bg-bg">
                  <th
                    scope="row"
                    className="type-mono-label sticky left-0 bg-surface px-5 py-3.5 font-normal text-ink"
                  >
                    {fact.label}
                  </th>
                  <td className="type-mono-stat px-5 py-3.5 text-right font-normal text-muted">
                    {fact.before ?? "—"}
                  </td>
                  <td className="type-mono-stat px-5 py-3.5 text-right text-ink">
                    {fact.after ?? fact.value ?? "—"}
                  </td>
                  <td className="type-mono-stat px-5 py-3.5 text-right font-bold text-ink">
                    {fact.change ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* right-edge fade cue for the horizontal scroll (mobile) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 md:hidden"
          style={{ background: "linear-gradient(to left, var(--surface), transparent)" }}
        />
      </div>
      <div className="border-t border-line px-5 py-3">
        <MonoLabel className="block">SOURCE: {sources.join(" · ")}</MonoLabel>
        {footnote?.text && (
          <p className="type-body-s mt-1 text-muted">{footnote.text}</p>
        )}
      </div>
    </figure>
  );
}
