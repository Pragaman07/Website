import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "pragaman — work";

export default function Image() {
  return ogImage({ eyebrow: "THE WORK", stat: "ORGANIC CLICKS ×7.5", sub: "AVG POSITION 45 → 13.6 · ORGANIC SHARE 39% → 75%" });
}
