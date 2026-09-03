import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The memoji cut-outs (placement map, DECISIONS.md 3 Sep 2026). Always
 * decorative: empty alt + aria-hidden, never carrying meaning on their own.
 * Dimensions are the real pixel sizes written by scripts/prepare-images.mjs
 * so next/image reserves the right box (zero CLS) and serves resized WebP.
 * `className` sets the rendered width (w-*); height follows the aspect.
 */
const MEMOJI = {
  /** hands on waist — Work hero */
  hands: { src: "/images/memoji-hands.png", width: 515, height: 640 },
  /** heart hands — intake success, Know Me footer */
  heart: { src: "/images/memoji-heart.png", width: 367, height: 480 },
  /** surprised — egg-1 error card (the toggle uses its own 120px face crop) */
  surprise: { src: "/images/memoji-surprise.png", width: 220, height: 320 },
  /** "call me" — the pitch block (lands with chunk 4) */
  call: { src: "/images/memoji-call.png", width: 826, height: 798 },
  /** full body — the Door's "The Person" half */
  full: { src: "/images/memoji-full.png", width: 562, height: 787 },
} as const;

export type MemojiName = keyof typeof MEMOJI;

export function Memoji({
  name,
  sizes,
  priority = false,
  className,
}: {
  name: MemojiName;
  /** Rendered widths per breakpoint — keeps the srcset honest. */
  sizes: string;
  /** Only for the one memoji that can be the LCP candidate (Work hero). */
  priority?: boolean;
  className?: string;
}) {
  const m = MEMOJI[name];
  return (
    <Image
      src={m.src}
      alt=""
      aria-hidden
      width={m.width}
      height={m.height}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={cn("h-auto select-none", className)}
    />
  );
}
