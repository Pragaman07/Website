import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pending } from "@/components/ui/Pending";

/** Shared route — dress follows the current mode, re-dressing IN PLACE on
 *  flip (D-2). Full dual-dress build lands in Phase 5 (Design Spec §9). */
export default function ChangelogPage() {
  return (
    <main className="container-site py-24">
      <MonoLabel bold accent>
        CHANGELOG · SHARED ROUTE
      </MonoLabel>
      <div className="mt-6 max-w-md">
        <Pending
          id="PHASE-5.changelog"
          note="Dual-dress entries + in-place re-dress on flip arrive in Phase 5. Flipping here must NOT navigate — this page is the transition's showroom."
        />
      </div>
    </main>
  );
}
