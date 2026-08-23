import { NextResponse } from "next/server";
import { z } from "zod";
import { ulid } from "ulid";
import { Resend } from "resend";
import { kv, getCounters } from "@/lib/kv";
import { rateLimit, requestIp } from "@/lib/ratelimit";

export const runtime = "nodejs";

/**
 * POST /api/intake (CLAUDE.md):
 * honeypot → rate limit (1/min/IP) → zod validate → intake:{ulid} write →
 * INCR counter:pitched → Resend email → return counters.
 * STORE-THEN-SEND: the KV write happens before email; a Resend failure
 * must never lose a pitch.
 */

const SEVERITIES = [
  "mild-itch",
  "recurring-nightmare",
  "existential-threat",
  "already-cried",
] as const;

const PitchSchema = z.object({
  broken: z.string().trim().min(20).max(2000),
  hurts: z.string().trim().min(2).max(2000),
  tried: z.string().trim().max(2000).optional().default(""),
  severity: z.enum(SEVERITIES),
  email: z.string().trim().email().max(200),
  /** Honeypot — real users never see or fill this. */
  website: z.string().optional().default(""),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = PitchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const pitch = parsed.data;

  // Honeypot tripped: answer like a success, store nothing, tip off nobody.
  if (pitch.website !== "") {
    const counters = await getCounters();
    return NextResponse.json({ ok: true, counters });
  }

  if (!kv) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  const limited = await rateLimit(requestIp(req), "intake", 1, 60);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const id = ulid();
  const record = {
    id,
    broken: pitch.broken,
    hurts: pitch.hurts,
    tried: pitch.tried,
    severity: pitch.severity,
    email: pitch.email,
    at: new Date().toISOString(),
  };

  // 1. Store first — the pitch is safe from here on.
  await kv.set(`intake:${id}`, record);
  await kv.incr("counter:pitched");

  // 2. Then email; failure is logged, never fatal.
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.INTAKE_TO_EMAIL;
    if (apiKey && to) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Pragaman.com Intake <onboarding@resend.dev>",
        to,
        replyTo: pitch.email,
        subject: `[Intake] ${pitch.severity} — ${id}`,
        text: [
          `Severity: ${pitch.severity}`,
          ``,
          `What's broken?`,
          pitch.broken,
          ``,
          `Who does it hurt most?`,
          pitch.hurts,
          ``,
          `What have they tried?`,
          pitch.tried || "(nothing yet)",
          ``,
          `Reply to: ${pitch.email}`,
          `KV record: intake:${id}`,
        ].join("\n"),
      });
    } else {
      console.warn(`[intake] stored ${id}, email skipped (Resend not configured)`);
    }
  } catch (err) {
    console.error(`[intake] stored ${id}, email failed:`, err);
  }

  const counters = await getCounters();
  return NextResponse.json({ ok: true, counters });
}
