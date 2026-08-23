"use client";

import { useEffect, useState } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { getFact } from "@/lib/content";

type Mode = "work" | "know";

const swatchTokens = [
  "--bg",
  "--surface",
  "--ink",
  "--muted",
  "--line",
  "--accent",
  "--accent-deep",
] as const;

const stickerTokens = ["--teal", "--purple", "--sun"] as const;

const typeScale = [
  { cls: "type-display-xl", label: "display-xl · Bricolage 800" },
  { cls: "type-display-l", label: "display-l · Bricolage 800" },
  { cls: "type-display-m", label: "display-m · Bricolage 700" },
  { cls: "type-display-s", label: "display-s · Bricolage 700" },
  { cls: "type-body-l", label: "body-l · Satoshi 400 · 18px" },
  { cls: "type-body", label: "body · Satoshi 400 · 16px" },
  { cls: "type-body-s", label: "body-s · Satoshi 400 · 14px" },
  { cls: "type-mono-stat-xl", label: "mono-stat-xl · Space Mono 700" },
  { cls: "type-mono-stat", label: "mono-stat · Space Mono 700" },
  { cls: "type-mono-label", label: "mono-label · Space Mono · 11px caps" },
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <MonoLabel as="h2" bold className="mb-4 block">
        {title}
      </MonoLabel>
      {children}
    </section>
  );
}

export function TokensClient() {
  const [mode, setMode] = useState<Mode>("work");

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    return () => {
      document.documentElement.dataset.mode = "work";
    };
  }, [mode]);

  const clicks = getFact("fb.gsc.clicks");
  const position = getFact("fb.gsc.position");
  const share = getFact("fb.ga4.organic-share");

  return (
    <main className="container-site pb-24 pt-10">
      <MonoLabel bold accent>
        PHASE 0 · TOKEN TEST PAGE (DEV ONLY)
      </MonoLabel>
      <h1 className="type-display-l mt-2">
        Tokens, both temperatures<span className="text-accent">.</span>
      </h1>

      {/* Mode flip — dev stand-in; the real toggle + temperature transition is Phase 1 */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMode(mode === "work" ? "know" : "work")}
          aria-pressed={mode === "know"}
          className="rounded-pill border border-line bg-surface px-5 py-2 font-medium transition-colors duration-200 hover:border-accent"
        >
          Flip mode
        </button>
        <MonoLabel bold>{mode === "work" ? "WORK" : "KNOW ME"}</MonoLabel>
      </div>

      <Section title="01 · COLOR TOKENS">
        <div className="flex flex-wrap gap-3">
          {swatchTokens.map((token) => (
            <div key={token} className="w-28">
              <div
                className="h-16 rounded-chip border border-line"
                style={{ background: `var(${token})` }}
              />
              <MonoLabel className="mt-1 block">{token}</MonoLabel>
            </div>
          ))}
        </div>
        <p className="type-body-s mt-4 text-muted">
          Sticker set — defined ONLY in Know Me scope. In Work mode these render
          empty: that is the enforcement working, not a bug.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {stickerTokens.map((token) => (
            <div key={token} className="w-28">
              <div
                className="h-16 rounded-chip border border-line"
                style={{ background: `var(${token})` }}
              />
              <MonoLabel className="mt-1 block">{token}</MonoLabel>
            </div>
          ))}
        </div>
      </Section>

      <Section title="02 · TYPE SCALE">
        <div className="flex flex-col gap-5">
          {typeScale.map((t) => (
            <div key={t.cls}>
              <MonoLabel className="mb-1 block">{t.label}</MonoLabel>
              <div className={t.cls}>The quick brown fox — 45 → 13.6</div>
            </div>
          ))}
          <div>
            <MonoLabel className="mb-1 block">
              doodle · Caveat · KNOW ME ONLY
            </MonoLabel>
            {mode === "know" ? (
              <div className="type-doodle text-accent">
                the quick brown fox, but handwritten
              </div>
            ) : (
              <p className="type-body-s text-muted">
                Hidden in Work mode — Caveat never renders here (rule 4).
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section title="03 · ELEVATION + RADIUS">
        <div className="flex flex-wrap gap-4">
          <Card className="w-44 p-4">
            <MonoLabel>border only</MonoLabel>
          </Card>
          <Card className="w-44 p-4 shadow-s">
            <MonoLabel>--shadow-s</MonoLabel>
          </Card>
          <Card className="w-44 p-4 shadow-m">
            <MonoLabel>--shadow-m</MonoLabel>
          </Card>
          <Card hover className="w-44 p-4 shadow-m">
            <MonoLabel>hover lift</MonoLabel>
          </Card>
        </div>
      </Section>

      <Section title="04 · PRIMITIVES">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Pitch me a problem</Button>
            <Button variant="secondary">See the receipts →</Button>
          </div>

          <Card className="max-w-md p-6 shadow-s">
            <MonoLabel bold className="block">
              PROOF STRIP · COUNT-UP · SPACE MONO
            </MonoLabel>
            <div className="type-mono-stat mt-3 flex flex-wrap gap-x-2 text-ink">
              <span>
                {clicks.label}{" "}
                <span className="text-accent-deep">
                  ×<CountUp id="dev.clicks" value={7.5} decimals={1} />
                </span>
              </span>
              <span className="text-muted">·</span>
              <span>
                {position.label} {position.before} →{" "}
                <CountUp id="dev.position" value={13.6} decimals={1} />
              </span>
              <span className="text-muted">·</span>
              <span>
                {share.label} {share.display?.before} →{" "}
                <CountUp id="dev.share" value={75} suffix="%" />
              </span>
            </div>
            <MonoLabel className="mt-2 block">
              SOURCE: {clicks.source}
            </MonoLabel>
          </Card>

          <div className="max-w-md">
            <Pending
              id="W21"
              note="The department-conflict story — renders wherever content is missing; hidden in prod."
            />
          </div>
        </div>
      </Section>

      <Section title="05 · REVEAL (SCROLL, STAGGERED)">
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 60, 120].map((delay) => (
            <Reveal key={delay} delay={delay}>
              <Card className="p-5 shadow-s">
                <MonoLabel bold>+{delay}MS</MonoLabel>
                <p className="type-body-s mt-1 text-muted">
                  Fade-up 12px, 400ms, once. Reduced motion: rendered visible.
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
