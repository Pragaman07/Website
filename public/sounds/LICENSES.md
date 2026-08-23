# Sound licenses (Design Spec §4 · CLAUDE.md asset log)

Budget: 5 files, < 100KB total, normalized. **Current total: ~70KB** (22050Hz mono WAV). Every file is a deterministic in-repo synthesis (CC0, self-generated) — **all placeholders pending Pragaman's audition**; replace any file, keep its name, zero code changes.

| File | Trigger | Generator | Size |
|---|---|---|---|
| `flip.wav` | Mode toggle | `scripts/generate-flip-sound.mjs` — felt "fwip", 180ms | 7.8 KB |
| `sparkle.wav` | Egg first discovery | `scripts/generate-egg-sounds.mjs` — two-note chime, 400ms | 17.3 KB |
| `send.wav` | Intake submit | `scripts/generate-intake-sound.mjs` — paper slide + thunk, 500ms | 21.6 KB |
| `sip.wav` | Coffee counter | `scripts/generate-sip-sound.mjs` — two slurp pulses, 250ms | 10.8 KB |
| `glitch.wav` | Egg 1 fake crash | `scripts/generate-egg-sounds.mjs` — chopped stutter, 300ms | 13.0 KB |

If replacing with sourced files: Mixkit (Mixkit License) or Freesound (CC0 only), normalized ≈ −14 LUFS, log source + license here.
