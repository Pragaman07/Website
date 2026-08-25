import Image from "next/image";
import { Pending } from "@/components/ui/Pending";
import { MidnightLine } from "@/components/eggs/MidnightSwap";
import type { KnowHubContent } from "@/lib/content";

/**
 * §11.1 — the playful hero: real photo in a polaroid frame (−2°, sun tape
 * strip), 2–3 Caveat annotations with wobbly arrows, headline at −1°,
 * static sticker-dot confetti. Photo left / text right; stacked on mobile.
 */
export function PolaroidHero({ hero }: { hero: KnowHubContent["hero"] }) {
  return (
    <section className="relative">
      <Confetti />
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
        <div className="relative shrink-0">
          {/* memoji sticker — top-right polaroid corner (top-left = tape,
              bottom-right = annotation); decorative garnish, Know only */}
          <Image
            src="/images/memoji-sticker.png"
            alt=""
            aria-hidden
            width={80}
            height={93}
            className="absolute -right-5 -top-6 z-10 w-16 rotate-6 sm:-right-6"
          />
          <figure className="w-64 -rotate-2 bg-white p-3 pb-10 shadow-m sm:w-72">
            {/* tape strip */}
            <span
              aria-hidden
              className="absolute -top-3 left-8 h-7 w-20 rotate-[-8deg] bg-sun opacity-40"
            />
            {hero.photo.src ? (
              <Image
                src={hero.photo.src}
                alt={hero.photo.alt?.text ?? ""}
                width={288}
                height={288}
                priority
                className="aspect-square w-full object-cover"
              />
            ) : hero.photo.pending ? (
              <div className="grid aspect-square place-items-center">
                <Pending id={hero.photo.pending} note={hero.photo.note} />
              </div>
            ) : null}
          </figure>

          {/* Caveat annotation + wobbly arrow (decorative); egg 7 swaps
              the line after midnight */}
          {hero.annotations[0]?.text && (
            <span
              aria-hidden
              className="absolute -right-6 -bottom-8 max-w-40 rotate-[3deg] text-accent-deep md:-right-24 md:bottom-10"
            >
              <svg
                width="46"
                height="26"
                viewBox="0 0 46 26"
                fill="none"
                className="mb-1 -scale-x-100 md:scale-x-100"
              >
                <path
                  d="M44 24 C30 22 14 18 4 4 M4 4 l1.5 8 M4 4 l8 1"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <MidnightLine
                doodle
                normal={hero.annotations[0]}
                midnight={hero.midnightAnnotation}
              />
            </span>
          )}
        </div>

        <div className="max-w-xl pt-2 md:pt-8">
          <h1 className="type-display-l -rotate-1 text-ink">{hero.headline.text}</h1>
          {hero.intro.text ? (
            <p className="type-body-l mt-6 max-w-md text-muted">{hero.intro.text}</p>
          ) : hero.intro.pending ? (
            <div className="mt-6 max-w-md">
              <Pending id={hero.intro.pending} note={hero.intro.note} />
            </div>
          ) : null}
          {hero.annotations[1]?.text ? (
            <span
              aria-hidden
              className="type-doodle mt-4 inline-block rotate-[-2deg] text-accent-deep"
            >
              {hero.annotations[1].text}
            </span>
          ) : hero.annotations[1]?.pending ? (
            <div className="mt-4 max-w-md">
              <Pending id={hero.annotations[1].pending} note={hero.annotations[1].note} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const DOTS: Array<{ top: string; left: string; size: number; token: string }> = [
  { top: "-4%", left: "44%", size: 9, token: "var(--teal)" },
  { top: "10%", left: "88%", size: 8, token: "var(--sun)" },
  { top: "52%", left: "96%", size: 7, token: "var(--purple)" },
  { top: "88%", left: "72%", size: 9, token: "var(--sun)" },
  { top: "94%", left: "30%", size: 7, token: "var(--teal)" },
  { top: "40%", left: "-2%", size: 8, token: "var(--purple)" },
];

function Confetti() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-pill"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: dot.token,
          }}
        />
      ))}
    </span>
  );
}
