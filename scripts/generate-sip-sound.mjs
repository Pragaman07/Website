/**
 * Generates public/sounds/sip.wav — a short coffee sip (~250ms) per
 * Design Spec §4: two soft filtered-noise pulses, like a quick slurp.
 * Deterministic CC0 placeholder; Pragaman auditions and may replace.
 *
 * Run: node scripts/generate-sip-sound.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 22050;
const N = Math.round(SR * 0.25);

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(1907);
const s = new Float64Array(N);

// Two slurp pulses: band-ish noise (low-pass swept up) with round envelopes.
let lp = 0;
for (let i = 0; i < N; i++) {
  const t = i / N;
  // pulse envelope: two humps at ~30% and ~70% of the clip
  const hump = (c, w) => Math.exp(-((t - c) * (t - c)) / (2 * w * w));
  const env = 0.9 * hump(0.3, 0.09) + 0.7 * hump(0.7, 0.08);
  const cutoff = 900 + 1400 * env; // opens with each pulse
  const alpha = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
  lp += alpha * (rand() * 2 - 1 - lp);
  s[i] = lp * env;
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
writeFileSync("public/sounds/sip.wav", Buffer.concat([h, pcm]));
console.log(`sip.wav written — ${((44 + pcm.length) / 1024).toFixed(1)} KB`);
