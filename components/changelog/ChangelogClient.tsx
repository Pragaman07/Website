"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMode } from "@/lib/mode";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { EditorialEntry } from "@/components/changelog/EditorialEntry";
import { ReleaseNoteEntry } from "@/components/changelog/ReleaseNoteEntry";
import { TagFilter } from "@/components/changelog/TagFilter";
import type { ChangelogEntry, ChangelogMeta } from "@/lib/content";

/**
 * §9 + D-2 — one collection, two dresses, re-dressed IN PLACE when the
 * toggle flips (this page is the transition's showroom). Work: editorial
 * list, work+both, ALL·WORK chips. Know Me: release-note cards, life+both,
 * with the v0.0.1 headstone fixed last (egg 6). Dress crossfades ~400ms;
 * entries carry layout animation for the re-filter.
 */
export function ChangelogClient({
  entries,
  meta,
}: {
  entries: ChangelogEntry[];
  meta: ChangelogMeta;
}) {
  const { mode } = useMode();
  const reduced = useReducedMotion();
  const [workFilter, setWorkFilter] = useState<"all" | "work">("all");

  const visible =
    mode === "work"
      ? entries.filter((e) =>
          workFilter === "work"
            ? e.tags.includes("work")
            : e.tags.includes("work") || e.tags.includes("both"),
        )
      : entries.filter((e) => e.tags.includes("life") || e.tags.includes("both"));

  return (
    <main className="container-site py-12 md:py-16">
      <MonoLabel bold as="p">
        {meta.eyebrow.text}
      </MonoLabel>
      <h1 className="type-display-l mt-2 text-ink">{meta.title.text}</h1>

      {mode === "work" && (
        <div className="mt-6">
          <TagFilter value={workFilter} onChange={setWorkFilter} />
        </div>
      )}

      {/* keyed by mode: the dress crossfades in place on flip */}
      <motion.div
        key={mode}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: "easeOut" }}
        className="mt-10"
      >
        {visible.length === 0 ? (
          <MonoLabel className="block">— NOTHING HERE YET —</MonoLabel>
        ) : mode === "work" ? (
          <div className="max-w-[720px]">
            {visible.map((entry) => (
              <motion.div key={entry.slug} layout={!reduced}>
                <EditorialEntry entry={entry} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex max-w-[720px] flex-col gap-6">
            {visible.map((entry, i) => (
              <motion.div key={entry.slug} layout={!reduced}>
                <ReleaseNoteEntry entry={entry} rotate={i % 2 === 0 ? 1 : -1} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}
