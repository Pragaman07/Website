"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SaveSlotCard } from "@/components/know/SaveSlotCard";
import { DlcTooltip } from "@/components/eggs/DlcTooltip";
import { cn } from "@/lib/cn";
import type { MapCity, MapState } from "@/lib/india";
import type { SaveStatesContent } from "@/lib/content";

/**
 * §11.4 — the interactive India map. Home states solid coral (click/Enter
 * opens their save slot); grey states are undiscovered DLC (egg 5
 * tooltip). Keyboard: roving tabindex — arrows move between states,
 * Enter/Space activates. The dotted coral checkpoint path draws once on
 * reveal (1s; reduced motion renders it complete). Desktop: slot panel
 * beside the map. Mobile: horizontal snap rail beneath.
 */
export function SaveStatesClient({
  viewBox,
  states,
  cities,
  content,
}: {
  viewBox: string;
  states: MapState[];
  cities: MapCity[];
  content: SaveStatesContent;
}) {
  const [slot, setSlot] = useState(0);
  const [focusIdx, setFocusIdx] = useState(0);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);
  const [drawn, setDrawn] = useState(false);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const railRefs = useRef<Array<HTMLLIElement | null>>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  // Draw the checkpoint path once the map scrolls into view.
  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const activate = useCallback(
    (index: number, point?: { x: number; y: number }) => {
      const state = states[index];
      if (state.slot !== undefined) {
        setSlot(state.slot);
        setTooltip(null);
        // Mobile rail: bring the chosen save slot into view.
        railRefs.current[state.slot]?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          inline: "center",
          block: "nearest",
        });
      } else {
        const at =
          point ??
          (() => {
            const rect = pathRefs.current[index]?.getBoundingClientRect();
            return rect
              ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
              : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
          })();
        setTooltip({ x: at.x, y: at.y, name: state.name });
      }
    },
    [states, reduced],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const move = (delta: number) => {
      e.preventDefault();
      const next = (focusIdx + delta + states.length) % states.length;
      setFocusIdx(next);
      pathRefs.current[next]?.focus();
    };
    if (e.key === "ArrowRight" || e.key === "ArrowDown") move(1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") move(-1);
    else if (e.key === "Home") move(-focusIdx);
    else if (e.key === "End") move(states.length - 1 - focusIdx);
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate(focusIdx);
    }
  };

  const points = cities.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-[55%_1fr] md:items-start">
        <figure>
          <svg
            ref={svgRef}
            viewBox={viewBox}
            role="group"
            aria-label={content.subline.text}
            onKeyDown={onKeyDown}
            className="h-auto w-full"
          >
            {states.map((state, i) => {
              const home = state.slot !== undefined;
              const checkpoint = home ? content.checkpoints[state.slot!] : null;
              return (
                <path
                  key={state.id}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={state.path}
                  role="button"
                  tabIndex={i === focusIdx ? 0 : -1}
                  aria-label={
                    checkpoint
                      ? `SAVE SLOT ${checkpoint.slot} — ${checkpoint.city}, ${state.name}`
                      : state.name
                  }
                  onClick={(e) => {
                    setFocusIdx(i);
                    activate(i, { x: e.clientX, y: e.clientY });
                  }}
                  onFocus={() => setFocusIdx(i)}
                  className={cn(
                    "cursor-pointer transition-[fill] duration-150 focus:outline-none",
                    home
                      ? "fill-accent hover:fill-accent-deep focus-visible:fill-accent-deep"
                      : "fill-line hover:fill-muted/40 focus-visible:fill-muted/40",
                  )}
                  stroke={home ? "var(--accent-deep)" : "var(--bg)"}
                  strokeWidth={home ? 1.2 : 0.8}
                />
              );
            })}

            {/* the checkpoint path — dotted coral, drawn on reveal */}
            <g aria-hidden>
              <mask id="journey-mask">
                <polyline
                  points={points}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="6"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={drawn ? 0 : 1}
                  style={{
                    transition: reduced ? "none" : "stroke-dashoffset 1s var(--ease-out)",
                  }}
                />
              </mask>
              <polyline
                points={points}
                fill="none"
                stroke="var(--accent-deep)"
                strokeWidth="1.75"
                strokeDasharray="3 5"
                mask="url(#journey-mask)"
              />
              {cities.map((city) => (
                <circle
                  key={city.slot}
                  cx={city.x}
                  cy={city.y}
                  r={slot === city.slot ? 6 : 4}
                  fill="var(--accent-deep)"
                  stroke="var(--bg)"
                  strokeWidth="1.5"
                  style={{ transition: "r 150ms ease" }}
                />
              ))}
            </g>
          </svg>
          <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <MonoLabel>{content.mapCredit.text}</MonoLabel>
          </figcaption>
        </figure>

        {/* Desktop: the save-slot panel; the chosen card slides in */}
        <div aria-live="polite" className="hidden md:block">
          <motion.div
            key={slot}
            initial={reduced ? { opacity: 0 } : { x: 24, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
            transition={{ duration: reduced ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <SaveSlotCard checkpoint={content.checkpoints[slot]} />
          </motion.div>
        </div>
      </div>

      {/* Mobile: horizontal snap rail of all four slots */}
      <ul className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
        {content.checkpoints.map((checkpoint, i) => (
          <li
            key={checkpoint.slot}
            ref={(el) => {
              railRefs.current[i] = el;
            }}
            className="w-[82%] max-w-xs shrink-0 snap-center"
          >
            <SaveSlotCard checkpoint={checkpoint} />
          </li>
        ))}
      </ul>

      {tooltip && (
        <DlcTooltip
          x={tooltip.x}
          y={tooltip.y}
          stateName={tooltip.name}
          text={content.dlcTooltip.text ?? ""}
          onDismiss={() => setTooltip(null)}
        />
      )}
    </div>
  );
}
