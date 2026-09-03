"use client";

import { useMode } from "@/lib/mode";
import { MuteButton } from "@/components/shell/MuteButton";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import type { GlobalContent } from "@/lib/content";

/**
 * §2.3 — both modes: email · calendar · socials · mute repeat · sign-off.
 * Know Me adds a Caveat scribble; Work stays clean. Contact links render
 * Pending until the Content Doc supplies them.
 */
export function Footer({ content }: { content: GlobalContent }) {
  const { mode } = useMode();
  const { footer } = content;

  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-site flex flex-col gap-6 py-10">
        <div className="flex flex-wrap items-center gap-4">
          {footer.email.pending && (
            <Pending id={footer.email.pending} note={footer.email.note} />
          )}
          {footer.calendarUrl.pending && (
            <Pending id={footer.calendarUrl.pending} note={footer.calendarUrl.note} />
          )}
          {footer.socials.pending && (
            <Pending id={footer.socials.pending} note={footer.socials.note} />
          )}
          <span className="ml-auto flex items-center gap-1">
            <MuteButton content={content.mute} />
            <ThemeToggle content={content.theme} />
          </span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="type-body-s text-muted">{footer.signoff.text}</p>
          {mode === "know" &&
            (footer.knowScribble.text ? (
              <span className="flex items-center gap-2" aria-hidden>
                <img
                  src="/images/memoji-face.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span
                  data-garnish
                  style={{ "--garnish-rotate": "-2deg" } as React.CSSProperties}
                  className="type-doodle font-bold text-accent-deep"
                >
                  {footer.knowScribble.text}
                </span>
              </span>
            ) : footer.knowScribble.pending ? (
              <Pending id={footer.knowScribble.pending} note={footer.knowScribble.note} />
            ) : null)}
        </div>

        <MonoLabel className="block">
          © {new Date().getFullYear()} · PRAGAMAN
        </MonoLabel>
      </div>
    </footer>
  );
}
