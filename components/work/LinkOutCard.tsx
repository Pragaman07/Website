import { ExternalLink } from "lucide-react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import type { CaseMeta } from "@/lib/content";

/** §7.3 — link-out card to the live product (screenshot slots in later). */
export function LinkOutCard({ linkOut }: { linkOut: NonNullable<CaseMeta["linkOut"]> }) {
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-surface p-6 md:p-8">
      {linkOut.screenshot.pending && (
        <div className="w-full max-w-xs">
          <Pending id={linkOut.screenshot.pending} note={linkOut.screenshot.note} />
        </div>
      )}
      <div className="min-w-0 flex-1 basis-48">
        <MonoLabel bold className="block">
          LIVE
        </MonoLabel>
        <a
          href={linkOut.url}
          target="_blank"
          rel="noopener noreferrer"
          className="type-display-s mt-1 inline-flex items-center gap-2 text-accent-deep underline-offset-4 transition-colors duration-200 hover:underline"
        >
          {linkOut.label.text}
          <ExternalLink size={18} aria-hidden />
        </a>
      </div>
    </div>
  );
}
