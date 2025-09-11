import { Request, Response, NextFunction } from 'express';
import rateLimit, { MemoryStore, RateLimitRequestHandler } from 'express-rate-limit';
import RedisStore, { RedisReply } from 'rate-limit-redis';
import Redis, { Redis as RedisClient } from 'ioredis';
import { logger } from '../utils/logger';
import { PrecacheManager } from '../utils/precache';

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
        sendCommand: (...args: Parameters<RedisClient['call']>): Promise<RedisReply> =>
          redisClient.call(...args) as Promise<RedisReply>,
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

type KeyOrFn = string | ((req: Request) => string);

interface CachePayload<T = unknown> {
  payload: T;
  timestamp: number;
  ttl: number;
}

// Constants
const REDIS_KEY_PREFIX = 'cache:';
const DEFAULT_TTL = 300; // 5 minutes in seconds

let precacheManager: PrecacheManager | null = null;

export const setPrecacheManager = (manager: PrecacheManager) => {
  precacheManager = manager;
};

/**
 * Enhanced cache middleware with better TypeScript support and error handling
 * @param keyOrFn - Either a static key prefix or a function that generates one from the request
 * @param ttlSeconds - Optional time-to-live in seconds (default: 300s / 5 minutes)
 */
export const cache = <T = unknown>(keyOrFn: KeyOrFn, ttlSeconds: number = DEFAULT_TTL) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    if (req.method !== 'GET') {
      return next();
    }

    const dynamicKey = typeof keyOrFn === 'function' ? keyOrFn(req) : keyOrFn;
    const key = `${REDIS_KEY_PREFIX}${dynamicKey}`;

    try {
      if (precacheManager) {
        const precachedData = await precacheManager.getCachedData<T>(dynamicKey);
        if (precachedData) {
          logger.debug(`[PRECACHE HIT] ${dynamicKey}`);
          res.setHeader('X-Cache-Status', 'HIT');
          res.setHeader('X-Cache-Source', 'precache');
          return res.json(precachedData);
        }

        const pathParts = dynamicKey.split(':');
        if (pathParts.length > 1) {
          const baseKey = pathParts[0];
          const precachedData = await precacheManager.getCachedData<T>(baseKey);
          if (precachedData) {
            logger.debug(`[PRECACHE HIT] ${baseKey} (partial match for ${dynamicKey})`);
            res.setHeader('X-Cache-Status', 'HIT');
            res.setHeader('X-Cache-Source', 'precache');
            return res.json(precachedData);
          }
        }
      }

      const cachedData = await redisClient.get(key);

      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData) as CachePayload<T>;
          const now = Math.floor(Date.now() / 1000);

          if (!parsed.timestamp || now - parsed.timestamp < (parsed.ttl || ttlSeconds)) {
            logger.debug(`[CACHE HIT] ${key}`);
            res.setHeader('X-Cache-Status', 'HIT');
            return res.json(parsed.payload as T);
          }
          logger.debug(`[CACHE EXPIRED] ${key}`);
        } catch (parseError) {
          logger.error(
            `[CACHE PARSE ERROR] ${key}: ${parseError instanceof Error ? parseError.message : String(parseError)}`
          );
        }
      } else {
        logger.debug(`[CACHE MISS] ${key}`);
      }
    } catch (error) {
      logger.error(
        `[CACHE ERROR] Failed to get cache for key ${key}: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    const originalJson = res.json.bind(res);

    res.setHeader('X-Cache-Status', 'MISS');

    res.json = (body: T) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const payload: CachePayload<T> = {
          payload: body,
          timestamp: Math.floor(Date.now() / 1000),
          ttl: ttlSeconds,
        };

        redisClient
          .set(key, JSON.stringify(payload), 'EX', ttlSeconds)
          .then(() => logger.debug(`[CACHE SET] ${key} (TTL: ${ttlSeconds}s)`))
          .catch(err =>
            logger.error(
              `[CACHE SET ERROR] Failed to cache key ${key}: ${err instanceof Error ? err.message : String(err)}`
            )
          );
      }

      return originalJson(body);
    };

    next();
  };
};

export const clearCache = async (keyOrPrefix: string): Promise<number> => {
  try {
    if (keyOrPrefix.endsWith('*')) {
      const prefix = keyOrPrefix.slice(0, -1);
      const keys = await redisClient.keys(`${prefix}*`);
      if (keys.length > 0) {
        await redisClient.del(...keys);
        logger.info(`[CACHE CLEARED] ${keys.length} keys with prefix: ${prefix}`);
        return keys.length;
      }
      return 0;
    } else {
      await redisClient.del(keyOrPrefix);
      logger.info(`[CACHE CLEARED] Key: ${keyOrPrefix}`);
      return 1;
    }
  } catch (error) {
    logger.error(`[CACHE CLEAR ERROR]: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
