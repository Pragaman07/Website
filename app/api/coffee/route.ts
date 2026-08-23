import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { rateLimit, requestIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

/** POST /api/coffee — egg 4's global counter. 10/min/IP; client debounces.
 *  (Chai → coffee ruled by Pragaman 23 Aug 2026 — DECISIONS.md.) */
export async function POST(req: Request) {
  if (!kv) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }
  const limited = await rateLimit(requestIp(req), "coffee", 10, 60);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }
  const coffee = await kv.incr("counter:coffee");
  return NextResponse.json({ ok: true, coffee });
}
