import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import type { SaveStatesContent } from "@/lib/content";

/**
 * §11.4 checkpoint card, game-save styling: SAVE SLOT header, LEVEL line,
 * "what this level taught me", purple pixel-corner decoration.
 */
export function SaveSlotCard({
  checkpoint,
}: {
  checkpoint: SaveStatesContent["checkpoints"][number];
}) {
  return (
    <div className="relative h-full rounded-card border border-line bg-surface p-6">
      {/* pixel corner */}
      <span aria-hidden className="absolute right-3 top-3 grid grid-cols-2 gap-0.5">
        {[0.9, 0.5, 0.35, 0.7].map((opacity, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5"
            style={{ background: "var(--purple)", opacity }}
          />
        ))}
      </span>

      <MonoLabel bold className="block pr-8">
        SAVE SLOT {checkpoint.slot} — {checkpoint.city.toUpperCase()}
      </MonoLabel>
      <MonoLabel className="mt-1 block">{checkpoint.state.toUpperCase()}</MonoLabel>

      <div className="mt-4 flex flex-col gap-3">
        {checkpoint.levelName.text ? (
          <p className="type-body text-ink">
            <MonoLabel bold>LEVEL:</MonoLabel> {checkpoint.levelName.text}
          </p>
        ) : checkpoint.levelName.pending ? (
          <Pending id={checkpoint.levelName.pending} note={checkpoint.levelName.note} />
        ) : null}

        {checkpoint.lesson.text ? (
          <p className="type-body text-ink">{checkpoint.lesson.text}</p>
        ) : checkpoint.lesson.pending ? (
          <Pending
            id={checkpoint.lesson.pending}
            note={`What the ${checkpoint.city} level taught him — P1.`}
          />
        ) : null}
      </div>
    </div>
  );
}
