/**
 * Generates public/sounds/flip.wav — a soft felt "fwip" (~180ms) per
 * Design Spec §4: filtered noise with a downward sweep and fast decay.
 * Deterministic placeholder, CC0 (self-generated); Pragaman auditions and
 * may replace with a sourced file — same filename, zero code changes.
 *
 * Run: node scripts/generate-flip-sound.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SAMPLE_RATE = 22050;
const DURATION_S = 0.18;
const N = Math.round(SAMPLE_RATE * DURATION_S);

// Deterministic pseudo-noise (mulberry32) so the asset is reproducible.
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(2208);
const samples = new Float64Array(N);

// One-pole low-pass whose cutoff sweeps 3.2kHz → 350Hz: air → felt.
let lp = 0;
for (let i = 0; i < N; i++) {
  const t = i / N;
  const cutoff = 3200 * Math.pow(350 / 3200, t);
  const alpha = 1 - Math.exp((-2 * Math.PI * cutoff) / SAMPLE_RATE);
  const noise = rand() * 2 - 1;
  lp += alpha * (noise - lp);
  // Envelope: 8ms attack, smooth exponential release.
  const attack = Math.min(1, (i / SAMPLE_RATE) / 0.008);
  const release = Math.exp(-4.2 * t);
  samples[i] = lp * attack * release;
}

// Normalize to a gentle peak (-6 dBFS) — volume lives in the player (0.35).
let peak = 0;
for (const s of samples) peak = Math.max(peak, Math.abs(s));
const gain = 0.5 / peak;

const pcm = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) {
  pcm.writeInt16LE(Math.round(samples[i] * gain * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);

mkdirSync("public/sounds", { recursive: true });
writeFileSync("public/sounds/flip.wav", Buffer.concat([header, pcm]));
console.log(`flip.wav written — ${((44 + pcm.length) / 1024).toFixed(1)} KB`);
