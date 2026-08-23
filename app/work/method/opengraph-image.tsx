import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "The Bedrock Method — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "THE METHOD", stat: "The Bedrock Method", sub: "Questions until bedrock." });
}
