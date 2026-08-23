import factsFile from "@/content/facts.json";

/* ============================================================
   Content contracts (CLAUDE.md: schemas get TS types, no `any`)
   ============================================================ */

/** A user-facing string that is either final, a spec draft, or pending. */
export type CopyString = {
  text?: string;
  /** Greppable flag — draft copy from the design spec, replaced by the Content Doc pass. */
  draft?: boolean;
  /** Copy that is locked verbatim (e.g. Intake severity options). */
  locked?: boolean;
  /** Reference ID rendered by <Pending /> when the words don't exist yet. */
  pending?: string;
  note?: string;
};

/* ---------- facts.json — the ONLY source of numbers ---------- */

export type FactVerdict = "outperform" | "on-par";

export type Fact = {
  id: string;
  /** mono-label display label, where one is canonical. */
  label?: string;
  value?: string;
  before?: string;
  after?: string;
  change?: string;
  /** Rounded display forms where the PRD uses them (e.g. 39% → 75%). */
  display?: { before?: string; after?: string; value?: string; change?: string };
  /** Benchmark rows only. */
  standard?: string;
  verdict?: FactVerdict;
  /** D1/D2-style scoping that must render with the number. */
  scope?: string;
  note?: string;
  /** Open-item ref when the fact is not yet supplied. */
  pending?: string;
  source: string;
};

const facts = factsFile.facts as Fact[];
const factIndex = new Map(facts.map((f) => [f.id, f]));

/**
 * Fact lookup. Throws on unknown IDs — a component asking for a number
 * that isn't in the registry is a build error, not a runtime shrug.
 */
export function getFact(id: string): Fact {
  const fact = factIndex.get(id);
  if (!fact) {
    throw new Error(
      `Unknown fact id "${id}" — every number must exist in content/facts.json (PRD §7 mirror).`,
    );
  }
  return fact;
}

export function allFacts(): readonly Fact[] {
  return facts;
}

/* ---------- global.json ---------- */

export type NavLink = { label: string; href: string; draft?: boolean };

export type GlobalContent = {
  wordmark: CopyString;
  nav: { work: NavLink[]; know: NavLink[] };
  toggle: {
    workLabel: CopyString;
    knowLabel: CopyString;
    ariaToWork: CopyString;
    ariaToKnow: CopyString;
  };
  mute: { muteLabel: CopyString; unmuteLabel: CopyString };
  footer: {
    signoff: CopyString;
    email: CopyString;
    calendarUrl: CopyString;
    socials: CopyString;
    knowScribble: CopyString;
  };
};

/* ---------- door.json ---------- */

export type DoorContent = {
  framing: CopyString;
  work: { eyebrow: CopyString; title: CopyString; line: CopyString };
  know: { eyebrow: CopyString; title: CopyString; line: CopyString };
};

/* ---------- work/home.json ---------- */

export type StatRef = { factId: string; render: string };

export type WorkHomeContent = {
  hero: {
    eyebrow: CopyString;
    headline: CopyString & { accentPhrase?: string };
    subline: CopyString;
    midnightSubline: CopyString;
    ctaPrimary: CopyString;
    ctaSecondary: CopyString;
  };
  proofStrip: { note?: string; stats: StatRef[] };
  cases: {
    sectionEyebrow: CopyString;
    sectionTitle: CopyString;
    cards: Array<{
      slug: string;
      tag: string;
      title: string;
      hook: CopyString;
      heroStat: StatRef;
    }>;
  };
  methodTeaser: { line: CopyString; linkLabel: CopyString };
};

/* ---------- case-study meta.json ---------- */

export type Move = {
  n: string;
  name: string;
  line: CopyString & { factId?: string };
  note?: string;
};

export type CaseMeta = {
  slug: string;
  title: string;
  tags: string[];
  framing: CopyString & { factId?: string };
  problem?: CopyString;
  anchorScene?: CopyString;
  moves: Move[];
  resultsStrip: {
    sourceLine: string;
    stats: StatRef[];
    pending?: string;
  };
  inversionViz?: { beforeFactId: string; afterFactId: string; note?: string };
  beforeAfter?: { beforeCaption: CopyString; afterCaption: CopyString; note?: string };
  tables?: Record<
    string,
    { title: CopyString; factIds: string[]; footnote?: CopyString }
  >;
  benchmark?: { factIds: string[]; caption: CopyString };
  socialStrip?: { factIds: string[] };
  receipt?: {
    label: string;
    href?: string;
    size?: string;
    file?: CopyString;
    caption: CopyString;
  };
  pullQuotes?: {
    note?: string;
    quotes: Array<{ text: string; sourceRef: string; pendingKeepKill?: string }>;
  };
  linkOut?: { url: string; label: CopyString; screenshot: CopyString };
};

/* ---------- work/case-study.json (shared template copy, §7.0) ---------- */

export type CaseStudySharedContent = {
  breadcrumb: CopyString;
  divider: CopyString;
  intakeCta: CopyString;
  prevLabel: CopyString;
  nextLabel: CopyString;
  downloadLabel: CopyString;
};

/* ---------- work/method.json ---------- */

export type MethodContent = {
  hero: { eyebrow: CopyString; title: { factId: string }; line: CopyString };
  diagram: {
    strata: Array<{ n: string; name: string; line: CopyString }>;
    payoff: CopyString;
    textAlternative: CopyString;
  };
  rule: {
    factId: string;
    exampleLabel: CopyString;
    exampleFactId: string;
    exampleNext: CopyString;
  };
  knownIssues: {
    header: CopyString;
    rows: Array<{ issue: string; status: string; draft?: boolean }>;
    note?: string;
  };
  range: { eyebrow: CopyString; factId: string; prose: CopyString };
  tools: { factId: string };
};

/* ---------- work/intake.json ---------- */

export type IntakeStep = {
  id: string;
  question: CopyString;
  kind: "textarea" | "severity" | "email";
  rows?: number;
  minChars?: number;
  allowEmpty?: boolean;
  emptyCta?: CopyString;
  placeholder?: CopyString;
  options?: Array<{ value: string; label: string; locked?: boolean }>;
  submitLabel?: CopyString;
};

export type IntakeContent = {
  header: { title: CopyString; sub: CopyString };
  steps: IntakeStep[];
  nav: { next: CopyString; back: CopyString };
  errors: Record<string, CopyString>;
  success: { title: CopyString; sub: CopyString };
  counter: { pitchedLabel: CopyString; repliedLabel: CopyString };
};

/* ---------- know/*.json ---------- */

export type KnowHubContent = {
  hero: {
    headline: CopyString;
    intro: CopyString;
    photo: CopyString;
    annotations: CopyString[];
    midnightAnnotation: CopyString;
  };
  levels: Array<{
    level: string;
    slug: string;
    glyph: string;
    title: string;
    tease: CopyString;
  }>;
  statusChips: { unlocked: CopyString; locked: CopyString };
  breadcrumb: CopyString;
};

export type GraveyardContent = {
  eyebrow: CopyString;
  subline: CopyString;
  items: Array<{
    name: string;
    born: string;
    died: string;
    epitaph: string;
    causeOfDeath: string;
  }>;
  pending?: string;
  note?: string;
};

export type NumbersContent = {
  eyebrow: CopyString;
  subline: CopyString;
  stats: Array<{
    metric: string;
    value: string;
    trend?: string;
    sticker?: "teal" | "purple" | "sun";
    footnote?: CopyString;
    sparkline?: boolean;
    factId?: string;
    pendingKeepKill?: string;
  }>;
  coffeeCounter: { label: CopyString; note?: string };
  pending?: string;
  note?: string;
};

export type SaveStatesContent = {
  eyebrow: CopyString;
  subline: CopyString;
  checkpoints: Array<{
    slot: string;
    city: string;
    state: string;
    levelName: CopyString;
    lesson: CopyString;
  }>;
  visitedStates: CopyString;
  dlcTooltip: CopyString;
};

export type RentFreeContent = {
  eyebrow: CopyString;
  subline: CopyString;
  items: Array<
    | { kind: "meme"; image: string; alt: string }
    | { kind: "song"; title: string; artist: string }
    | { kind: "quote"; text: string }
  >;
  pending?: string;
  note?: string;
};

export type FaqContent = {
  eyebrow: CopyString;
  subline: CopyString;
  items: Array<{ q: string; a: string; unhinged?: boolean }>;
  pending?: string;
  note?: string;
};

/**
 * Thin-section rule (§14): a Know Me section with no real content renders
 * as a LOCKED tile on the hub and its route 404s.
 */
export function isSectionLocked(section: { items?: unknown[]; stats?: unknown[] }): boolean {
  const list = section.items ?? section.stats ?? [];
  return list.length === 0;
}
