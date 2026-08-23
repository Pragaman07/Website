"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { NavLink } from "@/lib/content";

/** §2.2 mobile nav — slide-down panel, generous 48px tap targets. */
export function NavPanel({
  open,
  links,
  onNavigate,
}: {
  open: boolean;
  links: NavLink[];
  onNavigate: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="nav-panel"
          aria-label="Site"
          className="absolute inset-x-0 top-16 overflow-hidden border-b border-line bg-surface shadow-m md:hidden"
          initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: reduced ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="container-site py-2">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="flex min-h-12 items-center text-[16px] font-medium text-ink transition-colors duration-200 hover:text-accent-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
