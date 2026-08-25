import Image from "next/image";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { cn } from "@/lib/cn";
import type { RentFreeContent } from "@/lib/content";

type Item = RentFreeContent["items"][number];

const ROTATIONS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"] as const;
const PIN_TOKENS = ["var(--teal)", "var(--purple)", "var(--sun)"] as const;

/**
 * §11.5 — one pinned card per thing living rent-free: meme → image card,
 * song → "ON REPEAT" + title/artist, quote → Caveat on a sun-tinted card.
 * Resting rotation ±2° with a sticker pin dot; hover straightens + lifts.
 */
export function RentFreeCard({ item, index }: { item: Item; index: number }) {
  return (
    <div
      className={cn(
        "relative break-inside-avoid rounded-card border border-line bg-surface p-6 pt-7 transition-[transform,box-shadow] duration-200 ease-out hover:rotate-0 hover:-translate-y-0.5 hover:shadow-hover motion-reduce:transition-none",
        ROTATIONS[index % ROTATIONS.length],
      )}
      style={
        item.kind === "quote"
          ? { background: "color-mix(in srgb, var(--sun) 20%, var(--surface))" }
          : undefined
      }
    >
      {/* pin dot */}
      <span
        aria-hidden
        className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-pill"
        style={{ background: PIN_TOKENS[index % PIN_TOKENS.length] }}
      />

      {item.kind === "meme" && (
        <Image
          src={item.image}
          alt={item.alt}
          width={480}
          height={480}
          className="w-full rounded-chip"
        />
      )}

      {item.kind === "song" && (
        <>
          <MonoLabel bold className="block">
            ON REPEAT
          </MonoLabel>
          <p className="type-display-s mt-2 text-ink">{item.title}</p>
          <p className="type-body-s mt-1 text-muted">{item.artist}</p>
        </>
      )}

      {item.kind === "quote" && (
        <p className="type-doodle-l text-ink">&ldquo;{item.text}&rdquo;</p>
      )}
    </div>
  );
}
