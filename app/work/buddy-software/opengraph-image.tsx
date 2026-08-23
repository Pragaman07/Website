import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Buddy Software — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "CASE STUDY · 0→1 BUILD", stat: "7 DEPTS → 1 PLATFORM", sub: "Buddy Software" });
}
