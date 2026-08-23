import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sapiens — pragaman";

export default function Image() {
  return ogImage({ eyebrow: "CASE STUDY · SOLO BUILD", stat: "TEAM OF 1 → 2 APP STORES", sub: "Sapiens — the anti-social-network" });
}
