import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ChangelogEntry, ChangelogTag } from "@/lib/content";

/**
 * Loads all changelog entries (content/changelog/*.mdx), newest first;
 * the v0.0.1 headstone (egg 6) is always pinned last. Server-only.
 */
export function loadChangelog(): ChangelogEntry[] {
  const dir = path.join(process.cwd(), "content", "changelog");
  const entries = readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file): ChangelogEntry => {
      const { data } = matter(readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? ""),
        date: String(data.date ?? ""),
        tags: (data.tags ?? []) as ChangelogTag[],
        version: String(data.version ?? ""),
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        patched: (data.patched ?? []) as string[],
        added: (data.added ?? []) as string[],
        bugs: (data.bugs ?? []) as string[],
        headstone: Boolean(data.headstone),
        draft: Boolean(data.draft),
      };
    });

  return entries.sort((a, b) => {
    if (a.headstone !== b.headstone) return a.headstone ? 1 : -1;
    return b.date.localeCompare(a.date);
  });
}
