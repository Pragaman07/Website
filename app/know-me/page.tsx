import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";

/** Know Me hub — full build lands in Phase 4 (Design Spec §11). The
 *  sticker chips below are decorative garnish so the §3.3 stagger has
 *  something real to choreograph until the level grid exists. */
export default function KnowMeHub() {
  return (
    <main className="container-site py-24">
      <span aria-hidden className="mb-4 flex items-center gap-2">
        {(["var(--teal)", "var(--purple)", "var(--sun)"] as const).map((token, i) => (
          <span
            key={token}
            data-garnish
            className="inline-block h-3 w-3 rounded-pill"
            style={
              {
                background: token,
                "--garnish-delay": `${250 + i * 40}ms`,
                "--garnish-rotate": "0deg",
              } as React.CSSProperties
            }
          />
        ))}
      </span>
      <MonoLabel bold accent>
        KNOW ME MODE · SHELL LIVE
      </MonoLabel>
      <div className="mt-6 max-w-md">
        <Pending
          id="PHASE-4.know-hub"
          note="Playful hero and the level-select grid arrive in Phase 4."
        />
      </div>
    </main>
  );
}
