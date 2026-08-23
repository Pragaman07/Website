import { notFound } from "next/navigation";
import { TokensClient } from "./tokens-client";

/** Dev-only token test page — the Phase 0 acceptance gate artifact. */
export default function TokensPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <TokensClient />;
}
