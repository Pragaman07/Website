import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";

/** Work home — full build lands in Phase 2 (Design Spec §6). */
export default function WorkHome() {
  return (
    <main className="container-site py-24">
      <MonoLabel bold accent>
        WORK MODE · SHELL LIVE
      </MonoLabel>
      <div className="mt-6 max-w-md">
        <Pending
          id="PHASE-2.work-home"
          note="Hero, proof strip, case cards, method teaser, and the Intake section arrive in Phase 2."
        />
      </div>
    </main>
  );
}
