import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { storyComponents } from "@/components/work/mdx-components";
import { loadStory, storyHasProse } from "@/lib/mdx";
import { SHOW_PENDING } from "@/lib/flags";
import metaJson from "@/content/work/case-studies/sapiens/meta.json";
import type { CaseMeta } from "@/lib/content";

const meta = metaJson as CaseMeta;

export const metadata = { title: `${meta.title} — pragaman` };

/** Case Study 3 — Sapiens (Design Spec §7.3): the solo build; his own
 *  W24–28 lines are the page's texture (verbatim pull quotes). */
export default function SapiensPage() {
  const { content } = loadStory("sapiens");
  const showStory = SHOW_PENDING || storyHasProse(content);
  return (
    <CaseStudyLayout meta={meta}>
      {showStory ? <MDXRemote source={content} components={storyComponents} /> : null}
    </CaseStudyLayout>
  );
}
