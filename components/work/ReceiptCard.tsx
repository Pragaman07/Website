import { FileText } from "lucide-react";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import type { CaseMeta, CopyString } from "@/lib/content";

/**
 * §7.1 receipt block — bordered card: PDF icon, report name, size, download
 * link, and the mono-label caption. The receipt is the audit source for
 * every Filing Buddy number.
 */
export function ReceiptCard({
  receipt,
  downloadLabel,
}: {
  receipt: NonNullable<CaseMeta["receipt"]>;
  downloadLabel: CopyString;
}) {
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-surface p-6 md:p-8">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-bg text-accent-deep">
        <FileText size={24} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 basis-52">
        <p className="type-display-s text-ink">{receipt.label}</p>
        {receipt.size && (
          <MonoLabel className="mt-1 block">PDF · {receipt.size}</MonoLabel>
        )}
      </div>
      {receipt.href ? (
        <a
          href={receipt.href}
          download
          className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-deep"
        >
          {downloadLabel.text}
        </a>
      ) : receipt.file?.pending ? (
        <Pending id={receipt.file.pending} note={receipt.file.note} />
      ) : null}
      <MonoLabel bold className="block w-full">
        {receipt.caption.text}
      </MonoLabel>
    </div>
  );
}
