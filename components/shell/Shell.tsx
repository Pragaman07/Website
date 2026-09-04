"use client";

import { usePathname } from "next/navigation";
import { ModeProvider } from "@/lib/mode";
import { ThemeProvider } from "@/lib/theme";
import { SoundProvider } from "@/lib/sound";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { TemperatureLayer } from "@/components/shell/TemperatureLayer";
import { IdentityCrisisOverlay } from "@/components/eggs/IdentityCrisisOverlay";
import { ConsoleGreeting } from "@/components/eggs/ConsoleGreeting";
import type { GlobalContent } from "@/lib/content";

/**
 * App chrome. The Door (`/`) is full-viewport and chromeless; every other
 * route gets the persistent header + footer (§2.2–2.3). TemperatureLayer
 * sits above everything, waiting for a flip.
 */
export function Shell({
  content,
  buildStamp,
  buildYear,
  children,
}: {
  content: GlobalContent;
  /** D-3 build stamp (v{age}.{month}) + © year — prerendered in app/layout.tsx, footer-bound. */
  buildStamp: string;
  buildYear: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDoor = pathname === "/";

  return (
    <SoundProvider>
      <ThemeProvider>
      <ModeProvider>
        <TemperatureLayer />
        <IdentityCrisisOverlay />
        <ConsoleGreeting />
        {isDoor ? (
          children
        ) : (
          <>
            <Header content={content} />
            {children}
            <Footer content={content} buildStamp={buildStamp} buildYear={buildYear} />
          </>
        )}
      </ModeProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}
