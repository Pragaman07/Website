import type { MetadataRoute } from "next";
import { lockedKnowSlugs } from "@/lib/know";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Locked Know Me sections 404 (thin-section rule) — they stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const locked = lockedKnowSlugs();
  const knowSections = ["graveyard", "numbers", "save-states", "rent-free", "faq"]
    .filter((slug) => !locked.has(slug))
    .map((slug) => `/know-me/${slug}`);

  return [
    "/",
    "/work",
    "/work/filing-buddy",
    "/work/buddy-software",
    "/work/sapiens",
    "/work/method",
    "/know-me",
    ...knowSections,
    "/changelog",
  ].map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" || route === "/work" ? 1 : 0.7,
  }));
}
