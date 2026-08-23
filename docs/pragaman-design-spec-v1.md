# Pragaman.com — Design Spec v1.1
*23 Aug 2026 · Owner: Pragaman · Builds on: Design Foundations v1 (LOCKED) + PRD v0.2 · Feeds: Build Spec / CLAUDE.md*
*v1.1 amendment (Pragaman, 23 Aug): D-1 through D-7 approved; D-1 amended — Know Me is multi-page too. Know Me home = level-select hub (§11.0).*

**What this document is:** every layout, motion, component, and interaction on the site, specified to the level Claude Code can build from without inventing design decisions. All copy shown here is marked `[DRAFT]` — the Content Doc owns final words. Claude Code never invents copy; missing content renders as `[PENDING: ref]` placeholders (see §14).

---

## 0. Decisions made in this spec — Pragaman's veto window

I made judgment calls the foundations didn't cover. Each is used consistently below; veto any and I patch the spec.

| # | Decision | My call |
|---|---|---|
| D-1 | Site architecture | Multi-page BOTH modes (approved as amended). Work: each case study = own shareable URL. Know Me: home = level-select hub, each section = own page |
| D-2 | Toggle on mode-exclusive pages | Theme transition plays, then routes to the other mode's home. On `/changelog`, no navigation — the page re-dresses in place (the toggle's best demo) |
| D-3 | Changelog version scheme | `v{age}.{month}` — v22.8 = age 22, August. Birth = v0.0.1 |
| D-4 | Honest edges rendering | Styled as a "Known issues (actively patching)" block — changelog voice inside Work mode, without Caveat |
| D-5 | Intake visual | Step counter `01 / 05` in Space Mono for v1; the "mini-PRD assembles beside you as you type" preview deferred to v1.5 |
| D-6 | Bedrock diagram | Vertical geological cross-section, scroll-revealed, drill line in coral (full spec §8) |
| D-7 | Signature element budget | The temperature transition is THE signature. Everything else stays disciplined so the flip stays the star |

---

## 1. Global design tokens (implementation of Foundations v1)

### 1.1 Color — CSS custom properties, swapped per mode
```css
:root[data-mode="work"] {
  --bg: #FAFAF7;       --surface: #FFFFFF;   --ink: #16181D;
  --muted: #6B7280;    --line: #ECEAE4;
  --accent: #FF6B5E;   --accent-deep: #E85546;
  /* sticker set intentionally UNDEFINED in work mode — using it is a bug */
}
:root[data-mode="know"] {
  --bg: #FFF4E4;       --surface: #FFFDF9;   --ink: #16181D;
  --muted: #6B7280;    --line: #F0E4D0;
  --accent: #FF6B5E;   --accent-deep: #E85546;
  --teal: #2EC4B6;     --purple: #7C5CFF;    --sun: #FFC94D;
}
```
- `--line` in Know Me warms to `#F0E4D0` (cream-tinted divider; `#ECEAE4` looks dirty on cream).
- **Hard rule enforced in code:** components must reference `--accent`, never raw hex. Sticker tokens exist only in `know` scope, so accidental Work-mode use fails visibly.

### 1.2 Typography scale
| Token | Font/weight | Size (clamp) | Use |
|---|---|---|---|
| `display-xl` | Bricolage 800 | clamp(40px, 7vw, 72px), lh 1.02, ls -0.02em | Hero lines only |
| `display-l` | Bricolage 800 | clamp(30px, 5vw, 48px), lh 1.05 | Page titles |
| `display-m` | Bricolage 700 | clamp(24px, 3.5vw, 32px), lh 1.1 | Section titles |
| `display-s` | Bricolage 700 | 20–24px, lh 1.2 | Card titles |
| `body-l` | Satoshi 400 | 18px, lh 1.65 | Case-study prose (max 68ch) |
| `body` | Satoshi 400 | 16px, lh 1.6 | Default UI text |
| `body-s` | Satoshi 400/500 | 14px, lh 1.5 | Captions, secondary |
| `mono-stat-xl` | Space Mono 700 | clamp(26px, 4vw, 40px) | Big stats |
| `mono-stat` | Space Mono 700 | 16–20px | Inline stats, counters |
| `mono-label` | Space Mono 400/700 | 11px, ls 0.14em, UPPERCASE | Eyebrows, tags, version numbers, table headers |
| `doodle-l` / `doodle` | Caveat 700/500 | 26–32px / 20–24px | Know Me only. Never below 18px |

- Bricolage loaded as variable font (opsz + wght axes) via `next/font`; Satoshi via `next/font/local` (download from Fontshare at build); Space Mono + Caveat via `next/font/google`. Zero layout shift budget.
- Coral in type: key phrases in headings, links, buttons. **Never body-size paragraphs.** Small coral text (< 18px) always uses `--accent-deep`.

### 1.3 Space, radius, elevation
- Spacing scale: 4px base — 4/8/12/16/24/32/48/64/96/128. Section vertical padding: 96px desktop / 64px mobile.
- Content grid: max-width 1080px, 24px side padding. Prose column: 68ch.
- Radius: cards 18px · buttons/inputs 10px · pills/tags 999px · tiny chips 6px.
- Shadows (warm-tinted, never grey): `--shadow-s: 0 2px 8px rgba(22,24,29,.06)` · `--shadow-m: 0 2px 14px rgba(22,24,29,.09)` · `--shadow-hover: 0 6px 24px rgba(22,24,29,.12)`.
- Borders: 1px `--line` on all cards; shadow alone is never the only edge.

### 1.4 Breakpoints
`sm 640 · md 768 · lg 1024 · xl 1280`. Design mobile-first; the two-door landing and Save States map have dedicated mobile layouts (specified in their sections).

---

## 2. Routes & navigation

### 2.1 Route map
| Route | What |
|---|---|
| `/` | The Door (first visit) · returning visitors auto-redirect to stored mode |
| `/work` | Work home: hero → case-study cards → method teaser → Intake → footer |
| `/work/filing-buddy` · `/work/buddy-software` · `/work/sapiens` | Case studies |
| `/work/method` | How I Work — The Bedrock Method |
| `/know-me` | Know Me home: playful hero + level-select hub (§11.0) |
| `/know-me/graveyard` · `/know-me/numbers` · `/know-me/save-states` · `/know-me/rent-free` · `/know-me/faq` | Know Me section pages |
| `/changelog` | Shared route; dress + tag filter follow current mode (work+both / life+both) |
| 404 | Graveyard plot (egg 3) |

- Mode persisted in `localStorage("pragaman-mode")` + reflected as `data-mode` on `<html>`. Deep links (`/work`, `/know-me`) set the mode — a founder sent to `/work` never sees the door.
- `/` with stored mode = instant redirect, no door flash.

### 2.2 Header (persistent, both modes)
- Sticky, 64px, `--bg` at 92% opacity + backdrop-blur, bottom border `--line` appears only after 24px scroll.
- Left: wordmark `pragaman` (Bricolage 700, lowercase; final form → Content Doc).
- Right: nav links (Satoshi 500, 14px) + **mode toggle** (§3) + **mute button** (§4).
  - Work nav: `Case studies · Method · Changelog · Contact`
  - Know Me nav: `Graveyard · Numbers · Save States · Rent-Free · FAQ · Changelog` (page links; active page underlined in coral)
- Mobile: wordmark + toggle + mute visible; nav collapses into a slide-down panel (hamburger, Satoshi, generous 48px tap targets).

### 2.3 Footer
- Both modes: email · calendar link · socials · mute toggle (repeat) · a one-line sign-off `[DRAFT: "Built with Claude Code, chai, and an unreasonable number of questions."]`
- Know Me footer adds Caveat scribble sign-off. Work footer stays clean.

---

## 3. The Door + the mode toggle + THE transition

### 3.1 The Door (`/`, first visit only)
- Full viewport, split 50/50 vertical seam (desktop) / stacked halves (mobile).
- Left = Work: `--bg #FAFAF7`, ink wordmark, coral underline accent. Right = Know Me: cream `#FFF4E4` with tiny sticker-dot confetti (static, 6–8 dots, sticker colors).
- Center seam carries the framing line, `display-m`, on a floating white card: `[DRAFT: "Same person. Two very different tabs open."]`
- Each door: `mono-label` eyebrow (`FOR FOUNDERS & HIRING` / `FOR HUMANS`), door title in `display-l` (`[DRAFT: The Work / The Person]`), one-line description, and a full-half click target.
- Hover (desktop): hovered half eases to 56% width (600ms, standard ease), other compresses; cursor becomes a `→`. Mobile: tap = enter, no hover state.
- Entering: door expands to fill viewport (500ms), then content of chosen home fades up. Sets mode + localStorage. No sound (locked list only).

### 3.2 The toggle (persistent, all pages)
- Pill, 72×36px, in header. Track color = current `--bg` inverted subtly; knob = 30px circle containing **headshot photo in Work / memoji in Know Me** (permanent, locked).
- Flip: knob slides 180ms spring; face crossfades mid-slide (image swap at 50%); triggers §3.3 transition + `toggle-flip` sound.
- Labels: `mono-label` `WORK` / `KNOW ME` beside the pill on ≥md; icon-only below.
- Keyboard: focusable, Space/Enter flips, visible 2px `--accent` focus ring. `aria-pressed` + `aria-label="Switch to Know Me mode"`.
- Rapid-flip counter feeds egg 1 (§12.1).

### 3.3 The temperature transition — THE signature (D-7)
The whole site is one big thermometer. Flipping the toggle must feel like weather changing, not a stylesheet swapping.

**Sequence (total ~700ms, all via CSS-variable interpolation on `:root`):**
1. **0–150ms:** knob slides + sound plays. A soft radial warmth/coolness bloom originates from the toggle position (a fixed-position radial gradient overlay at 8% opacity, expanding to 1.5× viewport, then fading — the "temperature front").
2. **100–500ms:** `--bg`, `--surface`, `--line` interpolate (CSS `transition: background-color 400ms ease` on all consumers; colors are on `:root`, so everything shifts together).
3. **250–600ms:** mode-specific garnish: entering Know Me — sticker-colored accents, Caveat doodles, and card rotations fade/rotate in (opacity + 2° rotation, staggered 40ms). Entering Work — same elements fade out *first* in 200ms (they leave before the room cools; Work never shows a sticker even mid-transition).
4. **On mode-exclusive routes (D-2):** transition plays fully, then `router.push` to the other home with a 150ms crossfade. On `/changelog`: no navigation; entry cards morph dress in place (§9/§11.7).
- Reduced motion: instant variable swap, 150ms opacity crossfade, no bloom. Sound still plays (it's not motion) unless muted.

---

## 4. Sound spec (`use-sound`)

| ID | File | Trigger | Character | Volume |
|---|---|---|---|---|
| `toggle-flip` | `flip.mp3` | Mode toggle | Soft felt "fwip", ~180ms | 0.35 |
| `egg-found` | `sparkle.mp3` | First discovery of any easter egg | Two-note chime, ~400ms | 0.3 |
| `intake-submit` | `send.mp3` | Intake submitted | Paper slide + soft thunk, ~500ms | 0.4 |
| `chai-sip` | `sip.mp3` | Chai counter click (egg 4) | Short sip, ~250ms | 0.4 |
| `glitch` | `glitch.mp3` | Egg 1 fake crash | Tiny digital stutter, ~300ms | 0.3 |

- Sourcing: freesound.org / mixkit (license logged in build spec); normalized -14 LUFS; total sound budget < 100KB.
- **Mute:** icon button in header + footer. State in `localStorage("pragaman-muted")`. Never auto-plays — every sound is user-interaction-triggered (also satisfies browser autoplay policy). Default ON (locked).
- No sound on: scroll, hover, nav, page load. Ever.

---

## 5. Motion system

**Principles:** Comeau calibration — springy where playful, restrained where informative. One orchestrated moment per page beats ten scattered ones. Work mode motion = confidence (fades, rises). Know Me motion = play (rotation, spring overshoot).

| Token | Value | Use |
|---|---|---|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Entrances, reveals |
| `--spring` | spring(1, 80, 12) via lib / cubic-bezier(0.34, 1.56, 0.64, 1) | Toggle knob, stickers, playful hovers |
| `--dur-micro` | 150–200ms | Hovers, presses |
| `--dur-move` | 300–400ms | Cards, accordions, steps |
| `--dur-scene` | 500–700ms | Mode transition, door entry |

- **Scroll reveals:** content blocks fade-up 12px, 400ms `--ease-out`, once, stagger 60ms within a group. IntersectionObserver at 20% visibility. That's the *only* scroll-linked motion on the site — no parallax, no scroll-jacking.
- **Hover grammar:** cards lift 2px + `--shadow-hover`; buttons darken to `--accent-deep`; Know Me cards *also* straighten from their resting rotation to 0°.
- **Count-up:** big stats animate value 0→final over 800ms `--ease-out` on first reveal, `mono` tabular figures so width doesn't jitter. Once per session per stat.
- **`prefers-reduced-motion`:** all decorative motion off; reveals render visible; count-ups render final value; transition per §3.3. This is a launch-blocking requirement, not nice-to-have.

---

## 6. WORK MODE — Home (`/work`)

### 6.1 Hero
- Layout: left-aligned, single column, max-width 800px, vertical rhythm: eyebrow → headline → sub-line → CTA row → proof strip. First fold contains all of it on desktop.
- Eyebrow: `mono-label`, `[DRAFT: TECHNICAL MARKETING MANAGER · NOBORU WORLD · PUNE]`.
- Headline `display-xl`: hero line with ONE key phrase in coral. `[DRAFT: "I solve problems. I save time. I make brands famous."]` — coral on "famous" or the strongest phrase; Content Doc decides.
- Sub-line: `body-l`, `--muted`, max 52ch, `[PENDING: Content Doc]`.
- CTA row: primary button `[DRAFT: "Pitch me a problem"]` (coral, white text, 10px radius, hover → `--accent-deep` + 2px lift) anchors to Intake. Secondary: text link `[DRAFT: "See the receipts →"]` (`--accent-deep`, underline on hover) anchors to case cards.
- **Proof strip:** one row (wraps to 3 lines on mobile), `mono-stat`, separated by `·` in `--muted`:
  `ORGANIC CLICKS ×7.5 · AVG POSITION 45 → 13.6 · ORGANIC SHARE 39% → 75%`
  Count-up on load. Each stat links to the Filing Buddy case study. Audited-only rule applies forever.
- No photo in hero (headshot lives in the toggle); restraint per brittanychiang reference. Background: flat `--bg`, no gradients, no blobs.
- Egg 7 hooks the headline (§12.7).

### 6.2 Case-study cards (section: `[DRAFT: "The receipts"]`)
- Section title `display-m` + `mono-label` eyebrow `CASE STUDIES`.
- 3 cards, vertical stack (full-width rows, not a 3-col grid — each deserves the width). Card anatomy, left→right on desktop:
  - `mono-label` tag: `GROWTH` / `0→1 BUILD` / `SOLO BUILD`
  - Title `display-s` + one-line hook (`body`, muted)
  - **One hero stat** per card in `mono-stat-xl`: FB `×7.5 CLICKS` · Buddy `7 DEPTS → 1 PLATFORM` *(pending 6-vs-7 ruling)* · Sapiens `TEAM OF 1 → 2 APP STORES`
  - Arrow affordance `→` that slides 4px on hover.
- Whole card clickable; lift+shadow hover. Stack order: Filing Buddy, Buddy Software, Sapiens.

### 6.3 Method teaser
- One row: small drilled-strata glyph (static SVG excerpt of the §8 diagram) + `[DRAFT: "Every problem gets the same treatment: questions until bedrock."]` + link `How I work →` to `/work/method`.

### 6.4 Intake section — on-page (§10) then footer.

---

## 7. Case-study template + per-study specs

### 7.0 Shared template — one page, two reading speeds
**Layer 1 — the 30-second read (first viewport-and-a-half):**
1. Breadcrumb `← All work` + `mono-label` tag row (`GROWTH · JUL '25–JUL '26 · AS AN INTERN`).
2. Title `display-l` + framing line `body-l`.
3. **Problem card:** 2–3 sentence before-picture, `--surface` card, coral left-edge (3px inset border).
4. **The moves:** numbered cards (03–04), each = `mono-label` number `01` + move name `display-s` + one line. Numbering is legitimate here — the moves are a real sequence.
5. **Results strip:** dark card (`--ink` bg, warm-white text — the ONE dark surface in Work mode, reserved for results): 3–4 stats in `mono-stat-xl` with count-up, source line beneath in `mono-label` (`SOURCE: GSC + GA4, AUDITED`).
6. Divider: `[DRAFT: "The full story ↓"]` — `mono-label` centered between two `--line` rules.
**Layer 2 — the full story:** prose (`body-l`, 68ch) in sections with `display-m` titles; pull-stats floating right (240px cards, `mono-stat`, source-labeled) on xl, inline between paragraphs below xl; data tables and receipts per study.
- Footer of every study: prev/next case-study cards + a compact `[DRAFT: "Have a problem like this? →"]` link to Intake.

**Data-table styling (all studies):** `--surface` card, 18px radius; header row `mono-label` on `--bg`; numbers right-aligned Space Mono tabular; change column bold; row hover tint. Mobile: horizontal scroll, first column sticky, subtle right-edge fade cue.

### 7.1 Filing Buddy (`/work/filing-buddy`)
- Tags: `GROWTH · SEO + AEO · JUL '25–JUL '26 · AS AN INTERN`. Framing: `[DRAFT: "The year before me vs. my first year."]`
- Moves (from PRD §4.2): 01 Depth over breadth · 02 The publishing engine · 03 Universal search optimization · 04 The technical overhaul.
- Results strip picks: `×7.5 CLICKS` · `POSITION 45 → 13.6` · `ORGANIC SHARE 39% → 75%` · `213K AI OVERVIEW IMPRESSIONS`.
- Full story sections: The before-picture `[PENDING: W13a-2]` → The four moves (expanded) → The flat months `[PENDING: W15a]` → January 2026 (the turn; run-rate framing only) → The AEO playbook `[PENDING: item 7 fact-check]` → What the client saw.
- **The Inversion viz** (signature graphic of this page): two horizontal stacked bars, BEFORE `61.3% paid / 38.7% organic` → AFTER `25.2% / 74.8%`. Organic = coral, paid = `--muted` at 30%. Bars fill on reveal (700ms). Labels Space Mono. This one graphic tells the whole story.
- **Benchmark table:** 9 rows per PRD; verdict chips — filled coral dot + `OUTPERFORM` / outline dot + `ON PAR`. The yellow row stays. Caption: `[DRAFT: "8 of 9 ahead of 2026 B2B benchmarks. The ninth is a tie. I'm working on it."]`
- **GSC + GA4 tables** per PRD v0.2 §4.2 exactly — engagement-time scoping note rendered as a table footnote.
- **Receipt block:** bordered card, PDF icon + `FB 1-Year Report` + size + `Download the receipt →`. `mono-label` caption: `CLIENT NAMED. NO NDA. REAL DASHBOARDS.` (Dashboard screenshots slot here later — W39.)
- Social strip: LinkedIn 90→2,600 + Instagram numbers as small stat cards.

### 7.2 Buddy Software (`/work/buddy-software`)
- Tags: `0→1 BUILD · SAAS · CA WORKFLOWS`. Framing: `[DRAFT: "Sent to Indore alone in month one. Came back with the PRD."]`
- **Opens with the anchor scene as narrative** (not a stat) — this page leads with story because its numbers are pending: one-paragraph Indore scene, styled as oversized `body-l` first paragraph with drop-cap-weight first line.
- Moves: 01 A week of interviews, N departments *(pending ruling)* · 02 One PRD from twenty voices · 03 Ops ↔ dev alignment · 04 Delivery + UAT.
- **Before/after workflow graphic:** left card "BEFORE" — tangle of small Excel-sheet icons, WhatsApp + email glyphs connected by crossing dashed lines, caption `[DRAFT: "7 sheets, 1 master, everything manual. 2-minute tasks took 10."]`; right card "AFTER" — single platform block, straight lines, `[DRAFT: "One system. One source of truth."]`. Static SVG, ink+coral only.
- Full story: The chaos (W19) → The stakeholder circus (W20, incl. magic-wand expectations) → `[PENDING: W21 — the department conflict]` → What UAT actually teaches (W22) → `[PENDING: W23 + scale numbers]`.
- Results strip (interim until scale numbers land): `N DEPARTMENTS → 1 PLATFORM` · `20+ STAKEHOLDERS INTERVIEWED` · `2-MIN TASKS, NOT 10` `[PENDING: harder numbers]`.

### 7.3 Sapiens (`/work/sapiens`)
- Tags: `SOLO BUILD · MOBILE APP · IN UAT`. Framing: the adopted one-liner — *"The anti-social-network. Real people helping real people nearby."*
- Moves: 01 One sentence → a scoped MVP · 02 Stack chosen solo (Next.js · Supabase · Sanity · Vercel) · 03 Built with AI as the only teammate · 04 Shipped to both app stores.
- Results strip: `TEAM OF 1` · `2 APP STORES` · `STACK ADOPTED COMPANY-WIDE` · `IDEA → APP, SOLO`.
- Full story: Origin ("my boss") → Why alone → The wall (D-U-N-S as a highlighted aside card: `mono-label` header `UNKNOWN UNKNOWN №1`) → The reverse 2 AM story → What AI coding actually is (W27) → Current + dream state.
- **Pull-quote treatment** (this page's texture — his W24–28 lines are the asset): key lines set `display-s` italic-free Bricolage 700, coral 3px left rule, e.g. "AI doesn't remove the struggle, it relocates it."
- Link-out card to sapiens.club (screenshot thumbnail placeholder → real screenshot later).

---

## 8. How I Work — `/work/method` — The Bedrock Method

### 8.1 Page order
1. Hero: `mono-label` `THE METHOD` + `display-l` `The Bedrock Method` + one-liner `[DRAFT: "I don't start building until there's nothing left to ask."]`
2. **The diagram** (below) — the page IS the diagram.
3. The 3–4× rule block.
4. Known issues block (D-4).
5. Range list + `[PENDING: F5 tool split]`.

### 8.2 The Bedrock diagram — full spec
- **Form:** vertical geological cross-section, full content width, ~80vh tall on desktop. Inline SVG, ink linework on `--bg`, coral reserved for the drill line + bedrock label (one-accent rule holds).
- **Strata top → bottom** (each a band with `mono-label` number + Bricolage 700 label + one Satoshi line):
  - `01 SURFACE` — "The fuzzy problem, as handed to me."
  - `02` — "Generate every possible question." (band texture: faint scattered `?` marks)
  - `03` — "Group them. Imagine the flow."
  - `04` — "Answer from most technical → most basic."
  - `BEDROCK` — darkest band, coral stamped label: "Nothing left unexamined. Now we build."
- **The drill line:** 2px coral vertical line drilling from surface through all strata as the user scrolls the diagram into view (stroke-dashoffset animation segmented per stratum; each stratum's label fades in as the line reaches it — 5 steps, ~350ms each, sequential).
- **The payoff:** when the line hits bedrock, a small building glyph rises at the surface (400ms `--spring`) with `mono-label`: "BUILT ON BEDROCK."
- Mobile: same vertical layout, bands compress, labels stack. Reduced motion: everything rendered, line fully drawn, no animation.
- The W36 texture (glass wall, marker, relevance boxes, phased chunks) feeds the prose *beside* the diagram, not extra diagram complexity.

### 8.3 The 3–4× rule
- Full-width quote card: rule verbatim in `display-m`, coral on "3–4 times". Below: prospect-engine example as a mini-card — `mono-label` `LIVE EXAMPLE: THE PROSPECT ENGINE` + two lines + `[DRAFT: "Next: automating the first hello."]`

### 8.4 Known issues (honest edges, D-4)
- Card styled like a changelog entry inside Work mode (no Caveat): `mono-label` header `KNOWN ISSUES (ACTIVELY PATCHING)`; rows: `severity-dot · issue · status`, e.g. `● obsessive about completion — WONTFIX` · `● cold when standards slip — PATCHING` · `● interrupts when excited — IN REVIEW`. `[DRAFT rows — final wording Content Doc]`. Tone: self-aware, not self-flagellating.

---

## 9. The Changelog (`/changelog`)

- One collection; front-matter: `title · date · tags[work|life|both] · version (know-me dress only)`.
- **Work dress:** editorial list — date `mono-label`, title `display-s`, one-line excerpt, thin dividers. Filter chips: `ALL · WORK`. Clean; zero stickers.
- **Know Me dress:** release-note cards — `mono-stat` version `v22.8` in a purple sticker chip (purple = version tags, per foundations), title, then structured lines: `Patched:` / `Added:` / `Known bugs:` in `mono-label` + Satoshi values. Cards carry ±1° resting rotation.
- **Toggle on this page (D-2):** entries morph in place — dress crossfades 400ms, list re-filters with FLIP animation. This page is the transition's showroom.
- Post list bottom in Know Me dress: egg 6 (§12.6).

---

## 10. The Intake — full flow spec

- **Placement:** section on `/work` home + `#intake` anchor; contact block (email + calendar buttons) sits directly above it.
- **Container:** max-width 560px card, `--surface`, `--shadow-m`. Header: `display-m` `[DRAFT: "Pitch me a problem"]` + sub `[DRAFT: "Three questions. You'll accidentally write a mini-PRD."]` + step dots + `mono-label` counter `01 / 05`.
- **Steps** (one visible at a time; advance = slide-left 300ms `--ease-out`, back = slide-right; Enter advances, Shift+Tab/back link returns):
  1. `What's broken?` — textarea, 4 rows, `[DRAFT placeholder: "The thing that keeps eating your week…"]`, min 20 chars.
  2. `Who does it hurt most?` — textarea, 3 rows.
  3. `What have you tried?` — textarea, 3 rows, allowed-empty CTA variant `[DRAFT: "Nothing yet — that's why I'm here →"]`.
  4. `How bad is it?` — severity as 4 large radio cards (not a dropdown — bigger tap targets, funnier as cards), locked copy: `Mild itch` / `Recurring nightmare` / `Existential threat` / `I've already cried`. Selected = coral border + tint.
  5. `Where do I reply?` — email input, validation on blur; submit button `[DRAFT: "File the pitch"]`.
- **Validation:** inline, `--accent-deep` text + input border; error copy in interface voice, never apologetic (`[DRAFT: "Needs an email so the reply has somewhere to go."]`).
- **Submit:** button → 300ms progress; `intake-submit` sound; card flips to success state: `display-s` `[DRAFT: "You just wrote a mini-PRD."]` + `[DRAFT: "Personal reply within 48 hours — that's the public SLA below."]` + counter (below) increments live with a tick animation.
- **The public counter:** beneath the card, `mono-stat`: `Problems pitched: N · Replies sent: N`. `aria-live="polite"`. Storage: needs a tiny persistent store + API route (Vercel KV/Upstash — final call in Build Spec; same store serves the chai counter). Replies count updated manually by Pragaman (admin route or direct KV edit — Build Spec).
- **Spam:** honeypot field + 1/min/IP rate limit. No CAPTCHA (kills the joke).
- **Phase 2 (specced, not v1):** success card folds into a paper note (3D rotateX fold, 600ms) and slides into a slot.

---

## 11. KNOW ME MODE — multi-page (v1.1)

Global Know Me grammar: cards rest at ±1–2° rotation (straighten on hover), sticker chips use teal/purple/sun with coral leading, Caveat annotations appear ONLY here, section eyebrows stay `mono-label` (numbers always wear Space Mono — both modes).

### 11.0 The hub — `/know-me` as a level-select screen
- Page order: playful hero (§11.1) → **the level grid** → footer.
- **Level grid:** 5 cards (1 col mobile / 2 md / 3 lg — last row centers), one per section page, styled as game level tiles:
  - `mono-label` header `LEVEL 01` … `LEVEL 05` + section emoji/glyph (🪦, 📊-style stat glyph, 🗺, 📌, ❓ — final glyphs in build)
  - Title `display-s` + one-line tease (Satoshi, `[DRAFT]`: Graveyard "Ideas that didn't make it." · Numbers "KPIs nobody asked me to track." · Save States "India as a memory card." · Rent-Free "Things living in my head." · FAQ "A self-interview that goes downhill.")
  - `mono-label` status chip in a sticker color: `UNLOCKED` (purple). A section hidden by the thin-section rule (§14) shows instead as a **locked tile**: greyed, `LOCKED — CONTENT DLC PENDING`, non-clickable — the placeholder system itself becomes a joke, on-brand and honest.
  - Resting rotation ±1°, straighten + lift on hover; whole tile clickable.
- Level numbering order: 01 Graveyard · 02 Life in Numbers · 03 Save States · 04 Rent-Free · 05 FAQ. Changelog is linked from nav, not a tile (it's shared, not a level).
- **Section-page template (shared by all five):** breadcrumb `← Level select` (top-left, `mono-label`) → section header (eyebrow + title per specs below) → content → footer nav: `← PREV LEVEL · NEXT LEVEL →` cards (mini level tiles). Each page keeps its section spec below unchanged; specs §11.2–11.6 now describe full pages, not scroll sections.

### 11.1 Playful hero (on the hub)
- Layout: photo left / text right on desktop; photo above on mobile.
- **Photo frame:** polaroid-style card, 4px white border + `--shadow-m`, −2° rotation, tape-strip graphic (sun-yellow, 40% opacity) on one corner. Until real photos: memoji placeholder inside the frame + `mono-label` `[PENDING: PHOTO — REAL, NOT AI]`.
- **Caveat annotations:** 2–3 max, coral ink, hand-drawn SVG arrows (1.5px, slight wobble filter), e.g. `[DRAFT: "actual smile, not LinkedIn smile"]`. Positioned absolutely around the frame; drop below photo on mobile.
- Headline `display-l` at −1°: `[DRAFT: "Same person, fewer buzzwords."]` + short Satoshi intro `[PENDING: Section 2]`.
- Sticker-dot confetti (6–8 static dots, sticker colors) scattered in the hero only. Not animated — restraint budget (D-7).

### 11.2 The Graveyard 🪦
- Eyebrow `THE GRAVEYARD` + title: **Black Ops One, one-off costume** — stencil treatment: letter-spacing 0.06em, ink color, subtle spray-edge texture mask, small `mono-label` beneath: `[DRAFT: "IDEAS, ABANDONED. REST IN PEACE."]`. Black Ops One appears NOWHERE else — enforced by it being loaded/subset for this heading string only.
- Grid: responsive cards (1 col mobile / 2 md / 3 lg), each tombstone:
  - Tombstone silhouette card (rounded-top rectangle, `--card` bg, `--line` border)
  - `🪦` glyph + idea name `display-s` + `mono-label` dates `b. 2023 — d. 2023`
  - Epitaph one-liner (Satoshi italic) + `Cause of death:` line (`mono-label` + value)
- Hover: card settles upright + a tiny SVG flower sprouts at the base (300ms `--spring`, one per card). Reduced motion: flower just appears.
- Content `[PENDING: P9–P12]` — render 3 placeholder tombstones in dev, hide section in prod if empty (thin-section rule).

### 11.3 Life in Numbers
- Parody metrics dashboard. Eyebrow `LIFE IN NUMBERS` + `[DRAFT: "KPIs nobody asked me to track."]`
- Masonry-ish grid (CSS columns, 1/2/3): stat cards each = `mono-label` metric name · `mono-stat-xl` value (count-up) · optional trend arrow in a sticker color · optional deadpan footnote (Satoshi 13px).
- 1–2 cards include tiny fake sparklines (hand-wobbled SVG path, teal).
- **The chai counter lives here** as the biggest card (egg 4, §12.4).
- Candidate stat `[DRAFT: "UNOFFICIAL TITLES HELD: 1 — 'The Everything Guy'"]`. Rest `[PENDING: P13–P20 + rapid-fire]`.

### 11.4 Save States
- Eyebrow `SAVE STATES` + `[DRAFT: "India, as a memory card."]`
- **Map:** inline SVG of India, state-level paths. Visited states: filled coral 18% tint + coral 1.5px stroke; the four home states: solid coral fill; unvisited: `--line` grey fill.
- Desktop: map left (55%) + save-slot panel right. Clicking a visited state slides its card into the panel. Mobile: map on top (pinch-free, whole-map tap targets ≥ 44px via enlarged hit paths), cards in a horizontal snap-scroll rail beneath.
- **Checkpoint cards** (Samastipur → Ranchi → Bhubaneswar → Pune), game-save styling: `mono-label` header `SAVE SLOT 01 — SAMASTIPUR` + `LEVEL: childhood` line + "What this level taught me" (Satoshi) `[PENDING: P1 + travel list]` + tiny pixel-corner decoration (purple).
- A dotted coral path connects the four checkpoints on the map, drawn on reveal (1s, once).
- Grey state click/tap → egg 5 tooltip (§12.5).

### 11.5 Rent-Free
- Eyebrow `RENT-FREE` + `[DRAFT: "Things living in my head. They don't pay."]`
- Masonry grid of mixed cards: meme images (real uploads later — `[PENDING: P21, P24]`), song cards (`mono-label` `ON REPEAT` + title/artist), quote cards (Caveat, large, on sun-tinted card). Random resting rotation ±2°, sticker-colored pin dot on each card's top edge.
- Hover: straighten + lift. Tap on mobile = same as hover (first tap), nothing navigates unless a card has a link.

### 11.6 FAQ Nobody Asked
- Eyebrow `FAQ NOBODY ASKED` + `[DRAFT: "A self-interview that goes downhill."]`
- Accordion: question row = `mono-label` index `Q.01` + question in Bricolage 700 18px; chevron rotates 180°; answer in Satoshi, 300ms height ease. One open at a time.
- Escalation is content-driven `[PENDING: Section 2 + W34–37 feeders]`; later questions may answer in Caveat when unhinged enough (content-flagged per entry).

### 11.7 Changelog (personal view) — dress spec in §9; reached via nav; egg 6 at list bottom.

---

## 12. Easter eggs — build specs (1–7 in v1; 8–10 last)

Shared rules: each egg fires `egg-found` sound on FIRST discovery only (per-egg localStorage flag `pragaman-egg-{n}`), never interrupts a task, all dismissible, all keyboard-accessible, none tracked beyond the local flag + global counters.

1. **identity_crisis.exe** — Trigger: ≥8 toggle flips within 10s (sliding window). Full-screen overlay styled as an on-brand fake error card (NOT a real BSOD clone — ink card, coral titlebar, `mono-label` chrome): `ERROR: identity_crisis.exe — he's both, okay?` + button `[DRAFT: "Accept and continue"]`. `glitch` sound. Page beneath does a 2px shake (200ms). Once per session. Esc closes. Reduced motion: no shake.
2. **Console greeting** — `console.log` with ASCII wordmark (coral via `%c` styling) + `[DRAFT: "You opened the console. Obviously we should talk. Found a real bug? That's a free coffee chat: {email}"]`. Fires once per page load, dev-tools detection not required (just log it).
3. **404 = Graveyard plot** — 404 page renders ONE tombstone component full-center: name = the bad path (truncated 32 chars), dates `b. never — d. immediately`, epitaph `[DRAFT: "This page was never born. Still mourned."]` + `Back to the living →`. In BOTH modes (404 keeps current mode's dress; tombstone is the one Know-Me component allowed to appear in Work dress — it's a 404, rules relax).
4. **Chai counter** — Big card in Life in Numbers: `mono-label` `CHAI CONSUMED (GLOBAL, LIVE)` + `mono-stat-xl` count + cup icon button. Click: +1 via API (same KV store as Intake counter), `chai-sip` sound, cup tilts 15° (`--spring`), floating `+1` particle rises 24px and fades. Debounce 400ms; count is global across all visitors; `aria-live="polite"`. Optimistic UI.
5. **DLC states** — Tap/click any grey state → tooltip card at cursor/tap point: `mono-label` `LOCKED` + `[DRAFT: "DLC not yet purchased (trip pending)."]` + state name. Auto-dismiss 2.5s. `egg-found` on first ever.
6. **v0.0.1** — Fixed final entry, Know Me changelog dress, slightly faded: `v0.0.1 — born in Samastipur. Initial commit.` No link, no hover — it's a headstone of a different kind.
7. **After-midnight hero swap** — 00:00–04:59 visitor local time: Work hero sub-line appends / swaps to `[DRAFT: "You're up late. Same."]`; Know Me hero annotation swaps to a Caveat `[DRAFT: "why are we both awake"]`. Pure client-side time check on mount; no layout shift (reserved line).
8. **Living memoji (post-v1)** — Toggle memoji: 60s no input → eyes close (sleep frame + tiny `z`); any input → startle frame 400ms; ≥5 rapid clicks on toggle without flipping → annoyed frame 2s. Frame-swap implementation (3–4 PNG frames), no rigging.
9. **Doodle pen (post-v1)** — Press-and-hold 3s on any non-interactive area → cursor becomes crayon, freehand coral stroke (4px, round caps, slight jitter) on a full-page canvas overlay. Esc or double-tap exits; strokes fade over 10s. Know Me only. Touch: two-finger hold 3s.
10. **Konami doodle-burst (post-v1)** — Konami code (keyboard; on touch: tapping the footer sign-off 7×) → every photo on screen sprouts Caveat doodles + sticker confetti burst (1.2s, then settles). Know Me only.

---

## 13. Accessibility & quality floor (launch-blocking)

- **Contrast:** body ink on both bgs passes AAA. Coral `#FF6B5E` used only ≥ 24px text or non-text graphics; interactive/small coral text always `--accent-deep #E85546` + underline or 700 weight. Verify every `mono-label` on tinted chips ≥ 4.5:1 during build (darken chip text, not the chip).
- **Keyboard:** every interactive element focusable in DOM order; visible 2px `--accent` focus ring (offset 2px) everywhere; Intake fully keyboard-completable; map states focusable with Enter-to-open (roving tabindex); accordion arrow-key navigable.
- **Screen readers:** decorative SVGs `aria-hidden`; the Bedrock diagram gets a text alternative (the method in one paragraph); doodles/annotations `aria-hidden` (decorative by definition); counters `aria-live="polite"`; egg overlays trap focus + Esc.
- **Reduced motion:** per-section fallbacks specified above; global rule — nothing conveys information through motion alone.
- **Performance budget:** LCP < 2.0s on 4G; fonts subset + `next/font` (zero CLS); sounds lazy-loaded after first interaction; map + diagram SVGs inline (no requests); images AVIF/WebP via `next/image`. Lighthouse ≥ 95 across the board before launch.
- **Titles/OG:** every route gets title + description + OG image `[PENDING: Content Doc]`; case studies get per-page OG cards (template: ink bg, stat in Space Mono, coral accent).

## 14. The placeholder system (content-before-copy discipline)

- All copy lives in `/content` files (MDX/JSON), never hardcoded in components. Every pending item uses the shared component: dashed `--line` border card, `mono-label` coral tag `[PENDING: W21]` + one line of what belongs there.
- Build flag `SHOW_PENDING`: `true` in dev/preview (placeholders visible, countable), `false` in prod. Thin-section rule per mode: Work sections with pending-critical content hide entirely; Know Me section *pages* with pending-critical content render as locked tiles on the hub (§11.0) and their routes 404 (to the Graveyard, naturally).
- **Launch checklist gate:** `grep -r "PENDING" content/` must return zero before the domain goes live.
- CLAUDE.md will carry, verbatim: **"Never invent copy, facts, numbers, or names. If content is missing, render the Pending component with the reference ID. All numbers come from the facts registry in PRD v0.2 §7."**

## 15. Hand-off notes → Build Spec / CLAUDE.md (next deliverable)

To be resolved there, not here: Next.js App Router structure & component tree · KV store choice + API routes (intake, counters, admin) · form email delivery (Resend or similar) · MDX pipeline for changelog · sound-file sourcing + licenses · font self-hosting steps · India map SVG source (license-clean) · memoji frame assets · analytics (privacy-light, e.g. Plausible/Vercel) · OG image generation · deployment (Vercel subdomain now → pragaman.com later).

*End of Design Spec v1.1. Copy authority: Content Doc. Fact authority: PRD v0.2 §7. Design authority: Foundations v1 + this document.*
