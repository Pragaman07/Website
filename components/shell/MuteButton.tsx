"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSoundSettings } from "@/lib/sound";
import type { GlobalContent } from "@/lib/content";

/** §4 — visible mute, header + footer. State persists; default unmuted. */
export function MuteButton({ content }: { content: GlobalContent["mute"] }) {
  const { muted, setMuted } = useSoundSettings();
  const label = (muted ? content.unmuteLabel.text : content.muteLabel.text) ?? "Toggle sound";

  return (
    <button
      type="button"
      onClick={() => setMuted(!muted)}
      aria-pressed={muted}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-btn text-muted transition-colors duration-200 hover:text-ink"
    >
      {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
    </button>
  );
}
