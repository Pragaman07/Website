import { MonoLabel } from "@/components/ui/MonoLabel";
import { SHOW_PENDING } from "@/lib/flags";

/**
 * The placeholder system (§14). Never invent copy, facts, numbers, names,
 * dates, or quotes — missing content renders this, with the reference ID.
 * Hidden in production; launch gates on zero PENDING in /content anyway.
 */
export function Pending({ id, note }: { id: string; note?: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <div className="rounded-card border border-dashed border-line bg-surface px-4 py-3">
      <MonoLabel bold accent>
        [PENDING: {id}]
      </MonoLabel>
      {note ? <p className="type-body-s mt-1 text-muted">{note}</p> : null}
    </div>
  );
}
