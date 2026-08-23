"use client";

import { MonoLabel } from "@/components/ui/MonoLabel";
import globalJson from "@/content/global.json";
import type { GlobalContent } from "@/lib/content";

const errors = (globalJson as GlobalContent).errors;

/** §13 — the 500 boundary: interface voice, never apologetic-corporate. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="container-site grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-sm rounded-card border border-line bg-surface p-8 text-center">
        <MonoLabel bold accent className="block">
          500
        </MonoLabel>
        <p className="type-display-s mt-3 text-ink">{errors.title.text}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-btn bg-accent px-5 py-2.5 font-bold text-ink transition-colors duration-150 hover:bg-accent-deep"
        >
          {errors.retry.text}
        </button>
      </div>
    </main>
  );
}
