import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * §13 OG template — ink background, the route's stat/label in Space Mono,
 * coral accent, wordmark bottom-left. One template, per-route content
 * (facts and locked labels only — no invented prose).
 */

export const OG_SIZE = { width: 1200, height: 630 };

const spaceMono = readFileSync(
  path.join(process.cwd(), "assets", "fonts", "SpaceMono-Bold.ttf"),
);

export function ogImage({
  eyebrow,
  stat,
  sub,
}: {
  eyebrow: string;
  stat: string;
  sub?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#16181D",
          fontFamily: "Space Mono",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: "#FF6B5E",
              fontSize: 28,
              letterSpacing: "0.14em",
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              color: "#FAFAF7",
              fontSize: stat.length > 24 ? 64 : 84,
              lineHeight: 1.1,
            }}
          >
            {stat}
          </div>
          {sub ? (
            <div style={{ color: "#6B7280", fontSize: 30 }}>{sub}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#FAFAF7", fontSize: 40 }}>pragaman</div>
          <div style={{ color: "#FF6B5E", fontSize: 40 }}>.</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Space Mono", data: spaceMono, weight: 700, style: "normal" }],
    },
  );
}
