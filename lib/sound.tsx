"use client";

/**
 * Sound system (CLAUDE.md + Design Spec §4).
 * Thin wrapper over use-sound. Mute lives in localStorage("pragaman-muted"),
 * default UNMUTED (locked). Files load only after the first user interaction
 * (autoplay-policy friendly). Sound fires ONLY on: toggle flip, egg first
 * discovery, Intake submit, chai sip. Never on scroll, hover, nav, or load.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import useSound from "use-sound";

export const MUTE_STORAGE_KEY = "pragaman-muted";

/** §4 table — file + volume per sound. Ids are the spec's. */
export const SFX = {
  "toggle-flip": { src: "/sounds/flip.wav", volume: 0.35 },
  "egg-found": { src: "/sounds/sparkle.wav", volume: 0.3 },
  "intake-submit": { src: "/sounds/send.wav", volume: 0.4 },
  "chai-sip": { src: "/sounds/sip.wav", volume: 0.4 },
  glitch: { src: "/sounds/glitch.wav", volume: 0.3 },
} as const;

export type SfxId = keyof typeof SFX;

type SoundContextValue = {
  muted: boolean;
  setMuted: (muted: boolean) => void;
  /** True after the first pointer/key interaction — files may load now. */
  armed: boolean;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    try {
      setMutedState(localStorage.getItem(MUTE_STORAGE_KEY) === "true");
    } catch {
      /* default unmuted */
    }
    const arm = () => setArmed(true);
    window.addEventListener("pointerdown", arm, { once: true, passive: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  const setMuted = useCallback((next: boolean) => {
    setMutedState(next);
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(next));
    } catch {
      /* session-only mute is fine */
    }
  }, []);

  return (
    <SoundContext.Provider value={{ muted, setMuted, armed }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundSettings(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSoundSettings must be used inside <SoundProvider>");
  return ctx;
}

/**
 * Play hook for one spec'd sound. Respects mute; loads nothing until the
 * first user interaction; a missing file fails silently (howler onloaderror)
 * so the site never breaks on an absent asset.
 */
export function useSfx(id: SfxId): () => void {
  const { muted, armed } = useSoundSettings();
  const { src, volume } = SFX[id];
  const [play] = useSound(armed ? src : "", {
    volume,
    soundEnabled: !muted && armed,
    interrupt: true,
  });
  return useCallback(() => {
    if (!muted && armed) play();
  }, [play, muted, armed]);
}
