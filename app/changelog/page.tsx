import { ChangelogClient } from "@/components/changelog/ChangelogClient";
import { loadChangelog } from "@/lib/changelog";
import metaJson from "@/content/changelog/_meta.json";
import type { ChangelogMeta } from "@/lib/content";

export const metadata = { title: "changelog — pragaman" };

/** §9 — shared route; dress follows the current mode and re-dresses in
 *  place on flip (D-2). Version scheme per D-3: v{age}.{month}. */
export default function ChangelogPage() {
  return <ChangelogClient entries={loadChangelog()} meta={metaJson as ChangelogMeta} />;
}
