"use client";

import { usePathname } from "next/navigation";
import { ModeProvider } from "@/lib/mode";
import { SoundProvider } from "@/lib/sound";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { TemperatureLayer } from "@/components/shell/TemperatureLayer";
import type { GlobalContent } from "@/lib/content";

/**
 * App chrome. The Door (`/`) is full-viewport and chromeless; every other
 * route gets the persistent header + footer (§2.2–2.3). TemperatureLayer
 * sits above everything, waiting for a flip.
 */
export function Shell({
  content,
  children,
}: {
  content: GlobalContent;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDoor = pathname === "/";

  return (
    <SoundProvider>
      <ModeProvider>
        <TemperatureLayer />
        {isDoor ? (
          children
        ) : (
          <>
            <Header content={content} />
            {children}
            <Footer content={content} />
          </>
        )}
      </ModeProvider>
    </SoundProvider>
  );
}
