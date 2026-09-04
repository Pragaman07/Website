"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMode } from "@/lib/mode";
import { getFact } from "@/lib/content";
import { SHOW_PENDING } from "@/lib/flags";
import { cn } from "@/lib/cn";
import { MuteButton } from "@/components/shell/MuteButton";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { FooterCounters } from "@/components/shell/FooterCounters";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import { Memoji } from "@/components/ui/Memoji";
import intakeJson from "@/content/work/intake.json";
import saveStatesJson from "@/content/know/save-states.json";
import type {
  CopyString,
  GlobalContent,
  IntakeContent,
  NavLink,
  SaveStatesContent,
} from "@/lib/content";

/* pitched/replied labels are the Intake's own; the map credit is the Save
   States page's (CC BY 4.0 — attribution rides along in both modes). */
const intake = intakeJson as unknown as IntakeContent;
const saveStates = saveStatesJson as SaveStatesContent;

/* Secondary link grammar (§13 rulings): ink text, coral underline +
   accent-deep on hover. Rows are 44px tap targets below md, compact above. */
const linkInk = "text-[14px] font-medium text-ink transition-colors duration-200 hover:text-accent-deep";
const linkUnderline = "decoration-accent decoration-2 underline-offset-4 hover:underline";
const linkClass = cn(linkInk, linkUnderline);
const rowClass = "flex min-h-11 items-center md:min-h-0 md:py-1";

/**
 * §2.3 as amended (DECISIONS.md 3 Sep 2026, "§2.3 footer") — the extended
 * footer, both modes: wordmark + identity one-liner (facts, not copy) ·
 * four columns (WORK / KNOW ME nav — both always visible, deep links force
 * their mode · CONTACT: email, calendar, socials · LIVE: the three counters)
 * · bottom bar (sign-off, mute + theme, BUILD stamp, ©, map credit).
 * Know Me adds the Caveat scribble with the heart-hands memoji beside it
 * (memoji map, DECISIONS.md 3 Sep); Work stays clean. `buildStamp` is
 * D-3's v{age}.{month}, computed once at prerender in app/layout.tsx —
 * never here (hydration).
 */
export function Footer({
  content,
  buildStamp,
  buildYear,
}: {
  content: GlobalContent;
  buildStamp: string;
  /** © year, prerendered beside the stamp (same reason: hydration). */
  buildYear: number;
}) {
  const { mode } = useMode();
  const pathname = usePathname();
  const { footer } = content;
  const identity = [
    getFact("identity.title").value,
    getFact("identity.company").value,
    getFact("identity.location").value,
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-site py-14 md:py-16">
        {/* wordmark (same dot treatment as the header) + the one-liner */}
        <div className="flex flex-col gap-2">
          <Link
            href={mode === "work" ? "/work" : "/know-me"}
            className="type-display-s self-start lowercase text-ink"
          >
            {content.wordmark.text}
            <span className="text-accent-deep">.</span>
          </Link>
          <MonoLabel as="p">{identity.join(" · ")}</MonoLabel>
        </div>

        {/* four columns on md+; below: the two nav columns side by side,
            contact and live stacked full-width (the address needs the room) */}
        <div className="mt-12 flex flex-col gap-10 md:grid md:grid-cols-[1fr_1fr_minmax(15rem,auto)_1fr]">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-2">
            <LinkColumn heading={footer.columns.work} links={content.nav.work} />
            <LinkColumn heading={footer.columns.know} links={content.nav.know} />
          </nav>

          <div>
            <ColumnHeading>{footer.columns.contact.text}</ColumnHeading>
            <ul className="mt-4 flex flex-col">
              {footer.email.text ? (
                <li>
                  <a
                    href={`mailto:${footer.email.text}`}
                    className={cn(
                      linkInk,
                      "group flex min-h-11 flex-col justify-center md:min-h-0 md:py-1",
                    )}
                  >
                    {/* only the label underlines — the address stays a clean mono line */}
                    <span className="decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                      {footer.emailLabel.text}
                    </span>
                    <span className="type-body-s text-muted transition-colors duration-200 [overflow-wrap:anywhere] group-hover:text-accent-deep">
                      {footer.email.text}
                    </span>
                  </a>
                </li>
              ) : footer.email.pending && SHOW_PENDING ? (
                <li className="py-1">
                  <Pending id={footer.email.pending} note={footer.email.note} />
                </li>
              ) : null}

              {footer.calendarUrl.text ? (
                <li>
                  <a
                    href={footer.calendarUrl.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, rowClass)}
                  >
                    {footer.calendarLabel.text}
                    <NewTabHint hint={footer.newTabHint} />
                  </a>
                </li>
              ) : footer.calendarUrl.pending && SHOW_PENDING ? (
                <li className="py-1">
                  <Pending id={footer.calendarUrl.pending} note={footer.calendarUrl.note} />
                </li>
              ) : null}

              {footer.socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, rowClass)}
                  >
                    {social.label}
                    <NewTabHint hint={footer.newTabHint} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>{footer.columns.live.text}</ColumnHeading>
            <div className="mt-4">
              <FooterCounters
                rows={[
                  { key: "pitched", label: intake.counter.pitchedLabel },
                  { key: "replied", label: intake.counter.repliedLabel },
                  { key: "coffee", label: footer.counters.coffeeLabel },
                ]}
              />
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 md:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <p className="type-body-s text-muted">{footer.signoff.text}</p>
            {mode === "know" &&
              (footer.knowScribble.text ? (
                <span className="flex items-center gap-2" aria-hidden>
                  <Memoji name="heart" sizes="40px" className="w-10 -rotate-3" />
                  <span
                    data-garnish
                    style={{ "--garnish-rotate": "-2deg" } as React.CSSProperties}
                    className="type-doodle font-bold text-accent-deep"
                  >
                    {footer.knowScribble.text}
                  </span>
                </span>
              ) : footer.knowScribble.pending ? (
                <Pending id={footer.knowScribble.pending} note={footer.knowScribble.note} />
              ) : null)}
            {/* 44px tap targets here (the header's 36px pair is pointer-first) */}
            <span className="flex items-center gap-1 [&_button]:h-11 [&_button]:w-11">
              <MuteButton content={content.mute} />
              <ThemeToggle content={content.theme} />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <MonoLabel>
              {footer.buildLabel.text} · <span className="normal-case">{buildStamp}</span>
            </MonoLabel>
            <MonoLabel>
              © {buildYear} · {content.wordmark.text}
            </MonoLabel>
            {/* attribution rides on every page except the map's own, which
                already carries it in its figcaption */}
            {pathname !== "/know-me/save-states" && (
              <MonoLabel>{saveStates.mapCredit.text}</MonoLabel>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Column header: the mono-label voice, bold, as a real heading. */
function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <MonoLabel as="h2" bold>
      {children}
    </MonoLabel>
  );
}

/** One nav column — the mode's header links, in the footer's link grammar. */
function LinkColumn({ heading, links }: { heading: CopyString; links: NavLink[] }) {
  return (
    <div>
      <ColumnHeading>{heading.text}</ColumnHeading>
      <ul className="mt-4 flex flex-col">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={cn(linkClass, rowClass)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** sr-only suffix for target=_blank links (WCAG G201) — copy from content. */
function NewTabHint({ hint }: { hint: CopyString }) {
  if (!hint.text) return null;
  return <span className="sr-only"> ({hint.text})</span>;
}
