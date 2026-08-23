# PRAGAMAN.COM — FULL PROJECT HANDOFF & CONTINUATION KIT
*Created 19 Aug 2026 · Purpose: upload this to a new chat and resume exactly where we left off. This document is self-sufficient, but also upload (if available): `pragaman-site-prd-v0.1.md`, `pragaman-design-foundations-v1.md`, the Filing Buddy 1-Year Report PDF, and `The_Pragaman_Files_Questionnaire.md`.*

---

## 0. INSTRUCTIONS FOR THE NEXT SESSION (read first)

**Who you're working with:** Pragaman Kumar Anurag — 22, Technical Marketing Manager at Noboru World (Pune), B.Tech from KIIT (Apr 2026), transitioning toward AI-native / growth / founding-PM roles. Job applications are starting now (late Aug / early Sep 2026), so timeline matters.

**What we're building:** His personal website — a two-mode site: **Work mode** (founders/recruiters; receipts-first case studies) and **Know Me mode** (playful, personal, easter-egg-rich). Planned collaboratively in chat; **built by Pragaman via Claude Code** from documents we produce together.

**The collaboration style (maintain this):** PM-to-PM. Direct, honest pushback is welcomed and has been valuable (e.g., correcting his "20X" claim against audited data, vetoing Black Ops One as site font). He answers questionnaires messily; Claude turns answers into structure and copy. Claude proposes with a clear recommendation + alternatives; he picks fast. Numbered questions (W#, P#, S#, F#, D#) keep everything referenceable.

**Current phase:** Structure ✅ · Design foundations ✅ · PRD v0.1 ✅ (skeleton with audited data) · **Waiting on case-study narratives (W13–W28) — that's the immediate next input.**

**Immediate next actions when session resumes:**
1. Collect W13–W28 answers (three case-study narratives) → fold into PRD v0.2
2. Propose fresh, more interesting method-name candidates (previous three didn't land — see §7)
3. Close the five quick calls in §8
4. Then produce, in order: **Design Spec → Content Doc (every word on the site) → Build Spec / CLAUDE.md** for Claude Code

**The pipeline (agreed):** PRD → Design spec → Content doc → Build spec (CLAUDE.md) → Pragaman builds in Claude Code → photos uploaded → placeholder swap → buy pragaman.com → launch. Launch is held until BOTH modes are ready (his call), but scope-boxed: "ready" ≠ "complete" — post-launch queue exists.

---

## 1. LOCKED DECISIONS — ARCHITECTURE

- **Landing:** full-screen "two doors" choice + one witty framing line.
- **Mode state:** global; chosen at door; persistent toggle to flip anywhere; remembered across visits; deep-linkable (URL can open a specific mode).
- **Mode transition:** a *temperature shift* — warm-white → cream, accent palette expands. Animated, felt, not instant.
- **The toggle** contains his memoji (headshot in Work → memoji in Know Me). Memoji is permanent even after real photos arrive.
- **Sound:** ON by default, subtle (Josh Comeau calibration), visible mute toggle. Library: **`use-sound`**. Moments: toggle flip, easter-egg discoveries, Intake submit. Never on scroll.
- **No job-hunt signals anywhere.** Evergreen site. No "open to work" banner. The contact section carries the invitation ("Building something interesting? Tell me about it").
- **Stack:** Next.js + Tailwind + Vercel (the Sapiens stack, which his company then adopted). Vercel subdomain now; **pragaman.com purchased after the site is complete**. Email: personal Gmail now → hello@pragaman.com after domain.
- **Photos:** he will upload later (post-PRD). Until then: placeholders + memoji. Real photos only — no AI-generated imagery. Playful doodle treatment on photos approved for Know Me.
- **North-star reference:** joshwcomeau.com (clean + warm + delightful). Also referenced: lannino.com, brittanychiang.com (Work restraint), lynnandtonic.com, cassie.codes (Know Me spirit).

## 2. LOCKED — WORK MODE STRUCTURE

1. **Hero** — one-line identity + sub-line + proof strip (Space Mono, audited numbers only — see §5).
   - Hero line candidate (from his own words): *"I solve problems. I save time. I make brands famous."* (three beats, coral on the third). Final wording decided in content doc.
2. **Case studies ×3** — Filing Buddy (growth), Buddy Software (SaaS build), Sapiens.club (solo build). Template: **one page, two reading speeds** — 30-second layer on top (one-line problem → 3 big moves → results strip), "The full story" below (narrative, doubt period, the turn). Same template across all three.
3. **How I Work** — the differentiation page: his named method (name pending) rendered as a diagram; the 3–4× automation rule; the prospect engine example; honest edges; AI tool split (provisional).
4. **Contact** — email + Google Calendar booking link + **The Intake** (see §4).
5. **The Changelog** (work view) — see §4.
- Post-launch queue: **Takes page** (only if W29–W33 answers pass the screenshot test — would a founder screenshot this and send it to someone?), **"How this site was built" meta case study** (approved, add after launch). For v1, 3–4 takes get woven into case studies + How I Work as pull-quotes.

## 3. LOCKED — KNOW ME MODE STRUCTURE

1. **Playful hero** — real photo + doodles (Caveat annotations).
2. **The Graveyard 🪦** — anchor section; his abandoned projects/ideas (needs P9–P12). *Open item: Black Ops One font as a one-off stencil "costume" for the Graveyard title only — a military-crate joke. Banned everywhere else (vetoed as site font; verdict accepted).*
3. **Life in Numbers** — parody metrics dashboard of his life (chai YTD, km from Samastipur, tabs open, streaks). Space Mono everywhere.
4. **Save States** — **India map**: every state he's traveled to = unlocked save slot; unvisited = greyed "undiscovered areas." The four home cities (Samastipur → Ranchi → Bhubaneswar → Pune) are special *checkpoint saves* with "what this level taught me" write-ups. Living section — updates with future trips.
5. **Rent-Free** — grid of memes/songs/quotes permanently living in his head.
6. **FAQ Nobody Asked** — self-interview with escalating absurdity.
7. **The Changelog** (personal view) — same posts, release-note dress.
- Cut/parked: User Reviews, Supreme Court of Pragaman, Desk Annotated, Guestbook (guestbook = post-launch maybe).
- Rule: if any section's raw material comes back thin, it drops to post-launch rather than shipping weak.

## 4. LOCKED — SIGNATURE FEATURES

**The Intake (pitch box):** stepwise form that demos his method — *What's broken? → Who does it hurt most? → What have you tried?* → **severity dropdown**: *Mild itch / Recurring nightmare / Existential threat / I've already cried* → email field → submit message: *"Congratulations — you just wrote a mini-PRD. Personal reply within 48 hours."* Public counter: `Problems pitched: N · Replies sent: N`. The 48h SLA is a real promise he keeps. Phase 2: paper-note fold submit animation + thunk sound. v1 = simple form → his email.

**The Changelog (blog):** one content collection, two costumes. Posts tagged `work` / `life` / `both`; each mode filters and wraps in its own design shell. Personal view renders as release notes: *"v22.8 — moved to Pune. Patched: homesickness. Known bugs: sleep schedule."* Name chosen over The Backlog and Ship Log.

**Easter eggs — ALL TEN APPROVED (his explicit call: include all).** Build order protects launch: 1–7 in v1, 8–10 sequenced last / post-launch.
1. Toggle identity crisis — 8–10 fast flips → fake crash: `ERROR: identity_crisis.exe — he's both, okay?` → recovers with sound
2. DevTools console greeting — ASCII art + "Found a bug? Free coffee chat → [email]"
3. 404 page as an official Graveyard plot ("buried before launch; cause of death: scope cut")
4. Chai counter in Life in Numbers — click to increment globally, sip sound
5. Locked save slots — clicking grey state: "DLC not yet purchased (trip pending)"
6. Changelog bottom: `v0.0.1 — born in Samastipur. Initial commit.`
7. After-midnight visit → Know Me hero swaps to "You're up late. Same."
8. Living memoji (idle sleep, scroll startle, click annoyance) — *build last*
9. Doodle pen — hold cursor 3s in Know Me → draw on the page (clears on refresh) — *build last*
10. Konami code → all photos sprout doodles — *build last*

## 5. AUDITED NUMBERS — FILING BUDDY (source: FB 1-Year Report PDF, GSC + GA4)

**Framing device (use it):** the "before" window is *the year before he joined*; the "after" window is *exactly his internship year*. "The year before me vs. my first year." All of it done **as an intern**.

| Metric | Before (Jul '24–Jun '25) | After (Jul '25–Jul '26) | Change |
|---|---|---|---|
| GSC Impressions | 1.5M | 8.82M | +488% (~×5.9) |
| Organic clicks | 2,500 | 18.8K | +652% (×7.5) |
| Avg position | 45 | 13.6 | +31.4 positions |
| Top-10 keywords | 128 | 700+ | +446% |
| GA4 organic traffic | — | — | +187.6% |
| Organic share | 38.7% | 74.8% | traffic inversion |
| Paid share | 61.3% | 25.2% | −36.1 pts |
| New users | ~60K | 110K+ | +84.6% |
| Avg engagement time | 71s | 130s | +83.1% |
| AI Overview impressions | 0 | **213K** (since May '26) | AEO proof |
| LinkedIn followers | 90 | 2,600 | +2,510; #2 in new-follower growth vs competitors (beat IndiaFilings, Startupwala; behind RegisterKaro) |
| Instagram (Oct '25–Aug '26) | — | 458K views · 562K reach · 2,037 follows | organic |

- **Benchmark block:** outperformed 2026 B2B service-industry standards on **8 of 9 KPIs** (only organic engagement rate on-par: 51.95% vs 52.43%). Show this table in the case study — beating benchmarks > raw numbers.
- **Quality beat:** traffic scaled AND engagement time +83% — growth without dilution. Pre-answers "was it junk traffic?"
- **Hero proof strip (locked, audited):** `ORGANIC CLICKS ×7.5` · `AVG POSITION 45 → 13.6` · `ORGANIC SHARE 39% → 75%`. The 213K AI Overviews stat anchors the AEO section of the case study.
- ❌ **"20X traffic" is RETIRED** — unsupported by the audit. Never use. (He hasn't formally confirmed retirement — quick call #4 in §8 — but data says it's dead unless he scopes a specific measure it referred to.)
- **No NDA — clients can be named publicly**, real dashboards/screenshots can be shown, report PDF can be embedded as a downloadable receipt.

## 6. FACTS REGISTRY

- Full name: Pragaman Kumar Anurag · 22 · based in Pune (moved alone for work)
- Journey: **Samastipur → Ranchi → Bhubaneswar → Pune**
- B.Tech, KIIT Bhubaneswar, completed April 2026
- Noboru World: internship **1 Jul 2025** → full-time **1 Jul 2026** → current title **Technical Marketing Manager**; manages 3 team members; was managing people/interns before graduating
- Sapiens.club: built solo; **app complete, in UAT; website live; his chosen stack (Next.js/Tailwind/Vercel) adopted by the company for other client sites** — flagship proof point
- Old portfolio: portfolio-pragamans-projects.vercel.app — stays live until new site launches; new site is a **fresh start** (nothing salvaged)
- **Off-limits: family details (S7).** Girlfriend detail in the origin story is **approved to keep** (F4): they planned the cloud-kitchen pitch together overnight
- New Zealand is on his bucket list (from questionnaire notes; reason pending P33)

## 7. RAW MATERIAL BANK — his answers so far (Section 1 A/B + F + S)

*Preserve his voice; these become website copy. Quotes marked are near-verbatim.*

- **W1 (why product):** loves imagining, planning, questioning every choice, identifying problems, improving details. "I am more into imagination than technicality… I really like thinking and imagining." Can learn the technical, but can't be the guy who codes for 10 days straight. Loves converting requirements into technical terms, deciding paths, describing features.
- **W2 (identity):** not chasing the PM title — chasing purpose. "I'm not just looking for a PM role, that's the least of my concern… a sense of purpose far more than just delivering products." Work should feel like fun problems. **Confirmed positioning (F7): "I care about what I build, not what it's called."**
- **W3 (origin scene — approved to publish):** first-ever job process, unprepared, after 6th semester. Mid-PPT he ended up *in control of the meeting*, handling latecomers' doubts — the confidence moment. Interview assignment: a business plan — his idea: **cloud kitchen delivering healthy, homely food to elderly parents living without their children in metro cities**. Planned it all night with his girlfriend, built the deck, "presented like an MBA student, thinking about all possible situations" → selected. Range learned at Noboru since: client handling, brand strategy, real decisions, software builds, vendor management, website feature design, marketing & sales funnels, PR interviews, social media, video shoots, technical SEO, PRDs, design-to-deploy websites.
- **W4:** knew nothing about PM before the job; everything new; enjoying all of it.
- **W5 (Indore scene — Buddy Software anchor):** first month as intern, sent alone to the client's Indore office. One week interviewing **GST, Taxation, Accounting, Finance, Compliance, Sales directors** — requirements → full PRD → coordinated the dev team → co-designed UI/UX → ran ops↔dev alignment on logic and data flow. Some days of disagreement; felt dev team wasn't as committed as he was. "It was so fun."
- **W6 (the method — needs a name):** "Identify all possible questions → group them → imagine the flow → answer every question one by one, from the most technical to the most basic — so nothing is left and the base is very strong."
- **W7 (rigor):** perfectionist, disciplined; completes allotted tasks without excuses; goes cold at procrastination; finishing what's assigned is sacred.
- **W8 (honest weakness):** low patience when someone repeats the same mistake instead of accepting and fixing it; working on articulation in those moments and on handling people better.
- **W9 (AI philosophy):** **"If I do something 3–4 times, I build a system for it."** Identifies the pattern, encodes the learnings, cuts turnaround time. Live example: **the prospect engine** — self-built lead-finder that qualifies companies by set conditions and populates his outreach list (email/call); next step: automating the personalized first contact.
- **W10 (what teammates would say):** obsessive about things · finishes before deadline · comes up with solutions very fast · spots mistakes very fast · can be very cold when unhappy.
- **W11 (stakeholder conflict story):** client called his team's content "unprofessional and unacceptable" in a group chat, without knowing the process. He first explained the full research/writing process, then told the client plainly they were wrong and shouldn't use those words. Protects his team; honest even when confronting; actively working on listening without interrupting.
- **W12 (workday):** chaotic small-company reality — planned days get rewritten by CEO asks, client meetings, shoots, absences, resignations (he fills the gap until someone's hired). His metaphor: "like a mom running a house — handling multiple responsibilities, adjusting constantly."
- **F5 (provisional, revisit):** the method/AI gives him an "organized, directed, pointed — not vague" mindset for research and discussion. *The actual tool split (Claude vs Claude Code vs Cursor vs v0) is still owed.*
- **F6 (wedding test / hero material):** "I solve problems and I save time. I make people and brands famous."
- **S-answers:** S1: Josh Comeau = reference (+ approved Direction-1 screenshot). S2: photos later, placeholders+memoji now. S3/S4/S8: settled by decisions above. S6: **Know Me exit feeling (confirmed): "met someone interesting," remembers 1–2 things, laughed at least once.** Work-mode exit feeling draft — *"This person ships, and the numbers are real. I should talk to him"* — awaiting his confirm. S7: family off-limits. S9: Vercel now, pragaman.com after completion.
- **Method name:** rejected as not interesting enough: *The Sawaal Method, Question Zero, The Question Cascade*. Next session: propose fresh candidates with more spark. Unpicked seeds to build on: The Why-Stack · Zero-Assumption Sweep · Question Storm · The Hundred-Questions Rule.

## 8. OPEN ITEMS (the exact to-do list)

| # | Item | Owner | Status |
|---|---|---|---|
| 1 | **W13–W28 — three case-study narratives** | Pragaman | next input, biggest unlock |
| 2 | Method name — fresh candidates, then pick | Claude proposes → Pragaman picks | open |
| 3 | Work-mode exit feeling — confirm §7 draft | Pragaman | open |
| 4 | Confirm "20X" retirement (or scope precisely) | Pragaman | open |
| 5 | Tool split (Claude/Claude Code/Cursor/v0), one line each | Pragaman | provisional |
| 6 | W29–W40 (takes, dream role, receipts) | Pragaman | anytime |
| 7 | Section 2 — Personal (feeds all Know Me content) | Pragaman | before Know Me content doc |
| 8 | Photos upload | Pragaman | post-PRD |
| 9 | PRD v0.2 (fold in case studies) | Claude | after #1 |
| 10 | Design Spec (layouts, motion, easter-egg specs, Intake flow) | Claude | after #1–2 |
| 11 | Content Doc (every word on the site) | Claude | after questionnaire |
| 12 | Build Spec / CLAUDE.md for Claude Code | Claude | last document |

## 9. FILES PRODUCED THIS SESSION (keep these)

1. `pragaman-design-specimen.html` — v1 specimen (navy/gold — superseded)
2. `pragaman-design-specimen-v2.html` — font face-off + 3 palette directions (decisions made from this)
3. `pragaman-design-foundations-v1.md` — **LOCKED design system** (fonts, tokens, rules, sound, references)
4. `pragaman-site-prd-v0.1.md` — PRD skeleton with audited data and gaps marked
5. `pragaman-project-handoff.md` — this document

**Design foundations summary (in case the file is lost):** Headings **Bricolage Grotesque** 700/800 (Google) · Body **Satoshi** 400/500/700 (Fontshare) · Numbers **Space Mono** 400/700 (Google) — every stat/version/label, no exceptions · Doodles **Caveat** 500/700 (Google), Know-Me-only. **Palette = Direction 1, "The Coral Thread":** Work mode: bg `#FAFAF7`, surface `#FFFFFF`, ink `#16181D`, muted `#6B7280`, line `#ECEAE4`, **coral `#FF6B5E`** (THE only Work-mode accent; hover/deep `#E85546`). Know Me: bg cream `#FFF4E4`, card `#FFFDF9`, same ink, coral leads + teal `#2EC4B6`, purple `#7C5CFF`, sun `#FFC94D`. Hard rules: Work mode has exactly one accent (coral); coral never sets body text; Caveat never in Work mode; navy/gold retired; toggle = animated temperature shift.

## 10. READY-TO-PASTE FIRST MESSAGE FOR THE NEW CHAT

> "I'm continuing my personal-website project (pragaman.com). The attached handoff doc contains the full context — locked decisions, design system, audited numbers, my raw answers, and the open-items list. Read it, don't re-ask settled questions, and pick up at Open Item #1: here are my W13–W28 answers…"

*(Then paste the case-study answers, and attach this handoff + the PRD + design foundations + the FB report if you have them.)*
