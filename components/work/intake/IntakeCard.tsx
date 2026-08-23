import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { cn } from "@/lib/cn";
import type { IntakeContent } from "@/lib/content";

/**
 * §10 container — the Intake card shell: header, step dots, `01 / 05`
 * counter (D-5). The live 5-step flow + KV counters land in Phase 3;
 * until then the shell renders honestly with a Pending inside.
 */
export function IntakeCard({ content }: { content: IntakeContent }) {
  const stepCount = content.steps.length;

  return (
    <div className="w-full max-w-[560px] rounded-card border border-line bg-surface p-6 shadow-m md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="type-display-m text-ink">{content.header.title.text}</h3>
          <p className="type-body mt-2 text-muted">{content.header.sub.text}</p>
        </div>
        <MonoLabel bold className="whitespace-nowrap pt-2">
          01 / {String(stepCount).padStart(2, "0")}
        </MonoLabel>
      </div>

      <div className="mt-5 flex items-center gap-2" aria-hidden>
        {Array.from({ length: stepCount }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-pill transition-colors duration-200",
              i === 0 ? "w-6 bg-accent" : "w-1.5 bg-line",
            )}
          />
        ))}
      </div>

      <div className="mt-6">
        <Pending
          id="PHASE-3.intake-flow"
          note="The 5-step mini-PRD flow (validation, KV, Resend, success state + sound) goes live in Phase 3."
        />
      </div>
    </div>
  );
}
