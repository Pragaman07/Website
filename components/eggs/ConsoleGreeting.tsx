"use client";

import { useEffect, useRef } from "react";
import eggsJson from "@/content/eggs.json";
import type { EggsContent } from "@/lib/content";

const eggs = eggsJson as EggsContent;

/**
 * §12.2 — the console greeting: once per page load, coral %c wordmark +
 * the coffee-chat line. No dev-tools detection, no sound (a log can't
 * know it was discovered), nothing tracked.
 */
export function ConsoleGreeting() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    // eslint-disable-next-line no-console
    console.log(
      "%cpragaman%c.\n%c" +
        eggs.console.greeting.text +
        "\n" +
        eggs.console.bugLine.text,
      "font-size:28px;font-weight:800;color:#16181D;",
      "font-size:28px;font-weight:800;color:#E85546;",
      "font-size:12px;color:#6B7280;font-family:monospace;",
    );
  }, []);

  return null;
}
