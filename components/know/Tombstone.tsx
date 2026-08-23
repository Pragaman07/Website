import type { ReactNode } from "react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";

/**
 * §11.2 tombstone: rounded-top silhouette card. Hover settles it upright
 * and a tiny flower sprouts at the base (reduced motion: it just appears).
 * Also serves egg 3's 404 plot later — the one Know Me component allowed
 * to appear in Work dress.
 */
export function Tombstone({
  name,
  born,
  died,
  epitaph,
  causeOfDeath,
  rotate = 0,
  children,
}: {
  name?: string;
  born?: string;
  died?: string;
  epitaph?: string;
  causeOfDeath?: string;
  rotate?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative border border-line bg-surface px-6 pb-10 pt-10 text-center",
        "rounded-t-[110px] rounded-b-card",
        "transition-transform duration-200 ease-out hover:rotate-0 motion-reduce:transition-none",
        rotate === 1 && "rotate-1",
        rotate === -1 && "-rotate-1",
      )}
    >
      <span aria-hidden className="text-2xl">
        🪦
      </span>
      {name && <p className="type-display-s mt-3 text-ink">{name}</p>}
      {(born || died) && (
        <MonoLabel className="mt-1 block">
          b. {born} — d. {died}
        </MonoLabel>
      )}
      {epitaph && <p className="type-body mt-3 italic text-muted">{epitaph}</p>}
      {causeOfDeath && (
        <p className="mt-3">
          <MonoLabel bold>CAUSE OF DEATH:</MonoLabel>{" "}
          <span className="type-body-s text-ink">{causeOfDeath}</span>
        </p>
      )}
      {children}
      {/* the flower — sprouts at the base on hover (300ms spring) */}
      <span
        aria-hidden
        className="absolute -bottom-1 left-1/2 origin-bottom -translate-x-1/2 scale-0 transition-transform duration-300 group-hover:scale-100 motion-reduce:transition-none"
        style={{ transitionTimingFunction: "var(--spring)" }}
      >
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
          <path d="M9 23 V12" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 16 C6 15 4 13 4 11" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="9" cy="8" r="3" fill="var(--sun)" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle
              key={a}
              cx={9 + 5.2 * Math.cos((a * Math.PI) / 180)}
              cy={8 + 5.2 * Math.sin((a * Math.PI) / 180)}
              r="2.4"
              fill="var(--accent)"
            />
          ))}
        </svg>
      </span>
    </div>
  );
}
