import { Redis } from "@upstash/redis";

/**
 * KV client (CLAUDE.md core systems). Upstash Redis via the Vercel
 * Marketplace integration — accepts both env naming schemes. Keys:
 *   counter:chai · counter:pitched · counter:replied
 *   intake:{ulid} · rl:{ip}:{route}
 *
 * In development WITHOUT credentials, a process-local in-memory store
 * stands in so the whole flow is testable before keys exist. Production
 * without credentials returns null → routes answer 503, never fake data.
 */

type Store = {
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<void>;
  set(key: string, value: unknown): Promise<void>;
  get(key: string): Promise<unknown>;
  mget(...keys: string[]): Promise<Array<unknown>>;
};

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);
const devFallback = !kvConfigured && process.env.NODE_ENV === "development";

function redisStore(): Store {
  const redis = new Redis({ url: url!, token: token! });
  return {
    incr: (key) => redis.incr(key),
    expire: async (key, seconds) => {
      await redis.expire(key, seconds);
    },
    set: async (key, value) => {
      await redis.set(key, value);
    },
    get: (key) => redis.get(key),
    mget: (...keys) => redis.mget(...keys),
  };
}

function memoryStore(): Store {
  const data = new Map<string, unknown>();
  const timers = new Map<string, number>();
  const expired = (key: string) => {
    const at = timers.get(key);
    if (at !== undefined && Date.now() > at) {
      data.delete(key);
      timers.delete(key);
    }
  };
  return {
    async incr(key) {
      expired(key);
      const next = (Number(data.get(key)) || 0) + 1;
      data.set(key, next);
      return next;
    },
    async expire(key, seconds) {
      timers.set(key, Date.now() + seconds * 1000);
    },
    async set(key, value) {
      data.set(key, value);
    },
    async get(key) {
      expired(key);
      return data.get(key) ?? null;
    },
    async mget(...keys) {
      return keys.map((k) => {
        expired(k);
        return data.get(k) ?? null;
      });
    },
  };
}

/* One store per server process. */
const globalStore = globalThis as unknown as { __pragamanKv?: Store };
export const kv: Store | null = kvConfigured
  ? (globalStore.__pragamanKv ??= redisStore())
  : devFallback
    ? (globalStore.__pragamanKv ??= memoryStore())
    : null;

export const COUNTER_KEYS = ["counter:pitched", "counter:replied", "counter:chai"] as const;

export type Counters = { pitched: number; replied: number; chai: number };

export async function getCounters(): Promise<Counters | null> {
  if (!kv) return null;
  const [pitched, replied, chai] = await kv.mget(...COUNTER_KEYS);
  return {
    pitched: Number(pitched) || 0,
    replied: Number(replied) || 0,
    chai: Number(chai) || 0,
  };
}
