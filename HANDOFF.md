# HANDOFF.md — session continuity for pragaman.com
*Written 24 Aug 2026 at the end of the build session that shipped Phases 0–4. Purpose: a brand-new Claude Code session, given this folder, reconstructs the full working context from this file + CLAUDE.md + DECISIONS.md + /docs. Keep this file updated at every session end.*

## Restart prompt (Pragaman: paste this into a fresh chat opened in this folder)

> We are mid-project building my personal website. Read HANDOFF.md, CLAUDE.md, and DECISIONS.md fully before doing anything — they carry the entire context, working process, and my rulings. Confirm what phase we're at and what's next, then wait for my go.

## Who you're working with

Pragaman Kumar Anurag — the site's owner and subject. PM-to-PM style: direct, one clear recommendation + alternatives, he picks fast. Push back honestly with reasons. Never re-ask a settled ruling (they live in DECISIONS.md). Facts discipline is absolute: every number from `content/facts.json`, never invent copy — `<Pending id/>` + ask. He answers messily; you structure.

## Build state (all pushed to main)

| Phase | Status | Key commits |
|---|---|---|
| 0 — Scaffold & tokens | ✅ gate passed | 70fb164 |
| 1 — Shell, toggle, temperature transition, Door | ✅ gate passed (flip *feel* still wants his eyes) | f0a9f70 |
| 2 — Work mode (home, 3 case studies, Bedrock method) | ✅ gate passed; perf 86 local (noisy machine — real check = PageSpeed on deployed URL); a11y/bp 100, seo 91 | 3992df3→2cf8a63 |
| 3 — Intake live (KV, Resend, 5-step flow, counters, admin) | ✅ verified against REAL Upstash + Resend from localhost | c165359, 2ee112a |
| 4 — Know Me (hub, faces, Graveyard, Numbers+coffee, Save States map) | ✅ gates passed (locked tiles + 404 prod-verified; map keyboard live-tested) | 0393744, 5356649, 7da71a2 |
| 5 — Changelog + eggs 1–7 | ✅ gate passed (egg1 ≥8-flips + once/session, Esc, focus-trap; midnight verified via dev `?fakeHour=N`; 404 plot; v0.0.1 headstone; in-place re-dress; egg-found wired into coffee + DLC; all 5 sounds now exist, ~70KB, ALL placeholder audition-pending) | see log |
| 6 — Polish & launch-readiness | ✅ build-side done: OG images (§13 template) + metadataBase + sitemap/robots + 500 page + Vercel Analytics; §13 audit → **a11y 100 + best-practices 100 on all 10 routes** (fixed: know-muted #616A76, mono-label 12px, MonoLabel color-precedence bug, doodles accent-deep+700, Analytics gated to Vercel); README editing guide for Pragaman. SEO 91–92 blocked ONLY by meta-descriptions (Content Doc). | see log |

**Launch checklist (CLAUDE.md) — current status:** content grep (PENDING/draft) 🔴 awaits Pragaman's answers + Content-Doc pass · photos ✅ (dashboard screenshots W39 optional) · both modes complete ✅ (thin sections consciously locked) · Lighthouse a11y/bp 100 ✅, SEO needs descriptions, **perf ≥95 must be measured via PageSpeed on the deployed URL** (local is noise; also needs Deployment Protection off) · reduced-motion ✅ code-audited (human pass pending) · keyboard ✅ (map+intake verified; human pass pending) · counters live ✅ · intake email on production 🔴 (his inbox confirm + protection off) · hello@ + redirects 🔴 post-domain.

**Working process (locked with Pragaman):** each phase splits into chunks; present the chunk plan, then build → verify → commit → push ONE chunk, wait for his "next". Commit messages are detailed; commit per chunk; push after each.

## Phase 5 — shipped notes

Egg framework: `lib/eggs.tsx` (`useEggFound(n)` — localStorage `pragaman-egg-{n}`, chime first time only). Eggs copy: `content/eggs.json`. Changelog: `lib/changelog.ts` loads `content/changelog/*.mdx` (frontmatter; `headstone: true` pins v0.0.1 last); `_meta.json` = page header; the `site-ships.mdx` entry is `draft: true` for the content pass. Midnight: `lib/midnight.ts` + `components/eggs/MidnightSwap.tsx`; dev-only `?fakeHour=N` fakes the clock. Eggs 8–10 remain post-v1 by design (memoji-call/full images reserved).

## Rulings (full log in DECISIONS.md — headline ones)

- Buddy Software = **7 departments**.
- Repo is **public** by informed choice — never re-ask.
- **Contrast resolutions** override spec §6.1/§1.2 color details (§13 is launch-blocking): large coral accents → accent-deep; small coral links → ink + coral underline; primary buttons → ink-on-coral; awaiting his ack/veto.
- **Chai → coffee sitewide** (also answers P19): `/api/coffee`, `counter:coffee`, `coffee-sip`, CoffeeCounter.
- **India map: full-Kashmir Indian depiction** — @svg-maps/india (CC BY 4.0, credited); verified by rasterizing. City coords calibrated in `lib/india.ts`.
- Fonts: Bricolage static 700/800; only Bricolage + Satoshi preload.

## Infra & environment

- **Vercel**: project `website` (team prgamans-projects), Framework preset Next.js, auto-deploys from main. **⚠ Deployment Protection is ON — Pragaman must disable it** (Settings → Deployment Protection → Vercel Authentication → Disabled) or the public URL serves an SSO wall/404.
- **Upstash Redis** (Vercel Marketplace) + **Resend** are LIVE. Env: `.env.local` locally (real values; NEVER committed, never pasted in chat — he once pasted a Resend key into `.env.example`; it was caught pre-push. Check every diff for secrets). `.env.example` is the committed template. Code accepts `KV_REST_API_*` or `UPSTASH_REDIS_REST_*` names. Resend sandbox delivers only to his signup email → `INTAKE_TO_EMAIL` = that address; From uses `onboarding@resend.dev` until the domain exists (Phase 6).
- **Counters state**: reset clean to 0/0/0 after verification. One leftover TEST intake record of his in KV: `intake:01M0QY9P47PG8FX3S87G8EHMBQ` (delete on request). Admin curl is in README.
- **Local dev with real creds hits PRODUCTION KV** — reset counters after tests (admin route).
- **Git**: remote `https://Pragaman07@github.com/Pragaman07/Website.git` — the username pin matters (machine has other GitHub identities: global name "Mythcoder2484", stored creds for "Sapiensclub" which 403s). Author = `Pragaman Kumar Anurag <204646209+Pragaman07@users.noreply.github.com>` (repo-local config). The permission classifier sometimes blocks `git push` — hand Pragaman the command in a bash block when it does.

## Assets

- **Photos**: `public/images/prag.png` (real photo, square), `memoji-fun.png` (winking — toggle face), `memoji-full.png` + `memoji-call.png` (reserved: egg 8 frames / contact area). Derived crops `prag-face.jpg` + `memoji-face.png` regenerate via `node scripts/prepare-images.mjs`.
- **Sounds**: `flip.wav`, `send.wav`, `sip.wav` are synthesized PLACEHOLDERS (scripts committed; logged in `public/sounds/LICENSES.md`) — **Pragaman must audition**; replace file, keep name.
- **FB report**: `public/downloads/FB_1_year_Work_Report.pdf` (public-by-design receipt) + `docs/` copy.
- `docs/ME.pdf` = The Pragaman Files questionnaire (raw W/P/S answers; Section 2 = P2–P60 mostly unanswered).

## Machine/verification quirks (this Windows machine)

- The in-app browser pane is usually **hidden** → the page never paints: IntersectionObserver never fires, rAF/motion animations freeze, screenshots fail. Verify via `javascript_tool` state checks + `curl` of HTML/RSC. AnimatePresence `mode="wait"` is untestable hidden (exit anims hang) — IntakeCard deliberately uses keyed entrance-only slides.
- `read_console_messages` buffer persists across navigations AND server restarts — stale errors look current. Verify via curl + server logs before debugging.
- Local Lighthouse swings ±15 on perf — only PageSpeed against the deployed URL counts. a11y 100 / best-practices 100 / seo 91 were stable.
- `sharp` is available (bundled with Next) — used for image crops and for **rasterizing SVGs to visually inspect them** (that's how the map depiction was verified).
- Stray lockfile in `C:\Users\KIIT\` — `outputFileTracingRoot` is pinned in next.config.ts, leave it.

## Open items owed by Pragaman (don't nag; they gate content, not build)

1. Confirm the two test **intake emails arrived** in his inbox (last unchecked Phase 3 gate item).
2. **Disable Vercel Deployment Protection** (see Infra).
3. Eyes-on pass: flip feel, Bedrock drill animation, map depiction, reveals, reduced-motion, one keyboard-only intake run.
4. Audition the three placeholder sounds.
5. Content: W21 + W23 + Buddy scale numbers · W13a-2 · W15a · AEO fact-check (open item 7) · Takes keep/kill (OPEN-8) · **Section 2 (P2–P60)** — unlocks Graveyard/Rent-Free/FAQ + Save States lessons. **Patna question**: P1's partial answer mentions a Patna childhood; clarify vs the locked 4-city journey before Save States content ships.
6. Contrast rulings ack/veto (DECISIONS.md).
7. Content-Doc pass eventually replaces every `"draft": true` string (grep `"draft": true` + `PENDING` — launch gate).

## Where everything lives

Authority: `CLAUDE.md` (build spec) → `/docs` (PRD v0.2 §7 facts, Design Spec v1.1, Foundations). Rulings: `DECISIONS.md`. Types: `lib/content.ts`. Mode system: `lib/mode.tsx`. Sounds: `lib/sound.tsx`. KV: `lib/kv.ts` (dev in-memory fallback without creds). Map data: `lib/india.ts`. Lock logic: `lib/know.ts`. All copy: `/content` (draft/pending flags). Dev-only token page: `/dev/tokens`.
