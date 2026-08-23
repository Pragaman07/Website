import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";
import global from "@/content/global.json";

/**
 * `/` is The Door (Design Spec §3.1) — built in Phase 1 together with the
 * shell, toggle, and temperature transition. This scaffold placeholder only
 * proves the token pipeline; it ships nowhere.
 */
export default function Home() {
  return (
    <main className="container-site flex min-h-screen flex-col items-start justify-center gap-4 py-24">
      <h1 className="type-display-m">
        {global.wordmark.text}
        <span className="text-accent">.</span>
      </h1>
      <MonoLabel bold>PHASE 0 · SCAFFOLD &amp; TOKENS</MonoLabel>
      <div className="max-w-md">
        <Pending
          id="PHASE-1.door"
          note="The Door renders here once the shell phase lands. Token test page: /dev/tokens (dev only)."
        />
      </div>
    </main>
  );
}
