import sharp from 'sharp';
import logger from './logger';

/**
 * Optimizes an image from a given URL by resizing and converting it to WebP format.
 *
 * @async
 * @function
 * @param {string} url - The URL of the image to optimize
 * @returns {Promise<string | null>} - Returns a base64-encoded WebP image string on success, or null on failure
 * @example
 * const optimizedImage = await optimizeImage('https://example.com/image.jpg');
 * if (optimizedImage) {
 *   // Use the optimized image
 * }
 *
 * @description
 * This function performs the following operations:
 * 1. Fetches the image from the provided URL
 * 2. Resizes the image to a maximum width of 800px while maintaining aspect ratio
 * 3. Converts the image to WebP format with 80% quality
 * 4. Returns the optimized image as a base64-encoded data URL
 */
export async function optimizeImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      logger.warn(`Error fetching image: ${url}`);
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer();

    return `data:image/webp;base64,${optimizedBuffer.toString('base64')}`;
  } catch (error) {
    logger.error(
      `Error optimizing image: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
