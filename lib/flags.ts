/**
 * Placeholder visibility (Design Spec §14).
 * true in dev; in deployed environments it is opt-in via
 * NEXT_PUBLIC_SHOW_PENDING=true (set it on Vercel Preview, never Production).
 * Launch gate: `grep -r "PENDING" content/` must return zero anyway.
 */
export const SHOW_PENDING =
  process.env.NEXT_PUBLIC_SHOW_PENDING === "true" ||
  process.env.NODE_ENV !== "production";
