import dotenv from 'dotenv';
dotenv.config();

const ACCESS = process.env.SR_ACCESS_LEVEL || 'trial';
const VERSION = process.env.SR_VERSION || 'v8';
const LOCALE = process.env.SR_LOCALE || 'en';
const NEWS_API = process.env.NEWS_API;
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

export async function httpFetchNews<T>(
  query: 'nba' | 'wnba',
  options: FetchOptions = {}
): Promise<T> {
  if (!NEWS_API) {
    throw new Error('Missing NEWS_API key in environment variables');
  }
  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.set('apiKey', NEWS_API);
  url.searchParams.set('q', query);
  url.searchParams.set('sources', 'espn,bleacher-report,sbnation');
  url.searchParams.set('sortBy', 'popularity');
  url.searchParams.set('language', 'en');
  url.searchParams.set('pageSize', '5');

  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options.headers,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}
