"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tombstone } from "@/components/know/Tombstone";
import { useEggFound } from "@/lib/eggs";
import eggsJson from "@/content/eggs.json";
import type { EggsContent } from "@/lib/content";

const eggs = eggsJson as EggsContent;

/**
 * §12.3 — one tombstone, full center: the bad path is the deceased
 * (truncated to 32 chars), b. never — d. immediately.
 */
export function BadPathTombstone() {
  const [name, setName] = useState("…");
  const markFound = useEggFound();

  useEffect(() => {
    const path = window.location.pathname;
    setName(path.length > 32 ? path.slice(0, 32) + "…" : path);
    markFound(3);
  }, [markFound]);

  return (
    <div className="w-full max-w-sm">
      <Tombstone
        name={name}
        born={eggs.notFound.born.text}
        died={eggs.notFound.died.text}
        epitaph={eggs.notFound.epitaph.text}
      >
        <p className="mt-5">
          <Link
            href="/"
            className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-deep"
          >
            {eggs.notFound.back.text}
          </Link>
        </p>
      </Tombstone>
    </div>
  );
}
