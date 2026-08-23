import indiaMap from "@svg-maps/india";

/**
 * India map data (§11.4). Source: @svg-maps/india (CC BY 4.0 — credited
 * on the Save States page + README). Depiction ruled by Pragaman
 * (DECISIONS.md): the whole of Jammu & Kashmir renders as part of India —
 * this map's single undivided J&K path does exactly that.
 *
 * City coordinates are in the map's viewBox space, calibrated against
 * measured state bounding boxes (see scripts history — Samastipur north-
 * central Bihar, Ranchi central Jharkhand, Bhubaneswar eastern Odisha,
 * Pune western Maharashtra).
 */

type SvgMap = {
  viewBox: string;
  locations: Array<{ id: string; name: string; path: string }>;
};

const map = indiaMap as unknown as SvgMap;

/** Home states (facts: the journey) → checkpoint slot index. */
const HOME_STATE_SLOT: Record<string, number> = {
  Bihar: 0,
  Jharkhand: 1,
  Odisha: 2,
  Maharashtra: 3,
};

export type MapState = {
  id: string;
  name: string;
  path: string;
  /** Present on the four home states: index into the checkpoint list. */
  slot?: number;
};

export type MapCity = { slot: number; x: number; y: number };

export const INDIA = {
  viewBox: map.viewBox,
  states: map.locations.map(
    (l): MapState => ({
      id: l.id,
      name: l.name,
      path: l.path,
      ...(HOME_STATE_SLOT[l.name] !== undefined
        ? { slot: HOME_STATE_SLOT[l.name] }
        : {}),
    }),
  ),
  cities: [
    { slot: 0, x: 374, y: 265 }, // Samastipur
    { slot: 1, x: 358, y: 333 }, // Ranchi
    { slot: 2, x: 368, y: 400 }, // Bhubaneswar
    { slot: 3, x: 145, y: 433 }, // Pune
  ] as MapCity[],
};
