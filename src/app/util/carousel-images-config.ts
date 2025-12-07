import { StorageImage } from "./storage";
import { getCarouselImages } from "./storage-server";

/**
 * Fetch carousel images from Supabase public_links table
 * Images are fetched from the public_links table where type = 'image'
 *
 * Sorting:
 * - Images with names containing "offer_" (e.g., offer_1.jpg, offer_10.jpg) are shown FIRST
 * - Offer images are sorted by number (offer_1, offer_2, ..., offer_10, etc.)
 * - Other images come after offer images, sorted by created_at
 *
 * @returns Array of StorageImage objects for the carousel
 */
export const getCarouselImagesFromSupabase = async (): Promise<
  StorageImage[]
> => {
  console.log("[Supabase] Fetching carousel images from public_links table...");

  try {
    const images = await getCarouselImages();

    console.log(
      `[Supabase] Successfully fetched ${images.length} carousel images`
    );

    if (images.length === 0) {
      console.warn(
        `[Supabase] No images found in public_links table with type='image'. ` +
          `Make sure to add images to the public_links table in Supabase.`
      );
    }

    return images;
  } catch (error) {
    console.error("[Supabase] Error fetching carousel images:", error);
    return [];
  }
};

// Legacy export for backward compatibility
export const getCarouselImagesFromImageKit = getCarouselImagesFromSupabase;
export const CAROUSEL_IMAGE_PATHS: string[] = [];
