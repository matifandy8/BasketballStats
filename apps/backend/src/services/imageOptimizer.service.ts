import cron from 'node-cron';
import sharp from 'sharp';
import { logger } from '../utils/logger';
import { httpFetchHighlights, League } from '../utils/http';
import { YouTubeVideo } from '../types/highlights';

const imageCache = new Map<string, string>();
const rawHighlightsCache = new Map<League, YouTubeVideo[]>();
const optimizedHighlightsCache = new Map<League, YouTubeVideo[]>();

/**
 * Fetches and caches raw highlights data
 * @param league The league to fetch highlights for
 * @returns Raw highlights data
 */
async function fetchAndCacheHighlights(league: League): Promise<YouTubeVideo[]> {
  try {
    logger.info(`Fetching highlights for ${league}...`);
    const highlights = await httpFetchHighlights(league);

    if (!highlights || !Array.isArray(highlights)) {
      logger.warn(`No highlights returned for ${league}`);
      return [];
    }

    rawHighlightsCache.set(league, highlights);
    return highlights;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error fetching highlights for ${league}: ${errorMessage}`);
    throw error;
  }
}

/**
 * Fetches and optimizes an image
 * @param imageUrl URL of the image to optimize
 * @returns Optimized image as base64 string
 */
async function optimizeImage(imageUrl: string): Promise<string> {
  try {
    if (imageCache.has(imageUrl)) {
      return imageCache.get(imageUrl)!;
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer();

    const optimizedImage = `data:image/webp;base64,${optimizedBuffer.toString('base64')}`;

    imageCache.set(imageUrl, optimizedImage);

    return optimizedImage;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error optimizing image ${imageUrl}: ${errorMessage}`);
    throw error;
  }
}

/**
 * Optimizes all highlights for a league
 * @param league The league to optimize highlights for
 * @returns Array of videos with optimized thumbnails
 */
async function optimizeLeagueHighlights(league: League): Promise<YouTubeVideo[]> {
  try {
    let videos = rawHighlightsCache.get(league);
    if (!videos) {
      videos = await fetchAndCacheHighlights(league);
    }

    if (!videos || !Array.isArray(videos)) {
      logger.warn(`No videos found for league: ${league}`);
      return [];
    }

    const optimizedVideos = await Promise.all<YouTubeVideo>(
      videos.map(async (video): Promise<YouTubeVideo> => {
        if (!video.thumbnail) return video;

        try {
          const optimizedThumbnail = await optimizeImage(video.thumbnail);
          return {
            ...video,
            thumbnail: optimizedThumbnail,
          };
        } catch (error) {
          if (error instanceof Error) {
            logger.error(`An error occurred: ${error.message}`);
          } else {
            logger.error('An unknown error occurred.');
          }
          return video;
        }
      })
    );

    return optimizedVideos;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error in optimizeLeagueHighlights for ${league}: ${errorMessage}`);
    throw error;
  }
}

/**
 * Get optimized highlights from cache or generate them
 * @param league The league to get highlights for
 * @returns Array of videos with optimized thumbnails
 */
export async function getOptimizedHighlights(league: League) {
  if (optimizedHighlightsCache.has(league)) {
    return optimizedHighlightsCache.get(league)!;
  }

  const highlights = await optimizeLeagueHighlights(league);
  optimizedHighlightsCache.set(league, highlights);
  return highlights;
}

async function refreshAllHighlights() {
  try {
    logger.info('Starting highlights refresh...');

    await Promise.all([
      (async () => {
        try {
          await fetchAndCacheHighlights('nba');
          const optimized = await optimizeLeagueHighlights('nba');
          optimizedHighlightsCache.set('nba', optimized);
        } catch (error) {
          if (error instanceof Error) {
            logger.error(`An error occurred: ${error.message}`);
          } else {
            logger.error('An unknown error occurred.');
          }
        }
      })(),
      (async () => {
        try {
          await fetchAndCacheHighlights('wnba');
          const optimized = await optimizeLeagueHighlights('wnba');
          optimizedHighlightsCache.set('wnba', optimized);
        } catch (error) {
          if (error instanceof Error) {
            logger.error(`An error occurred: ${error.message}`);
          } else {
            logger.error('An unknown error occurred.');
          }
        }
      })(),
    ]);

    logger.info('Successfully refreshed all highlights');
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`An error occurred: ${error.message}`);
    } else {
      logger.error('An unknown error occurred.');
    }
  }
}

function scheduleHighlightRefresh() {
  cron.schedule('*/15 * * * *', refreshAllHighlights);

  (async () => {
    try {
      logger.info('Initial population of highlights cache...');
      await refreshAllHighlights();
      logger.info('Successfully populated highlights cache');
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`An error occurred: ${error.message}`);
      } else {
        logger.error('An unknown error occurred.');
      }
    }
  })();
}

export { scheduleHighlightRefresh };
