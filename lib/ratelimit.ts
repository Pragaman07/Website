import { kv } from "@/lib/kv";

/**
 * Fixed-window rate limit on KV: INCR rl:{ip}:{route}, EXPIRE on first
 * hit. Intake: 1/min/IP · coffee: 10/min/IP.
 */
export async function rateLimit(
  ip: string,
  route: string,
  limit: number,
  windowSeconds = 60,
): Promise<{ ok: boolean }> {
  if (!kv) return { ok: true }; // unconfigured → the route itself 503s
  const key = `rl:${ip}:${route}`;
  const count = await kv.incr(key);
  if (count === 1) await kv.expire(key, windowSeconds);
  return { ok: count <= limit };
}

/** Client IP on Vercel / local dev. */
export function requestIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "local";
}
