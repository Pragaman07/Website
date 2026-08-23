/**
 * Generates the two egg sounds (Design Spec §4), deterministic CC0
 * placeholders for Pragaman to audition:
 *   sparkle.wav — two-note chime (~400ms) for egg-found first discovery
 *   glitch.wav  — tiny digital stutter (~300ms) for identity_crisis.exe
 *
 * Run: node scripts/generate-egg-sounds.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SR = 22050;

function writeWav(name, samples) {
  let peak = 0;
  for (const v of samples) peak = Math.max(peak, Math.abs(v));
  const gain = 0.5 / (peak || 1);
  const pcm = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    pcm.writeInt16LE(Math.round(samples[i] * gain * 32767), i * 2);
  }
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
  writeFileSync(`public/sounds/${name}`, Buffer.concat([h, pcm]));
  console.log(`${name} written — ${((44 + pcm.length) / 1024).toFixed(1)} KB`);
}

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* sparkle: E6 then A6, soft sine with a touch of octave shimmer. */
{
  const N = Math.round(SR * 0.4);
  const s = new Float64Array(N);
  const notes = [
    { f: 1318.5, at: 0.0, dur: 0.22 },
    { f: 1760.0, at: 0.14, dur: 0.26 },
  ];
  for (const { f, at, dur } of notes) {
    const start = Math.round(SR * at);
    const len = Math.round(SR * dur);
    for (let i = 0; i < len && start + i < N; i++) {
      const t = i / SR;
      const env = Math.min(1, t / 0.008) * Math.exp(-9 * (i / len));
      s[start + i] +=
        (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 2 * t)) *
        env *
        0.5;
    }
  }
  mkdirSync("public/sounds", { recursive: true });
  writeWav("sparkle.wav", s);
}

/* glitch: chopped noise bursts with dropouts — a tiny digital stutter. */
{
  const N = Math.round(SR * 0.3);
  const s = new Float64Array(N);
  const rand = rng(1337);
  const CHOP = Math.round(SR * 0.024);
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const chopIndex = Math.floor(i / CHOP);
    const on = chopIndex % 3 !== 1 && chopIndex !== 7; // stuttered dropouts
    const alpha = 0.35;
    lp += alpha * (rand() * 2 - 1 - lp);
    // crush to 4-bit steps for the digital edge
    const crushed = Math.round(lp * 8) / 8;
    const fade = 1 - i / N;
    s[i] = on ? crushed * fade * 0.8 : 0;
  }
  writeWav("glitch.wav", s);
}
