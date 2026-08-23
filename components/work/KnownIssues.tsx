import { MonoLabel } from "@/components/ui/MonoLabel";
import type { MethodContent } from "@/lib/content";

/**
 * §8.4 (D-4) — honest edges as a changelog-voiced card inside Work mode
 * (no Caveat): severity-dot · issue · status rows. Self-aware, not
 * self-flagellating.
 */
export function KnownIssues({ content }: { content: MethodContent["knownIssues"] }) {
  return (
    <div className="rounded-card border border-line bg-surface p-6 md:p-8">
      <MonoLabel bold className="block">
        {content.header.text}
      </MonoLabel>
      <ul className="mt-4 flex flex-col">
        {content.rows.map((row) => (
          <li
            key={row.issue}
            className="flex flex-wrap items-baseline gap-3 border-t border-line py-3 first:border-t-0"
          >
            <span aria-hidden className="inline-block h-2 w-2 shrink-0 self-center rounded-pill bg-accent-deep" />
            <span className="type-body min-w-0 flex-1 text-ink">{row.issue}</span>
            <MonoLabel bold>{row.status}</MonoLabel>
          </li>
        ))}
      </ul>
    </div>
  );
}
