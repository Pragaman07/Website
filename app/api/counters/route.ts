import { NextResponse } from "next/server";
import { getCounters, kvConfigured } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/counters → { pitched, replied, coffee } for the live UI. */
export async function GET() {
  const counters = await getCounters();
  if (!counters) {
    return NextResponse.json(
      { ok: false, error: "not-configured", configured: kvConfigured },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, counters });
}
