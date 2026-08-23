import { MonoLabel } from "@/components/ui/MonoLabel";
import type { ChangelogEntry } from "@/lib/content";

/** §9 Work dress — clean editorial row: mono date · title · one-line
 *  excerpt · thin divider. Zero stickers. */
export function EditorialEntry({ entry }: { entry: ChangelogEntry }) {
  return (
    <article className="border-b border-line py-6 first:pt-0">
      <MonoLabel className="block">
        {formatDate(entry.date)}
      </MonoLabel>
      <h2 className="type-display-s mt-2 text-ink">{entry.title}</h2>
      {entry.excerpt && <p className="type-body mt-1 text-muted">{entry.excerpt}</p>}
    </article>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}
