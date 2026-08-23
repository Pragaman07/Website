import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";
import type { ChangelogEntry } from "@/lib/content";

/**
 * §9 Know Me dress — release-note card: purple version chip (mono, ink
 * text on tint per the contrast ruling), title, then Patched:/Added:/
 * Known bugs: lines. ±1° resting rotation. The v0.0.1 headstone (egg 6)
 * renders faded, inert, version + line only.
 */
export function ReleaseNoteEntry({
  entry,
  rotate,
}: {
  entry: ChangelogEntry;
  rotate: 1 | -1;
}) {
  const headstone = entry.headstone;

  return (
    <article
      className={cn(
        "rounded-card border border-line bg-surface p-6",
        rotate === 1 ? "rotate-1" : "-rotate-1",
        headstone
          ? "opacity-60"
          : "transition-transform duration-200 ease-out hover:rotate-0 motion-reduce:transition-none",
      )}
    >
      <span
        className="type-mono-stat inline-block rounded-chip px-2 py-0.5 font-bold text-ink"
        style={{ background: "color-mix(in srgb, var(--purple) 18%, transparent)" }}
      >
        {entry.version}
      </span>
      <h2 className={cn("mt-3 text-ink", headstone ? "type-body-l" : "type-display-s")}>
        {entry.title}
      </h2>

      {!headstone && (
        <div className="mt-4 flex flex-col gap-2">
          <NoteLine label="Patched:" items={entry.patched} />
          <NoteLine label="Added:" items={entry.added} />
          <NoteLine label="Known bugs:" items={entry.bugs} />
        </div>
      )}
    </article>
  );
}

function NoteLine({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <MonoLabel bold className="block">
        {label}
      </MonoLabel>
      <ul className="mt-1 flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item} className="type-body text-ink">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
