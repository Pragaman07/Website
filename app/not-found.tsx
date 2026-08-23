import { BadPathTombstone } from "@/components/eggs/BadPathTombstone";

export const metadata = { title: "404 — pragaman" };

/**
 * §12.3 — the 404 IS a Graveyard plot, in both modes (the tombstone is
 * the one Know Me component allowed to appear in Work dress — it's a
 * 404, rules relax).
 */
export default function NotFound() {
  return (
    <main className="container-site grid min-h-[70vh] place-items-center py-16">
      <BadPathTombstone />
    </main>
  );
}
