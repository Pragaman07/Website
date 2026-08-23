/**
 * Generates public/sounds/send.wav — "paper slide + soft thunk" (~500ms)
 * per Design Spec §4: a filtered-noise slide sweeping down, then a low
 * soft thunk. Deterministic CC0 placeholder; Pragaman auditions and may
 * replace the file (same name, zero code changes).
 *
 * Run: node scripts/generate-intake-sound.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 22050;
const N = Math.round(SR * 0.5);

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(4811);
const s = new Float64Array(N);

// The slide: 0–340ms, noise through a falling low-pass (2.4kHz → 500Hz).
let lp = 0;
const slideN = Math.round(SR * 0.34);
for (let i = 0; i < slideN; i++) {
  const t = i / slideN;
  const cutoff = 2400 * Math.pow(500 / 2400, t);
  const alpha = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
  lp += alpha * (rand() * 2 - 1 - lp);
  const attack = Math.min(1, (i / SR) / 0.012);
  const release = 1 - 0.65 * t;
  s[i] += lp * attack * release * 0.7;
}

// The thunk: from 330ms, a 105Hz sine with a fast exponential decay.
const thunkStart = Math.round(SR * 0.33);
for (let i = thunkStart; i < N; i++) {
  const t = (i - thunkStart) / SR;
  s[i] += Math.sin(2 * Math.PI * 105 * t) * Math.exp(-22 * t) * 0.9;
}

let peak = 0;
for (const v of s) peak = Math.max(peak, Math.abs(v));
const gain = 0.5 / peak;

const pcm = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) pcm.writeInt16LE(Math.round(s[i] * gain * 32767), i * 2);

const h = Buffer.alloc(44);
h.write("RIFF", 0);
h.writeUInt32LE(36 + pcm.length, 4);
h.write("WAVE", 8);
h.write("fmt ", 12);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 2, 28);
h.writeUInt16LE(2, 32);
h.writeUInt16LE(16, 34);
h.write("data", 36);
h.writeUInt32LE(pcm.length, 40);

mkdirSync("public/sounds", { recursive: true });
writeFileSync("public/sounds/send.wav", Buffer.concat([h, pcm]));
console.log(`send.wav written — ${((44 + pcm.length) / 1024).toFixed(1)} KB`);
