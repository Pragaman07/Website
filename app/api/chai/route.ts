import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { rateLimit, requestIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

/** POST /api/chai — egg 4's global counter. 10/min/IP; client debounces. */
export async function POST(req: Request) {
  if (!kv) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }
  const limited = await rateLimit(requestIp(req), "chai", 10, 60);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }
  const chai = await kv.incr("counter:chai");
  return NextResponse.json({ ok: true, chai });
}
