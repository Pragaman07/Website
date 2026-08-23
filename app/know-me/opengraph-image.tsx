import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "know me — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "KNOW ME", stat: "LEVEL SELECT", sub: "Same person, fewer buzzwords." });
}
