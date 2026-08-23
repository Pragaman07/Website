import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "pragaman";

export default function Image() {
  return ogImage({ eyebrow: "WORK · KNOW ME", stat: "Same person. Two very different tabs open." });
}
