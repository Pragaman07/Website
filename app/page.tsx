"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { useMode, type Mode } from "@/lib/mode";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Memoji } from "@/components/ui/Memoji";
import { cn } from "@/lib/cn";
import door from "@/content/door.json";

/**
 * §3.1 — The Door. Full viewport, 50/50 split (stacked on mobile).
 * Hover eases the hovered half to 56% (600ms); entering expands the chosen
 * door to fill the viewport (500ms), sets the mode, then the home fades up.
 * First visit only — the boot script redirects returning visitors.
 * No sound here (locked trigger list). The Know Me half carries the
 * full-body memoji (memoji map, DECISIONS.md 3 Sep); the Work half stays
 * receipts-only.
 */
export default function DoorPage() {
  const { setMode } = useMode();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<Mode | null>(null);
  const [entering, setEntering] = useState<Mode | null>(null);

  const enter = (choice: Mode) => {
    if (entering) return;
    setMode(choice);
    const go = () => {
      document.documentElement.classList.add("page-fade");
      router.push(choice === "work" ? "/work" : "/know-me");
      window.setTimeout(
        () => document.documentElement.classList.remove("page-fade"),
        300,
      );
    };
    if (reduced) {
      go();
    } else {
      setEntering(choice);
      window.setTimeout(go, 500);
    }
  };

  const basis = (half: Mode): string => {
    if (entering) return entering === half ? "100%" : "0%";
    if (hovered) return hovered === half ? "56%" : "44%";
    return "50%";
  };

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden md:flex-row">
      {/* Work door — page-level (work) token scope */}
      <DoorHalf
        mode="work"
        basis={basis("work")}
        collapsed={entering === "know"}
        onEnter={() => enter("work")}
        onHover={(on) => setHovered(on ? "work" : null)}
        eyebrow={door.work.eyebrow.text}
        title={door.work.title.text}
        line={door.work.line}
        underline
      />

      {/* Framing line on the center seam */}
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center p-6">
        <p
          className={cn(
            "type-display-m max-w-md rounded-card border border-line bg-surface px-8 py-5 text-center text-ink shadow-m transition-opacity duration-300",
            entering && "opacity-0",
          )}
        >
          {door.framing.text}
        </p>
      </div>

      {/* Know Me door — subtree carries know tokens legitimately */}
      <DoorHalf
        mode="know"
        basis={basis("know")}
        collapsed={entering === "work"}
        onEnter={() => enter("know")}
        onHover={(on) => setHovered(on ? "know" : null)}
        eyebrow={door.know.eyebrow.text}
        title={door.know.title.text}
        line={door.know.line}
        figure={
          <Memoji
            name="full"
            sizes="(min-width: 768px) 208px, 140px"
            className="mt-10 w-[140px] md:mt-0 md:w-52"
          />
        }
        confetti
      />
    </main>
  );
}

/* Static sticker-dot confetti (§3.1): 6 dots, know palette, decorative. */
const CONFETTI: Array<{ top: string; left: string; size: number; token: string }> = [
  { top: "14%", left: "18%", size: 10, token: "var(--teal)" },
  { top: "26%", left: "72%", size: 8, token: "var(--sun)" },
  { top: "44%", left: "38%", size: 7, token: "var(--purple)" },
  { top: "62%", left: "80%", size: 10, token: "var(--teal)" },
  { top: "74%", left: "24%", size: 8, token: "var(--purple)" },
  { top: "86%", left: "60%", size: 9, token: "var(--sun)" },
];

function DoorHalf({
  mode,
  basis,
  collapsed,
  onEnter,
  onHover,
  eyebrow,
  title,
  line,
  underline,
  confetti,
  figure,
}: {
  mode: Mode;
  basis: string;
  collapsed: boolean;
  onEnter: () => void;
  onHover: (on: boolean) => void;
  eyebrow?: string;
  title?: string;
  line: { pending?: string; text?: string; note?: string };
  underline?: boolean;
  confetti?: boolean;
  /** Decorative figure above the eyebrow (the Know half's memoji). */
  figure?: ReactNode;
}) {
  return (
    <div
      data-mode={mode}
      className="relative overflow-hidden bg-bg transition-[flex-basis] duration-[600ms] ease-out"
      style={{ flexBasis: basis, flexGrow: 0, flexShrink: 1 }}
    >
      {confetti && (
        <span aria-hidden>
          {CONFETTI.map((dot, i) => (
            <span
              key={i}
              className="absolute rounded-pill"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: dot.token,
              }}
            />
          ))}
        </span>
      )}
      <button
        type="button"
        onClick={onEnter}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        className={cn(
          "door-cursor flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center",
          collapsed && "opacity-0",
        )}
      >
        {figure}
        <MonoLabel bold>{eyebrow}</MonoLabel>
        <span className="type-display-l text-ink">
          {title}
          {underline && <span className="mx-auto mt-2 block h-1 w-16 rounded-pill bg-accent" />}
        </span>
        {line.text ? (
          <span className="type-body text-muted">{line.text}</span>
        ) : line.pending ? (
          <Pending id={line.pending} note={line.note} />
        ) : null}
      </button>
    </div>
  );
}
