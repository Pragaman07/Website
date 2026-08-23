import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Filing Buddy — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "CASE STUDY · GROWTH", stat: "×7.5 CLICKS", sub: "Filing Buddy · SOURCE: GSC + GA4, AUDITED" });
}
