import Link from "next/link";
import { MonoLabel } from "@/components/ui/MonoLabel";
import hubJson from "@/content/know/hub.json";
import type { KnowHubContent } from "@/lib/content";

const hub = hubJson as KnowHubContent;

/**
 * §11.0 section-page template footer: `← PREV LEVEL · NEXT LEVEL →` as
 * mini level tiles, cycling and skipping locked sections.
 */
export function LevelFooterNav({
  current,
  lockedSlugs,
}: {
  current: string;
  lockedSlugs: Set<string>;
}) {
  const open = hub.levels.filter((l) => !lockedSlugs.has(l.slug));
  const i = open.findIndex((l) => l.slug === current);
  if (i === -1 || open.length < 2) return null;
  const prev = open[(i - 1 + open.length) % open.length];
  const next = open[(i + 1) % open.length];

  return (
    <footer className="mt-20 border-t border-line pt-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "← PREV LEVEL", level: prev },
          { label: "NEXT LEVEL →", level: next },
        ].map(({ label, level }) => (
          <Link
            key={label}
            href={`/know-me/${level.slug}`}
            className="group rounded-card border border-line bg-surface p-5 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none"
          >
            <MonoLabel bold className="block">
              {label}
            </MonoLabel>
            <span className="type-display-s mt-2 block text-ink">
              <span aria-hidden className="mr-2">
                {level.glyph}
              </span>
              {level.title}
            </span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
