import { Request, Response, NextFunction } from 'express';
import rateLimit, { MemoryStore, RateLimitRequestHandler } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL as string);

/**
 * Creates a rate-limiting middleware for API endpoints.
 * @param {number} [maxRequests=60] The maximum number of requests per window.
 * @param {boolean} [useRedis=true] Whether to use Redis for a distributed store.
 * @returns {RateLimitRequestHandler} The rate-limiting middleware.
 */
export const apiLimiter = (maxRequests = 60, useRedis = true): RateLimitRequestHandler => {
  const store = useRedis
    ? new RedisStore({
      sendCommand: (...args: string[]): any => redisClient.call(...args as [string, ...any[]]),
    })
    : new MemoryStore();

  return rateLimit({
    store,
    windowMs: 60 * 1000,
    max: maxRequests,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      console.warn(`[RATE LIMIT] IP ${req.ip} exceeded limit on ${req.originalUrl}`);
      res.status(429).json({ error: 'Too many requests' });
    },
  });
};

const REDIS_KEY_PREFIX = 'api-cache:';

interface CachePayload {
  payload: unknown;
}

type KeyOrFn = string | ((req: Request) => string);

/**
 * Creates a caching middleware using Redis.
 * @param {KeyOrFn} keyOrFn - Either a static key prefix or a function that generates one from the request.
 * @param {number} ttlSeconds - The time-to-live for the cache entry in seconds.
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} The caching middleware.
 */
export const cache = (keyOrFn: KeyOrFn, ttlSeconds: number) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dynamicKey = typeof keyOrFn === 'function' ? keyOrFn(req) : keyOrFn;
    const key = `${REDIS_KEY_PREFIX}${dynamicKey}`;

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        console.log(`[CACHE HIT] ${key}`);
        const parsed = JSON.parse(cachedData) as CachePayload;
        res.json(parsed.payload);
        return;
      } else {
        console.log(`[CACHE MISS] ${key}`);
      }
    } catch (error) {
      console.error(`[CACHE ERROR] Failed to get cache for key ${key}:`, error);
    }

    const originalJson = res.json.bind(res);
    res.json = (body: unknown) => {
      const payload: CachePayload = { payload: body };
      redisClient
        .set(key, JSON.stringify(payload), 'EX', ttlSeconds)
        .catch(err => console.error(`[CACHE SET ERROR] Failed to cache key ${key}:`, err));
      return originalJson(body);
    };

    next();
  };