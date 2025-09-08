import dotenv from 'dotenv';
dotenv.config();

const ACCESS = process.env.SR_ACCESS_LEVEL || 'trial';
const VERSION = process.env.SR_VERSION || 'v8';
const LOCALE = process.env.SR_LOCALE || 'en';

export type League = 'nba' | 'wnba';

export interface FetchOptions extends RequestInit {
  queryParams?: Record<string, string | number>;
}

export async function httpFetch<T>(
  league: League,
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const BASE_URL = `https://api.sportradar.com/${league}/${ACCESS}/${VERSION}/${LOCALE}`;
  const url = new URL(BASE_URL + path);
  if (options.queryParams) {
    Object.entries(options.queryParams).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options.headers,
      'x-api-key': process.env.SR_API_KEY as string,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}
