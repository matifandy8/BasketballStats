import { Redis } from 'ioredis';
import { logger } from './logger';
import axios from 'axios';

type CacheConfig = {
  key: string;
  url: string;
  ttl: number;
  refreshInterval: number;
};

export class PrecacheManager {
  private redis: Redis;
  private configs: CacheConfig[];
  private intervals: NodeJS.Timeout[] = [];

  constructor(redisUrl: string, configs: CacheConfig[]) {
    this.redis = new Redis(redisUrl);
    this.configs = configs;
  }

  async initialize() {
    await this.loadAllData();
    this.setupRefreshIntervals();
  }

  private async loadAllData() {
    await Promise.all(this.configs.map(config => this.fetchAndCache(config)));
  }

  private setupRefreshIntervals() {
    this.configs.forEach(config => {
      const interval = setInterval(() => this.fetchAndCache(config), config.refreshInterval);
      this.intervals.push(interval);
    });
  }

  private async fetchAndCache(config: CacheConfig) {
    try {
      logger.info(`[PRECACHE] Fetching data for ${config.key}`);
      const response = await axios.get(config.url);

      if (response.status === 200) {
        const payload = {
          data: response.data,
          timestamp: Date.now(),
          ttl: config.ttl,
        };

        await this.redis.set(`precache:${config.key}`, JSON.stringify(payload), 'EX', config.ttl);

        logger.info(`[PRECACHE] Successfully cached ${config.key}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error({ error }, `[PRECACHE] Error fetching ${config.key}`);
      } else {
        logger.error({ error: String(error) }, `[PRECACHE] Error fetching ${config.key}`);
      }
    }
  }

  async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(`precache:${key}`);
      if (!data) return null;

      const parsed = JSON.parse(data);
      return parsed.data || parsed;
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error({ error }, `[PRECACHE] Error getting cached data for ${key}`);
      } else {
        logger.error({ error: String(error) }, `[PRECACHE] Error getting cached data for ${key}`);
      }
      return null;
    }
  }

  clearIntervals() {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
  }
}

export const defaultPrecacheConfigs: CacheConfig[] = [
  {
    key: 'schedule:nba:2024:REG',
    url: 'https://basketballstats-1.onrender.com/api/nba/schedule/2024/REG',
    ttl: 86400, // 24 hours
    refreshInterval: 12 * 60 * 60 * 1000, // 12 hours
  },
  {
    key: 'news:nba',
    url: 'https://basketballstats-1.onrender.com/api/nba/news',
    ttl: 86400, // 24 hours
    refreshInterval: 12 * 60 * 60 * 1000, // 12 hours
  },
  {
    key: 'highlights:nba',
    url: 'https://basketballstats-1.onrender.com/api/nba/highlights',
    ttl: 86400, // 24 hours
    refreshInterval: 12 * 60 * 60 * 1000, // 12 hours
  },
  {
    key: 'schedule:today:nba',
    url: 'https://basketballstats-1.onrender.com/api/nba/schedule/today',
    ttl: 86400, // 24 hours
    refreshInterval: 12 * 60 * 60 * 1000, // 12 hours
  },
  {
    key: 'schedule:today:wnba',
    url: 'https://basketballstats-1.onrender.com/api/wnba/schedule/today',
    ttl: 86400, // 24 hours
    refreshInterval: 12 * 60 * 60 * 1000, // 12 hours
  },
];
