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
