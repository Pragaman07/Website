import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Loads a case-study full story (content/work/case-studies/<slug>/story.mdx).
 * Server-only — MDX is rendered with next-mdx-remote/rsc in the page.
 */
export function loadStory(slug: string): {
  content: string;
  data: Record<string, unknown>;
} {
  const file = path.join(
    process.cwd(),
    "content",
    "work",
    "case-studies",
    slug,
    "story.mdx",
  );
  const { content, data } = matter(readFileSync(file, "utf8"));
  return { content, data };
}

/**
 * True when the story MDX contains actual prose — not just section headings,
 * <Pending/> markers, and MDX comments. All-pending stories render as bare
 * floating <h2>s in production (Pending is hidden there), so pages skip the
 * story block entirely until real words exist.
 */
export function storyHasProse(content: string): boolean {
  return (
    content
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/<Pending[\s\S]*?\/>/g, "")
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .length > 0
  );
}
