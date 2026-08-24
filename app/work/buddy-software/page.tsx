import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { storyComponents } from "@/components/work/mdx-components";
import { loadStory, storyHasProse } from "@/lib/mdx";
import { SHOW_PENDING } from "@/lib/flags";
import metaJson from "@/content/work/case-studies/buddy-software/meta.json";
import type { CaseMeta } from "@/lib/content";

const meta = metaJson as CaseMeta;

export const metadata = { title: `${meta.title} — pragaman` };

/** Case Study 2 — Buddy Software (Design Spec §7.2): leads with the
 *  Indore anchor scene because its hard numbers are still pending. */
export default function BuddySoftwarePage() {
  const { content } = loadStory("buddy-software");
  const showStory = SHOW_PENDING || storyHasProse(content);
  return (
    <CaseStudyLayout meta={meta}>
      {showStory ? <MDXRemote source={content} components={storyComponents} /> : null}
    </CaseStudyLayout>
  );
}
