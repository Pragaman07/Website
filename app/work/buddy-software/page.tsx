import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { storyComponents } from "@/components/work/mdx-components";
import { loadStory } from "@/lib/mdx";
import metaJson from "@/content/work/case-studies/buddy-software/meta.json";
import type { CaseMeta } from "@/lib/content";

const meta = metaJson as CaseMeta;

export const metadata = { title: `${meta.title} — pragaman` };

/** Case Study 2 — Buddy Software (Design Spec §7.2): leads with the
 *  Indore anchor scene because its hard numbers are still pending. */
export default function BuddySoftwarePage() {
  const { content } = loadStory("buddy-software");
  return (
    <CaseStudyLayout meta={meta}>
      <MDXRemote source={content} components={storyComponents} />
    </CaseStudyLayout>
  );
}
