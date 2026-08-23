# Pragaman.com — Site PRD v0.1
*Drafted 19 Aug 2026 · Owner: Pragaman · Status: skeleton with audited data; case-study narratives pending (W13–W28)*

---

## 1. What this is

A personal website with two modes behind one door: **Work mode** (for founders, hiring managers, recruiters) and **Know Me mode** (for everyone who should remember him). Built AI-native: planned here, built via Claude Code, itself a proof of method.

**Positioning (confirmed):** "I care about what I build, not what it's called." Purpose- and problem-driven, not title-driven.

**Hero line candidate (from the wedding test):** *"I solve problems. I save time. I make brands famous."*

## 2. Success criteria

- **Work mode exit feeling:** "This person ships, and the numbers are real. I should talk to him." *(Draft — Pragaman to confirm)*
- **Know Me exit feeling (confirmed):** "I met someone interesting." Visitor remembers 1–2 specific things and laughed at least once.
- **The conversion:** email · Google Calendar booking · The Intake (pitch box). No "hire me" banners anywhere — evergreen site.

## 3. Architecture (all locked)

- **Landing:** full-screen two doors + one witty framing line.
- **Mode state:** global; chosen at the door, flippable anywhere via persistent toggle; remembered across visits; deep-linkable (send founders straight into Work mode).
- **Mode transition:** temperature shift — warm-white → cream, accent set expands, animated and felt.
- **Sound:** on by default, subtle (`use-sound`), visible mute. Moments: toggle flip, easter egg discovery, Intake submit.
- **Design foundations:** see `pragaman-design-foundations-v1.md` (Bricolage Grotesque / Satoshi / Space Mono / Caveat · Coral Thread palette).
- **Stack (inherited from Sapiens, now company-standard):** Next.js + Tailwind + Vercel. Detailed in build spec later.

---

## 4. WORK MODE — pages & requirements

### 4.1 Hero
- One-line identity (candidate above) + sub-line + **proof strip** in Space Mono.
- **Proof strip — AUDITED NUMBERS ONLY (source: FB 1-Year Report, GSC/GA4):**
  - `ORGANIC CLICKS ×7.5` (2.5K → 18.8K)
  - `AVG POSITION 45 → 13.6`
  - `ORGANIC SHARE 39% → 75%`
- ❌ Retired claim: "20X traffic" — unsupported by audit. Do not use anywhere.

### 4.2 Case Study 1 — Filing Buddy (growth)
**Template: 30-second layer on top, full story below. Framing device: "The year before me vs. my first year" (before window = Jul '24–Jun '25, pre-Pragaman; after = his internship year). Emphasize: done as an intern.**

**Publishable, audited stats:**
| Metric | Before | After | Change |
|---|---|---|---|
| Impressions (GSC) | 1.5M | 8.82M | +488% |
| Organic clicks | 2,500 | 18.8K | +652% (×7.5) |
| Avg position | 45 | 13.6 | +31.4 |
| Top-10 keywords | 128 | 700+ | +446% |
| Organic traffic (GA4) | — | — | +187.6% |
| Organic share | 38.7% | 74.8% | inversion |
| Paid share | 61.3% | 25.2% | −36.1 pts |
| New users | ~60K | 110K+ | +84.6% |
| Avg engagement time | 71s | 130s | +83.1% |
| AI Overview impressions | 0 | 213K (since May '26) | AEO proof |
| LinkedIn followers | 90 | 2,600 | +2,510 |

- **Benchmark block:** outperformed 2026 B2B standards on 8 of 9 KPIs (include the comparison table — beating benchmarks reads stronger than raw numbers).
- **Quality-not-just-quantity beat:** traffic ~doubled AND engagement time rose 83% — growth without dilution.
- **Receipts:** report PDF downloadable/embedded (client permission: cleared, no NDA).
- 🔴 **PENDING (W13–W18):** strategy narrative, the flat-numbers doubt period, the day it turned, the AEO playbook story, client reaction quote.

### 4.3 Case Study 2 — Buddy Software (the SaaS build)
- **Anchor scene (from W5):** first month as intern, sent alone to client office in Indore; interviewed GST, Taxation, Accounting, Finance, Compliance, Sales stakeholders for a week; produced the PRD; then coordinated dev, co-designed UI/UX, ran ops↔dev logic and data-flow alignment through delivery.
- 🔴 **PENDING (W19–W23):** before-picture chaos, stakeholder stories, conflict resolution example, UAT lessons, client-portal pride points, scale numbers (users/departments).

### 4.4 Case Study 3 — Sapiens.club (the solo build)
- **Status facts:** app complete and in UAT; website live; **the stack he chose solo was adopted by the company for other client sites** — flagship proof point.
- 🔴 **PENDING (W24–W28):** origin story, worst technical wall, 2 AM shipping story, AI-development lessons, current vs dream state, any usage numbers.

### 4.5 How I Work (differentiation page)
- **The method** *(name pending: The Sawaal Method / Question Zero / The Question Cascade)*: generate every possible question → group them → imagine the flow → answer from most technical to most basic → nothing left unexamined, foundation strong. Rendered as a diagram, not a paragraph.
- **The 3–4× automation rule (verbatim philosophy):** "If I do something 3–4 times, I build a system for it." Live example: the prospect engine — self-built lead-finder that qualifies companies by condition and populates outreach lists; next step, automating personalized first contact.
- **Honest edges (framed as self-awareness, not sanded off):** obsessive about completion, finishes early, cold when standards slip, actively working on patience + listening without interrupting.
- **Range at Noboru (from W3):** client handling, brand strategy, software PRDs, UI/UX, vendor management, marketing & sales funnel, PR, social, video shoots, technical SEO, design-to-deploy websites; managing people and interns before graduating.
- 🔴 **PENDING (F5):** the actual tool split — Claude vs Claude Code vs Cursor vs v0, one line each.

### 4.6 Contact
- Email (personal now → hello@pragaman.com post-domain), Google Calendar booking link, and:
- **The Intake (locked concept):** stepwise mini-PRD form — *What's broken? → Who does it hurt most? → What have you tried?* → severity dropdown (*Mild itch / Recurring nightmare / Existential threat / I've already cried*) → email → submit → "You just wrote a mini-PRD. Personal reply within 48 hours."
- Counter: `Problems pitched: N · Replies sent: N` (the public SLA).
- Phase 2: paper-note fold submit animation + sound.

### 4.7 The Changelog (work view)
- Posts tagged `work` / `life` / `both`; Work mode shows work+both in clean editorial dress.

---

## 5. KNOW ME MODE — pages & requirements

*(All content pending Section 2 answers)*

1. **Playful hero** — real photo + doodles (photos arrive post-PRD; placeholders + memoji until then; memoji lives inside the toggle permanently).
2. **The Graveyard 🪦** — anchor. Needs P9–P12. *(Open: Black Ops One stencil costume for the title.)*
3. **Life in Numbers** — parody metrics dashboard, Space Mono everywhere. Needs P13–P20 + rapid-fire.
4. **Save States** — India map; visited states = unlocked save slots, grey = undiscovered. Four home cities (Samastipur → Ranchi → Bhubaneswar → Pune) are checkpoint saves with "what this level taught me." Needs P1 + travel list.
5. **Rent-Free** — grid of memes/songs/quotes living in his head. Needs P21, P24.
6. **FAQ Nobody Asked** — self-interview, escalating absurdity. Fed by all of Section 2.
7. **The Changelog (personal view)** — release-note dress: `v22.8 — moved to Pune. Patched: homesickness. Known bugs: sleep schedule.` Bottom easter egg: `v0.0.1 — born in Samastipur. Initial commit.`

## 6. Easter eggs (menu proposed; Pragaman picks 3–4 for v1)
1. Toggle identity-crisis fake error (8–10 fast flips)
2. DevTools console greeting
3. 404 page as a Graveyard plot
4. Chai counter click (+ sip sound, global count)
5. Locked save slots — "DLC not yet purchased (trip pending)"
6. Changelog v0.0.1 initial commit
7. After-midnight hero line swap
- Post-launch: living memoji · doodle pen · Konami doodle-burst

## 7. Facts registry (single source of truth)
- Internship: **1 Jul 2025** · Full-time: **1 Jul 2026** · Title: **Technical Marketing Manager**, Noboru World
- B.Tech, KIIT, completed Apr 2026 · Based in Pune
- Filing Buddy windows: before Jul '24–Jun '25 · after Jul '25–Jul '26 (= internship year)
- Sapiens: app in UAT, site live, stack adopted company-wide
- Origin scene approved for publication: cloud-kitchen pitch planned overnight with girlfriend, presented "like an MBA student" (F4: keep)
- **Off-limits: family details (S7). No "open to work" signals anywhere.**

## 8. Open items
| # | Item | Owner |
|---|---|---|
| 1 | W13–W28 — three case-study narratives | Pragaman (next batch) |
| 2 | F5 — actual tool split (Claude / Claude Code / Cursor / v0) | Pragaman |
| 3 | Method name — pick of 3 | Pragaman |
| 4 | Easter egg picks (3–4 for v1) | Pragaman |
| 5 | Work-mode exit feeling — confirm draft in §2 | Pragaman |
| 6 | "20X" — confirm retirement or scope precisely | Pragaman |
| 7 | Section 2 (Personal) + W29–W40 | Pragaman (anytime) |
| 8 | Photos upload | Pragaman (post-PRD) |
| 9 | Design spec (layouts, motion, easter eggs) | Claude — after items 1–4 |
| 10 | Content doc (every word) | Claude — after questionnaire |
| 11 | Build spec / CLAUDE.md | Claude — last |
