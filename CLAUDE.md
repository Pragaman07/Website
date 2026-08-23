# CLAUDE.md — pragaman.com build spec
*v1 · 23 Aug 2026 · This file lives at the repo root. Claude Code: read this fully before writing any code.*

> **SESSION CONTINUITY: read `HANDOFF.md` FIRST.** It carries the live build state (phases shipped, what's next), Pragaman's post-freeze rulings (with `DECISIONS.md`), infra/env state, and this machine's verification quirks. This spec is the contract; HANDOFF.md is where we are in it.

## What this project is
Pragaman Kumar Anurag's two-mode personal website. **Work mode** (founders/recruiters — receipts-first case studies) and **Know Me mode** (playful, personal, game-flavored). Planned in full before this build; your job is execution, not invention.

## The three authority documents — read before Phase 0
All live in `/docs`. On any conflict: the more specific document wins for its domain.
1. `/docs/pragaman-site-prd-v0.2.md` — WHAT exists + **§7 facts registry = the only source of facts and numbers**
2. `/docs/pragaman-design-spec-v1.md` — HOW everything looks/moves (v1.1; every component references a § here)
3. `/docs/pragaman-design-foundations-v1.md` — tokens, fonts, color rules
Also in `/docs`: `FB_1_year_Work_Report.pdf` (the downloadable receipt asset).

---

## ⛔ NON-NEGOTIABLE RULES (checked at every phase)

1. **Never invent copy, facts, numbers, names, dates, or quotes.** If content is missing, render the `<Pending id="W21" />` component with the reference ID. All numbers come from `content/facts.json` (mirrors PRD §7). If a needed fact isn't there, STOP and ask Pragaman — do not approximate.
2. **All copy lives in `/content` files** — zero user-facing strings hardcoded in components. Draft copy from the design spec goes into content files marked with `"draft": true`.
3. **Work mode has exactly one accent: coral.** Teal/purple/sun tokens are not defined in Work scope — if a Work-mode component needs them, the design is being violated; stop.
4. **Caveat font never renders in Work mode.** Black Ops One renders in exactly one place: the Graveyard title (design spec §11.2).
5. **Every number, stat, version tag, label, and timestamp wears Space Mono.** No exceptions, both modes.
6. **Coral never sets body-size text.** Small/interactive coral text uses `--accent-deep` (see spec §13 contrast rules).
7. **Retired forever:** the "20X traffic" claim · navy/gold palette. **Off-limits forever:** family details · any "open to work"/hire-me signal · AI-generated imagery (real photos or placeholders only).
8. **Sound only on:** toggle flip, easter-egg first discovery, Intake submit, coffee sip. Never on scroll, hover, nav, or load.
9. **Don't refactor beyond the task.** One phase at a time. Don't "improve" locked design decisions.
10. **Accessibility is launch-blocking, not polish** (spec §13): reduced-motion fallbacks, keyboard paths, focus rings, aria-live counters ship WITH each component, not after.

---

## Stack & libraries

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel** (subdomain now; `pragaman.com` attached post-completion).
- **Design tokens:** CSS custom properties on `:root[data-mode]` in `styles/globals.css` (exact values: spec §1.1–1.3). Map them into Tailwind theme so utilities like `bg-surface`, `text-accent` work. Tailwind config stays thin — tokens are the truth.
- **Motion:** `motion` (Framer Motion) for the toggle, temperature transition, egg overlays, and spring interactions; plain CSS transitions for hovers/reveals. Respect `useReducedMotion` everywhere.
- **Sound:** `use-sound` (locked). Files in `public/sounds/` + `public/sounds/LICENSES.md` logging source + license for each.
- **Content:** local files in `/content` — JSON for structured data, MDX for prose (changelog entries, case-study full stories) parsed with `gray-matter` + `next-mdx-remote` (or `@next/mdx` if simpler in practice — your call, keep it light, no CMS).
- **KV store:** Upstash Redis via the Vercel Marketplace integration (serves coffee counter, intake counters, intake submissions, rate limiting). Client in `lib/kv.ts`.
- **Email:** Resend — Intake submissions email Pragaman. **Store-then-send:** write to KV first, then email; a Resend failure must never lose a pitch.
- **Analytics:** Vercel Analytics (privacy-light, zero-config). No cookies, no consent banner needed.
- **Icons:** `lucide-react`, sparingly — most "icons" in this design are typography, emoji, or custom SVG.

## Project structure

```
pragaman.com/
├── CLAUDE.md
├── docs/                          # the 3 authority docs + FB report PDF
├── app/
│   ├── layout.tsx                 # fonts, providers, <html data-mode> boot script
│   ├── page.tsx                   # The Door + stored-mode redirect (spec §3.1)
│   ├── work/
│   │   ├── page.tsx               # Work home (spec §6)
│   │   ├── filing-buddy/page.tsx  # spec §7.1
│   │   ├── buddy-software/page.tsx# spec §7.2
│   │   ├── sapiens/page.tsx       # spec §7.3
│   │   └── method/page.tsx        # Bedrock (spec §8)
│   ├── know-me/
│   │   ├── page.tsx               # hub / level select (spec §11.0–11.1)
│   │   ├── graveyard/page.tsx     # §11.2
│   │   ├── numbers/page.tsx       # §11.3
│   │   ├── save-states/page.tsx   # §11.4
│   │   ├── rent-free/page.tsx     # §11.5
│   │   └── faq/page.tsx           # §11.6
│   ├── changelog/page.tsx         # dual-dress (spec §9)
│   ├── not-found.tsx              # egg 3 — Graveyard plot (spec §12.3)
│   └── api/
│       ├── intake/route.ts        # POST: validate → KV → Resend → increment
│       ├── coffee/route.ts          # POST +1 (debounced client-side, limited server-side)
│       ├── counters/route.ts      # GET { pitched, replied, coffee }
│       └── admin/counters/route.ts# POST with x-admin-key: set replied count
├── components/
│   ├── shell/    # Header, Footer, ModeToggle, MuteButton, TemperatureLayer, NavPanel
│   ├── ui/       # Button, Card, MonoLabel, SectionHeader, Pending, CountUp, Reveal, StatStrip
│   ├── work/     # ProofStrip, CaseCard, MoveCard, ResultsStrip, DataTable, BenchmarkTable,
│   │             # InversionViz, WorkflowBeforeAfter, PullStat, PullQuote, ReceiptCard,
│   │             # BedrockDiagram, KnownIssues, MethodTeaser, intake/ (IntakeCard, Step, SeverityCards, SuccessState)
│   ├── know/     # LevelGrid, LevelTile, PolaroidHero, DoodleNote, Tombstone, MetricCard,
│   │             # CoffeeCounter, IndiaMap, SaveSlotCard, RentFreeCard, FaqAccordion, LevelFooterNav
│   ├── changelog/# EditorialEntry, ReleaseNoteEntry, TagFilter
│   └── eggs/     # IdentityCrisisOverlay, consoleGreeting.ts, MidnightSwap, DlcTooltip
├── content/                       # ALL user-facing words + facts (schemas below)
├── lib/                           # mode.ts, sound.ts, kv.ts, ratelimit.ts, content.ts, time.ts
├── public/
│   ├── fonts/satoshi/             # self-hosted (Fontshare download)
│   ├── sounds/                    # 5 files + LICENSES.md (spec §4)
│   └── images/                    # photo placeholders, memoji frames, og/
└── styles/globals.css             # tokens (spec §1)
```

## Content architecture (`/content`)

- `facts.json` — machine-readable mirror of PRD §7: every audited number, date, name, and scoping note, each with a `source` field (`"GSC"`, `"GA4"`, `"PRD§7"`). **Components render numbers ONLY from here.** Example entry:
  ```json
  { "id": "fb.clicks", "before": "2,500", "after": "18.8K", "change": "×7.5", "source": "GSC, FB 1-Year Report" }
  ```
- `global.json` — wordmark, nav labels (per mode), footer, mute labels.
- `door.json` — framing line, two door cards.
- `work/home.json` — hero (eyebrow, headline + accent-phrase index, subline, CTAs), case cards, method teaser.
- `work/case-studies/{slug}/meta.json` — tags, framing line, moves[], results-strip stat IDs (→ facts.json), table data, receipt info.
- `work/case-studies/{slug}/story.mdx` — full-story prose; may use `<PullStat id/>`, `<PullQuote/>`, `<Pending id/>`.
- `work/method.json` — diagram strata labels, 3–4× rule, known-issues rows, range list.
- `work/intake.json` — all step questions, placeholders, severity options (locked copy), success copy, error copy.
- `know/hub.json` · `know/graveyard.json` · `know/numbers.json` · `know/save-states.json` · `know/rent-free.json` · `know/faq.json` — per spec §11 anatomy; every item supports `"pending": "P13"` to render locked/Pending states.
- `changelog/*.mdx` — frontmatter: `title, date, tags[work|life|both], version, patched[], added[], bugs[]`.
- Any string with `"draft": true` renders normally but is greppable for the Content-Doc replacement pass.

---

## Core systems — implementation notes

### Mode system (`lib/mode.ts` + shell)
- State: `data-mode="work|know"` on `<html>` + `localStorage("pragaman-mode")`.
- **No-flash boot:** inline `<script>` in `<head>` (via layout) reads localStorage and sets `data-mode` before paint; default for first visit = no mode → `/` renders the Door. `/work` and `/know-me` routes force-set their mode on mount (deep-link rule).
- `/` with stored mode: redirect in the boot path (client redirect is acceptable; avoid SSR flash by rendering nothing until decided).
- Flip sequence per spec §3.3: knob → TemperatureLayer bloom (fixed-position radial overlay component) → root class swap (CSS variables transition on consumers) → garnish stagger. On mode-exclusive routes, run transition then `router.push` to the other home; on `/changelog`, re-dress in place.
- Rapid-flip counter (sliding 10s window) feeds egg 1.

### Sound system (`lib/sound.ts`)
- Thin wrapper over `use-sound`: `useSfx(id)` reads mute from `localStorage("pragaman-muted")` (default unmuted) via context. Preload after first user interaction only. Volumes per spec §4 table.

### Counters & Intake API
- KV keys: `counter:coffee` · `counter:pitched` · `counter:replied` · `intake:{ulid}` (full submission JSON) · `rl:{ip}:{route}`.
- `POST /api/intake`: honeypot check → rate limit (1/min/IP, KV token bucket in `lib/ratelimit.ts`) → validate (zod) → `intake:{ulid}` write → `INCR counter:pitched` → Resend email to Pragaman → return new counters. Client: optimistic UI, `intake-submit` sound on success only.
- `POST /api/coffee`: rate limit (10/min/IP) → `INCR counter:coffee`. Client debounce 400ms + optimistic increment.
- `GET /api/counters`: returns all three; consumed by ProofStrip-adjacent counter, Intake footer, CoffeeCounter. Revalidate on focus; `aria-live="polite"` on render targets.
- `POST /api/admin/counters`: header `x-admin-key === process.env.ADMIN_KEY` → set `counter:replied`. (Pragaman updates this after answering pitches; document the curl command in README.)

### Fonts (`app/layout.tsx`)
- `next/font/google`: Bricolage Grotesque (variable, `opsz`+`wght` 700/800), Space Mono (400/700), Caveat (500/700), Black Ops One (subset — used once, load with `display: swap` only on the Graveyard route if easy, else globally but tiny).
- `next/font/local`: Satoshi 400/500/700 — download from Fontshare (free license; keep the license file in `public/fonts/satoshi/`).
- Expose each as a CSS variable (`--font-display`, `--font-body`, `--font-mono`, `--font-doodle`) consumed by tokens. Zero CLS budget.

### Assets to source during build (log licenses)
- **India map SVG:** license-clean state-level SVG (e.g. npm `@svg-maps/india` or DataMeet CC-BY maps — verify license, attribute in footer/colophon if required). Use the standard Survey-of-India national depiction — border depiction is a sensitive detail for an Indian audience; don't grab a random world-atlas variant.
- **Sounds:** 5 files per spec §4 from Mixkit/Freesound (CC0/Mixkit license), normalized, < 100KB total, logged in `public/sounds/LICENSES.md`.
- **Memoji + headshot:** Pragaman supplies; until then `public/images/placeholder-memoji.png` + framed placeholder per spec §11.1. Egg 8's extra frames arrive with them (post-v1 anyway).
- **OG images:** static template per spec §13 (ink bg, Space Mono stat, coral accent) — generate per-route PNGs at build (satori/`next/og`).

---

## Build order — phases with acceptance gates

Work one phase per session where possible. Commit per phase. Do not start N+1 with N's gate failing.

**Phase 0 — Scaffold & tokens.** Next.js + TS + Tailwind app; `styles/globals.css` with full token set (spec §1); fonts wired; `content/` scaffolded with schemas + facts.json fully populated from PRD §7; `Pending`, `MonoLabel`, `Card`, `Button`, `Reveal`, `CountUp` primitives.
✅ Gate: both `data-mode` themes render a token test page correctly; fonts load with zero CLS; facts.json review passes (every number traceable to PRD §7).

**Phase 1 — Shell.** Header, footer, nav panel, ModeToggle + TemperatureLayer + full transition (spec §3.2–3.3), SoundProvider + mute, the Door (spec §3.1), mode persistence + deep links + redirect.
✅ Gate: flip feels like weather (700ms sequence, garnish stagger); reduced-motion fallback; keyboard-operable toggle; no sticker color visible in Work at any transition frame.

**Phase 2 — Work mode.** `/work` home (hero, proof strip w/ count-up, case cards, method teaser, Intake section); three case-study pages from the shared template (spec §7.0) incl. DataTable, BenchmarkTable, InversionViz, WorkflowBeforeAfter, PullQuote, ReceiptCard; `/work/method` with the full BedrockDiagram (spec §8.2 — drill-line scroll sequence + reduced-motion static render); KnownIssues block.
✅ Gate: all numbers render from facts.json; benchmark table shows the yellow row; Pending components visible where PRD marks 🔴; Lighthouse ≥ 90 already.

**Phase 3 — Intake live.** Full 5-step flow (spec §10), validation, API routes, KV, Resend, counters live, success state + sound.
✅ Gate: keyboard-only completion works; honeypot + rate limit verified; a test pitch arrives by email AND exists in KV; counter increments with aria-live announcement.

**Phase 4 — Know Me mode.** Hub + level grid + locked-tile logic; five section pages per spec §11 (Graveyard incl. Black Ops One one-off + flower hover; Numbers grid; Save States map + checkpoint path + slot panel; Rent-Free; FAQ accordion); LevelFooterNav.
✅ Gate: Caveat appears nowhere in Work; empty sections render as LOCKED tiles and their routes 404; map keyboard path works; mobile snap-rail works.

**Phase 5 — Changelog + eggs 1–7.** Dual-dress changelog with in-place re-dress on flip (spec §9); eggs per spec §12.1–12.7 including 404 page; `egg-found` first-discovery logic.
✅ Gate: each egg triggerable + dismissible + keyboard-safe; egg 1 fires only on ≥8 flips/10s; midnight swap verified by faking clock; v0.0.1 present.

**Phase 6 — Polish & launch-readiness.** Full spec §13 pass: contrast audit, focus rings, aria, reduced-motion sweep, perf budget (LCP < 2.0s, Lighthouse ≥ 95 all categories), OG images + metadata, 404/500, README (env setup, admin curl, content-editing guide for Pragaman).
✅ Gate: launch checklist below all green except content-pending items.

**Launch checklist (domain does not attach until all green):**
- [ ] `grep -r "PENDING\|\"draft\": true" content/` → zero
- [ ] Photos swapped in (hero polaroid, receipts screenshots if provided)
- [ ] Both modes complete; thin sections consciously dropped, not broken
- [ ] Lighthouse ≥ 95 ×4 · reduced-motion pass · keyboard pass
- [ ] Counters live with real KV · Intake email confirmed on production domain
- [ ] hello@pragaman.com wired post-domain · redirects from old portfolio decided

---

## Working protocol for Claude Code

1. **Session start:** read this file; read the design-spec § for the components in scope; read the relevant `/content` schema. Announce the phase plan in a few lines before coding.
2. **When the spec is silent** on a visual/technical micro-detail: follow the spec's grammar (§5 motion tokens, §1 tokens) and choose the quietest option. When it's silent on anything user-visible in COPY or FACTS: `<Pending>`, never invention — then list open questions at session end for Pragaman.
3. **Verify visually.** After building any page, run dev and check both modes, mobile width (390px) and desktop, plus reduced-motion. Fix before moving on.
4. **Never edit `/docs`.** They're the record. Deviations require Pragaman's explicit yes, logged in a `DECISIONS.md`.
5. **Env vars** (`.env.local`, documented in README): `KV_REST_API_URL`, `KV_REST_API_TOKEN` (Upstash/Vercel names as provisioned), `RESEND_API_KEY`, `INTAKE_TO_EMAIL`, `ADMIN_KEY`.
6. Keep components small and typed; content schemas get TS types in `lib/content.ts`; no `any`.

*End of CLAUDE.md. Authority order for conflicts: facts → PRD v0.2 §7 · design → Design Spec v1.1 · tokens → Foundations v1 · everything else → ask Pragaman.*
