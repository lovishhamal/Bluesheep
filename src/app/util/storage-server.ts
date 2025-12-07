import { createClient } from "./supabase-server";
import { StorageImage, Review } from "./storage";

// Function to get public URL for images from Supabase storage (server-side)
export const getImageUrl = (
  supabaseUrl: string,
  bucket: string,
  folder: string,
  fileName: string
) => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${folder}/${fileName}`;
};

// Function to list all images from a specific folder in a bucket (server-side)
export const getImagesFromFolder = async (
  bucket: string,
  folder: string
): Promise<StorageImage[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucket).list(folder);

    if (error) {
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    // Filter for image files and create full URLs
    const imageFiles: StorageImage[] =
      data
        ?.filter((file: { name: string }) => {
          const extension = file.name.toLowerCase().split(".").pop();
          const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(
            extension || ""
          );

          return isImage;
        })
        .map((file: { name: string }): StorageImage => {
          const url = getImageUrl(supabaseUrl, bucket, folder, file.name);

          return {
            name: file.name,
            url: url,
            alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          };
        }) || [];

    return imageFiles;
  } catch (error) {
    return [];
  }
};

// Function to fetch reviews from Supabase database table (server-side)
export const getReviews = async (): Promise<Review[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return data || [];
  } catch (error) {
    return [];
  }
};

// Type definition for public_links table
export interface PublicLink {
  id: number;
  created_at: string;
  link: string;
  type: "image" | "video";
  sort_order?: number; // Optional: add this column for custom sorting (offer_1, offer_2, etc.)
}

// Function to fetch public links from Supabase public_links table (server-side)
export const getPublicLinks = async (
  type?: "image" | "video"
): Promise<PublicLink[]> => {
  try {
    const supabase = await createClient();
    let query = supabase.from("public_links").select("*");

    // Filter by type if provided
    if (type) {
      query = query.eq("type", type);
    }

    // Order by sort_order if available, otherwise by created_at
    // If you add a sort_order column, you can use: .order("sort_order", { ascending: true, nullsFirst: false })
    const { data, error } = await query.order("created_at", {
      ascending: true,
    });

    if (error) {
      return [];
    }

    // Cast data to PublicLink[] type
    const typedData = (data as PublicLink[]) || [];

    // If sort_order column exists, sort by it; otherwise keep created_at order
    if (typedData && typedData.length > 0 && "sort_order" in typedData[0]) {
      typedData.sort((a, b) => {
        const aOrder = a.sort_order ?? Infinity;
        const bOrder = b.sort_order ?? Infinity;
        return aOrder - bOrder;
      });
    }

    return typedData;
  } catch (error) {
    console.error("[Supabase] Error fetching public links:", error);
    return [];
  }
};

/**
 * Extract offer number from image name/URL
 * Examples: "offer_1.jpg" -> 1, "offer_10.jpg" -> 10, "offer_123.jpg" -> 123
 * Returns null if not an offer image
 */
const extractOfferNumber = (url: string): number | null => {
  try {
    // Get filename from URL (remove query parameters)
    const urlWithoutParams = url.split("?")[0];
    const fileName = urlWithoutParams.split("/").pop() || "";

    // Check if filename contains "offer_" pattern
    const offerMatch = fileName.match(/offer_(\d+)/i);
    if (offerMatch && offerMatch[1]) {
      return parseInt(offerMatch[1], 10);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Function to fetch carousel images from public_links table
export const getCarouselImages = async (): Promise<StorageImage[]> => {
  try {
    const links = await getPublicLinks("image");

    // Map links to StorageImage format
    const images = links.map((link): StorageImage => {
      // Extract filename from URL (handle query params)
      const urlWithoutParams = link.link.split("?")[0];
      const fileName = urlWithoutParams.split("/").pop() || `image-${link.id}`;

      return {
        name: fileName,
        url: link.link,
        alt:
          fileName
            .replace(/\.[^/.]+$/, "") // Remove file extension
            .replace(/[-_]/g, " ") // Replace dashes/underscores with spaces
            .trim() || "Carousel Image",
      };
    });

    // Sort images: offer_ images first (by number), then others
    images.sort((a, b) => {
      const aOfferNum = extractOfferNumber(a.url);
      const bOfferNum = extractOfferNumber(b.url);

      // Both are offer images - sort by number
      if (aOfferNum !== null && bOfferNum !== null) {
        return aOfferNum - bOfferNum;
      }

      // Only 'a' is an offer image - it comes first
      if (aOfferNum !== null && bOfferNum === null) {
        return -1;
      }

      // Only 'b' is an offer image - it comes first
      if (aOfferNum === null && bOfferNum !== null) {
        return 1;
      }

      // Neither is an offer image - maintain original order (created_at)
      return 0;
    });

    // Log sorting results for debugging
    const offerImages = images.filter(
      (img) => extractOfferNumber(img.url) !== null
    );
    const otherImages = images.filter(
      (img) => extractOfferNumber(img.url) === null
    );
    console.log(
      `[Supabase] Sorted ${images.length} carousel images: ${offerImages.length} offer images first, ${otherImages.length} other images`
    );
    if (offerImages.length > 0) {
      console.log(
        `[Supabase] Offer images order:`,
        offerImages
          .map((img) => {
            const num = extractOfferNumber(img.url);
            return `offer_${num}`;
          })
          .join(", ")
      );
    }

    return images;
  } catch (error) {
    console.error("[Supabase] Error fetching carousel images:", error);
    return [];
  }
};

// Function to fetch videos from public_links table
export const getVideos = async (): Promise<string[]> => {
  try {
    const links = await getPublicLinks("video");
    return links.map((link) => link.link);
  } catch (error) {
    console.error("[Supabase] Error fetching videos:", error);
    return [];
  }
};

// Function to get the primary/first video URL (for components that need a single video)
export const getPrimaryVideo = async (): Promise<string | null> => {
  try {
    const videos = await getVideos();
    return videos.length > 0 ? videos[0] : null;
  } catch (error) {
    console.error("[Supabase] Error fetching primary video:", error);
    return null;
  }
};
