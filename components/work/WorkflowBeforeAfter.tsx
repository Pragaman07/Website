import { MonoLabel } from "@/components/ui/MonoLabel";
import type { CaseMeta } from "@/lib/content";

/**
 * §7.2 — the before/after workflow graphic. BEFORE: a tangle of sheet
 * icons, chat + mail glyphs joined by crossing dashed lines. AFTER: one
 * platform block, straight lines. Static SVG, ink + coral only; the SVGs
 * are decorative (aria-hidden) — the captions carry the meaning.
 */
export function WorkflowBeforeAfter({
  content,
}: {
  content: NonNullable<CaseMeta["beforeAfter"]>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <figure className="rounded-card border border-line bg-surface p-6">
        <MonoLabel bold className="block">
          BEFORE
        </MonoLabel>
        <BeforeSvg />
        <figcaption className="type-body-s mt-3 text-muted">
          {content.beforeCaption.text}
        </figcaption>
      </figure>
      <figure className="rounded-card border border-line bg-surface p-6">
        <MonoLabel bold className="block">
          AFTER
        </MonoLabel>
        <AfterSvg />
        <figcaption className="type-body-s mt-3 text-muted">
          {content.afterCaption.text}
        </figcaption>
      </figure>
    </div>
  );
}

/* A small spreadsheet icon: bordered rect with row lines. */
function Sheet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="22" height="26" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
      {[6, 11, 16, 21].map((ly) => (
        <line key={ly} x1="4" y1={ly} x2="18" y2={ly} stroke="var(--ink)" strokeWidth="1" opacity="0.45" />
      ))}
    </g>
  );
}

function BeforeSvg() {
  // 7 department sheets + 1 master, chat + mail, everything cross-wired.
  const sheets = [
    [16, 16], [104, 8], [196, 18], [246, 52],
    [18, 96], [110, 120], [232, 116],
  ] as const;
  const master: [number, number] = [128, 58];
  const centers = sheets.map(([x, y]) => [x + 11, y + 13] as const);
  const masterC = [master[0] + 15, master[1] + 17] as const;

  return (
    <svg aria-hidden viewBox="0 0 290 170" className="mt-4 h-auto w-full" fill="none">
      {/* crossing dashed chaos: each sheet wired to the master AND two neighbors */}
      {centers.map(([cx, cy], i) => {
        const [nx, ny] = centers[(i + 2) % centers.length];
        return (
          <g key={i} stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.7">
            <line x1={cx} y1={cy} x2={masterC[0]} y2={masterC[1]} />
            <line x1={cx} y1={cy} x2={nx} y2={ny} />
          </g>
        );
      })}
      {sheets.map(([x, y], i) => (
        <Sheet key={i} x={x} y={y} />
      ))}
      {/* the master sheet — slightly bigger, same ink */}
      <g transform={`translate(${master[0]} ${master[1]})`}>
        <rect width="30" height="34" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
        {[8, 14, 20, 26].map((ly) => (
          <line key={ly} x1="5" y1={ly} x2="25" y2={ly} stroke="var(--ink)" strokeWidth="1" opacity="0.55" />
        ))}
      </g>
      {/* chat bubble */}
      <g transform="translate(52 132)">
        <rect width="26" height="18" rx="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
        <path d="M6 18 L4 25 L12 18" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" strokeLinejoin="round" />
      </g>
      {/* envelope */}
      <g transform="translate(180 134)">
        <rect width="28" height="19" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
        <path d="M1 2 L14 11 L27 2" stroke="var(--ink)" strokeWidth="1.25" fill="none" />
      </g>
      <line x1="65" y1="132" x2="121" y2="84" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
      <line x1="194" y1="134" x2="152" y2="90" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
    </svg>
  );
}

function AfterSvg() {
  // One platform block; straight, calm lines from every node.
  const nodes = [
    [24, 24], [24, 76], [24, 128],
    [254, 24], [254, 76], [254, 128],
  ] as const;

  return (
    <svg aria-hidden viewBox="0 0 290 170" className="mt-4 h-auto w-full" fill="none">
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <line
            x1={x + (x < 145 ? 12 : -12)}
            y1={y}
            x2={145 + (x < 145 ? -42 : 42)}
            y2={85}
            stroke="var(--ink)"
            strokeWidth="1.25"
          />
          <rect x={x - 10} y={y - 10} width="20" height="20" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
        </g>
      ))}
      {/* the platform — the one coral element */}
      <g transform="translate(103 55)">
        <rect width="84" height="60" rx="8" fill="var(--accent)" />
        {[14, 26, 38].map((ly) => (
          <rect key={ly} x="12" y={ly} width={ly === 14 ? 60 : ly === 26 ? 44 : 52} height="6" rx="3" fill="var(--surface)" opacity="0.85" />
        ))}
      </g>
    </svg>
  );
}
