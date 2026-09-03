"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useMode } from "@/lib/mode";
import { ModeToggle } from "@/components/shell/ModeToggle";
import { MuteButton } from "@/components/shell/MuteButton";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { NavPanel } from "@/components/shell/NavPanel";
import { cn } from "@/lib/cn";
import type { GlobalContent } from "@/lib/content";

/**
 * §2.2 — sticky 64px header, --bg at 92% + backdrop blur, bottom border
 * only after 24px of scroll. Nav follows the current mode; active page
 * underlined in coral (small text → accent-deep per §13). Sound + theme
 * controls sit beside the toggle on ≥md and inside the nav panel below.
 */
export function Header({ content }: { content: GlobalContent }) {
  const { mode } = useMode();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setPanelOpen(false), [pathname, mode]);

  const links = content.nav[mode];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b backdrop-blur",
        scrolled ? "border-line" : "border-transparent",
      )}
      style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)" }}
    >
      <div className="container-site flex h-full items-center justify-between gap-4">
        <Link
          href={mode === "work" ? "/work" : "/know-me"}
          className="type-display-s lowercase text-ink"
        >
          {content.wordmark.text}
          <span className="text-accent-deep">.</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <nav aria-label="Site" className="hidden md:block">
            <ul className="flex items-center gap-5">
              {links.map((link) => {
                const active =
                  pathname === link.href.replace(/#.*$/, "") && !link.href.includes("#");
                return (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[14px] font-medium text-ink underline-offset-4 transition-colors duration-200 hover:text-accent-deep",
                        active && "underline decoration-accent decoration-2",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ModeToggle content={content.toggle} />
          <span className="hidden items-center gap-1 md:flex">
            <MuteButton content={content.mute} />
            <ThemeToggle content={content.theme} />
          </span>

          <button
            type="button"
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={panelOpen}
            aria-controls="nav-panel"
            aria-label={panelOpen ? "Close navigation" : "Open navigation"}
            className="grid h-11 w-11 place-items-center rounded-btn text-ink md:hidden"
          >
            {panelOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <NavPanel
        open={panelOpen}
        links={links}
        onNavigate={() => setPanelOpen(false)}
        controls={
          <>
            <MuteButton content={content.mute} />
            <ThemeToggle content={content.theme} />
          </>
        }
      />
    </header>
  );
}
