# Pragaman.com — Design Foundations v1 (LOCKED)
*Decided 19 Aug 2026 · This document wins any argument until superseded by v2.*

---

## 1. Typography — the four voices

| Role | Font | Weights | Source | Where |
|---|---|---|---|---|
| **Display / headings** | Bricolage Grotesque | 700, 800 | Google Fonts | Both modes. Hero lines, section titles, anything that needs to hit. |
| **Body / interface** | Satoshi | 400, 500, 700 | Fontshare (ITF, free) | Both modes. Everything readable at length. |
| **Numbers / data / labels** | Space Mono | 400, 700 | Google Fonts | Both modes. Every stat, version tag, metric, timestamp, eyebrow label. No exceptions — numbers always wear this. |
| **Doodle / margins** | Caveat | 500, 700 | Google Fonts | **Know Me mode only.** Photo annotations, margin notes, sticker captions. Never appears in Work mode. |

**Font loading (for build spec):**
```
https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Space+Mono:wght@400;700&family=Caveat:wght@500;700&display=swap
```
*(Build note: self-host via `next/font` at build time for performance; links above are the source references.)*

**Open item:** Black Ops One as a one-off costume for The Graveyard's title (military-crate stencil joke). Decision deferred to design spec. It is banned everywhere else.

---

## 2. Color — Direction 1: The Coral Thread

One brand, two temperatures. Coral is the thread that runs through both.

### Work mode — crisp warm-white
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#FAFAF7` | Page background (warm white, not clinical white) |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--ink` | `#16181D` | Headings, body text |
| `--muted` | `#6B7280` | Secondary text, captions |
| `--line` | `#ECEAE4` | Borders, dividers |
| `--coral` | `#FF6B5E` | THE accent. Buttons, links, highlights, key phrases in headings |
| `--coral-deep` | `#E85546` | Hover states, small-text-safe coral |

### Know Me mode — cream + the sticker set
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#FFF4E4` | Page background (cream) |
| `--card` | `#FFFDF9` | Cards, changelog entries |
| `--ink` | `#16181D` | Same ink — same person |
| `--coral` | `#FF6B5E` | Lead accent, doodle voice color |
| `--teal` | `#2EC4B6` | Sticker accent |
| `--purple` | `#7C5CFF` | Sticker accent (version tags) |
| `--sun` | `#FFC94D` | Sticker accent |

### Hard rules
1. **Work mode has exactly one accent: coral.** If teal, purple, or sun appears in Work mode, it is a bug.
2. **Know Me unlocks the full sticker set**, coral leads.
3. **Coral never sets body-size paragraphs.** Ink does the reading; coral does the pointing. For small UI text on coral surfaces, verify contrast during build (use `--coral-deep` or ink text).
4. **The mode toggle = a temperature shift**, warm-white → cream, accent set expanding. Same world, different weather. The transition should be felt (animated), not instant.
5. Navy/gold palette from the original profile doc is **retired**.

---

## 3. Sound (locked earlier, recorded here)
- On by default, subtle, Comeau-calibrated. Visible mute toggle in the header/footer of both modes.
- Library: `use-sound` (Josh Comeau's React hook).
- Sound moments: mode toggle flip, easter egg discoveries, pitch-box submit. Short, quiet, never on scroll.

---

## 4. Reference set
- **North star (tone blend):** joshwcomeau.com — clean + warm + delightful details
- **Work mode restraint:** brittanychiang.com, lannino.com
- **Know Me spirit:** lynnandtonic.com, cassie.codes
- **Approved visual:** Direction 1 specimen screenshot (user-confirmed, 19 Aug 2026)

---

## 5. Status board
| Piece | State |
|---|---|
| Site structure (both modes, all sections) | ✅ Locked |
| Pitch box concept ("The Intake") | ✅ Locked |
| Blog ("The Changelog", dual-mode) | ✅ Locked |
| Design foundations (type + color + sound) | ✅ Locked — this doc |
| Questionnaire answers | 🔴 **Critical path — waiting on Pragaman** |
| Site PRD | ⏳ Blocked on questionnaire Section 1 + S1–S9 |
| Design spec (layouts, motion, easter eggs) | ⏳ Blocked on S1, S2, S5 |
| Content doc (every word on the site) | ⏳ Blocked on questionnaire |
| Build spec / CLAUDE.md | ⏳ Last, after all above |
