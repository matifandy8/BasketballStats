import dotenv from 'dotenv';
import { YouTubeResponse, YouTubeVideo } from '../types/highlights';
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

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function httpFetchYouTubeVideos(
  query: string,
  maxResults: number = 5
): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('Missing YOUTUBE_API_KEY in environment variables');
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', maxResults.toString());
  url.searchParams.set('key', YOUTUBE_API_KEY);
  url.searchParams.set('order', 'date');
  url.searchParams.set('videoEmbeddable', 'true');

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API error: ${res.status} - ${text}`);
  }

  const data = (await res.json()) as YouTubeResponse;

  return data.items.map(item => ({
    id: item.id.videoId,
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
    publishedAt: item.snippet.publishedAt,
    channelTitle: item.snippet.channelTitle,
  }));
}

export async function httpFetchHighlights(
  query: 'nba' | 'wnba',
  options: FetchOptions = {}
): Promise<YouTubeVideo[]> {
  const maxResults =
    options.queryParams?.maxResults && typeof options.queryParams.maxResults === 'number'
      ? options.queryParams.maxResults
      : 5;
  return httpFetchYouTubeVideos(query, maxResults);
}
