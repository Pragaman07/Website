import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { storyComponents } from "@/components/work/mdx-components";
import { loadStory } from "@/lib/mdx";
import metaJson from "@/content/work/case-studies/filing-buddy/meta.json";
import type { CaseMeta } from "@/lib/content";

const meta = metaJson as CaseMeta;

export const metadata = { title: `${meta.title} — pragaman` };

/** Case Study 1 — Filing Buddy (Design Spec §7.1). */
export default function FilingBuddyPage() {
  const { content } = loadStory("filing-buddy");
  return (
    <CaseStudyLayout meta={meta}>
      <MDXRemote source={content} components={storyComponents} />
    </CaseStudyLayout>
  );
}
