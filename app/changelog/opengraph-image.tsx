import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "changelog — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "CHANGELOG", stat: "v22.8", sub: "The Changelog" });
}
