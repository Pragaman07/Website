# pragaman.com

Pragaman Kumar Anurag's two-mode personal site. **Work mode** (receipts-first case studies) · **Know Me mode** (playful, game-flavored). Built with Claude Code from the specs in [`/docs`](docs/) per [CLAUDE.md](CLAUDE.md).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 (CSS-first tokens) · deployed on Vercel.

## Run it

```bash
npm install
npm run dev
```

- `npm run typecheck` — strict TS, no `any`.
- Token test page (dev only): `http://localhost:3000/dev/tokens` — flips both modes, shows every token + primitive.

## Content rules (non-negotiable)

- **Every word lives in `/content`** — zero user-facing strings in components. `"draft": true` marks spec-draft copy awaiting the Content Doc pass; `"pending": "<ref>"` renders the `<Pending />` placeholder.
- **Every number comes from `content/facts.json`** — the machine-readable mirror of PRD v0.2 §7. Each entry carries its `source`. If a number isn't there, it doesn't render — ask Pragaman, never approximate.
- Post-freeze rulings live in [DECISIONS.md](DECISIONS.md). `/docs` is never edited.
- `NEXT_PUBLIC_SHOW_PENDING=true` shows placeholders on deployed builds (set on Vercel **Preview** only, never Production).

## Env vars (`.env.local`, see `.env.example`)

| Var | What |
|---|---|
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis (Vercel Marketplace integration; `UPSTASH_REDIS_REST_*` names also accepted) — counters, intake storage, rate limiting |
| `RESEND_API_KEY` | Intake email delivery (sandbox delivers only to the Resend signup email until a domain is verified) |
| `INTAKE_TO_EMAIL` | Where pitches land |
| `ADMIN_KEY` | `x-admin-key` header for the admin counter route |

Dev without KV credentials uses an in-memory store (flow fully testable, resets on restart); production without them returns 503 from the intake/counter routes.

### Updating the replied counter (after answering pitches)

```bash
curl -X POST https://<your-domain>/api/admin/counters -H "content-type: application/json" -H "x-admin-key: $ADMIN_KEY" -d '{"replied": 5}'
```

Pitches are also stored in KV as `intake:{ulid}` — the email includes each record's key.

## Map

India map: [`@svg-maps/india`](https://www.npmjs.com/package/@svg-maps/india), **CC BY 4.0** (credited on the Save States page). Depiction per Pragaman's ruling (DECISIONS.md): the whole of Jammu & Kashmir renders as part of India — the map's single undivided J&K path.

## Fonts

Bricolage Grotesque / Geist Mono / Caveat / Black Ops One via `next/font/google`; **Satoshi** self-hosted in `public/fonts/satoshi/` (Fontshare — license: `FFL.txt` in the same folder). Numbers: display-scale stats wear Bricolage, tabular data and labels wear Geist Mono (`DECISIONS.md`, 3 Sep 2026 — Space Mono retired).

## Night mode

The site follows the OS colour scheme and the sun/moon button (header, nav panel on mobile, footer) overrides it — the choice persists in `localStorage("pragaman-theme")`. Both modes have a dark palette; the tokens live in `styles/globals.css` under `[data-theme="dark"]`. There is no sound on a theme change.

## Editing the site (Pragaman's guide — no code needed)

Everything you'd want to change lives in `/content`. Edit → commit → push → Vercel deploys.

- **Words**: every string sits in a JSON file under `content/`. Strings marked `"draft": true` are working copy awaiting your final wording — edit the `"text"`, delete the `"draft"` flag when it's final. Strings with `"pending": "REF"` are waiting on your answers (the REF matches the questionnaire/PRD ids) — replace the whole object with `{ "text": "your words" }`.
- **Numbers**: only ever in `content/facts.json`. Change a number there and every table, strip, and stat updates. Never put numbers anywhere else.
- **Unlocking Know Me sections**: add items to `content/know/graveyard.json` (`items: [{ name, born, died, epitaph, causeOfDeath }]`), `rent-free.json`, or `faq.json` (`items: [{ q, a }]`) — the hub tile unlocks and the page goes live automatically. Save States lessons: fill `levelName`/`lesson` in `save-states.json`.
- **Changelog entries**: add a file in `content/changelog/` like `my-entry.mdx` with frontmatter — `title`, `date: "2026-09-01"`, `tags: [work|life|both]`, `version: v22.9`, `added:/patched:/bugs:` lists.
- **Photos**: replace `public/images/prag.png` (square) or the memojis, then run `node scripts/prepare-images.mjs` to refresh the toggle faces.
- **Sounds**: drop a replacement file over any `public/sounds/*.wav` (same name). Log its source in `public/sounds/LICENSES.md`.
- **Counters** (after replying to pitches): see the curl below. Pitches live in your inbox and in KV as `intake:{id}` (the id is in each email).
- **Try the midnight egg**: on localhost, add `?fakeHour=2` to /work or /know-me.

## Build phases

0 ✅ Scaffold & tokens · 1 ✅ Shell & toggle · 2 Work mode · 3 Intake live · 4 Know Me · 5 Changelog + eggs · 6 Polish & launch. Gates in CLAUDE.md; the domain attaches only when the launch checklist is green.

Phase 1 notes: the flip sound (`public/sounds/flip.wav`) is a synthesized placeholder (see `public/sounds/LICENSES.md`) — audition it and replace the file to taste, same name, no code changes. Toggle faces are placeholder SVGs until the real headshot + memoji arrive.
