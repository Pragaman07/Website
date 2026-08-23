import { NextResponse } from "next/server";
import { z } from "zod";
import { kv, getCounters } from "@/lib/kv";

export const runtime = "nodejs";

const BodySchema = z
  .object({
    replied: z.number().int().min(0).optional(),
    pitched: z.number().int().min(0).optional(),
    chai: z.number().int().min(0).optional(),
  })
  .refine((b) => Object.keys(b).length > 0, { message: "empty" });

/**
 * POST /api/admin/counters — Pragaman sets counters (mainly replied,
 * after answering pitches). Auth: x-admin-key header === ADMIN_KEY env.
 * The curl lives in README.md.
 */
export async function POST(req: Request) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || req.headers.get("x-admin-key") !== adminKey) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!kv) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const updates = parsed.data;
  if (updates.replied !== undefined) await kv.set("counter:replied", updates.replied);
  if (updates.pitched !== undefined) await kv.set("counter:pitched", updates.pitched);
  if (updates.chai !== undefined) await kv.set("counter:chai", updates.chai);

  return NextResponse.json({ ok: true, counters: await getCounters() });
}
