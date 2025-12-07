import ImageKit from "imagekit";
import { IMAGEKIT_CONFIG } from "./imagekit-config";
import { StorageImage } from "./storage";

// Initialize ImageKit client for server-side API calls
const getImageKitClient = (): ImageKit | null => {
  if (!IMAGEKIT_CONFIG.privateKey) {
    console.warn(
      "[ImageKit] Private key not configured. Set IMAGEKIT_PRIVATE_KEY environment variable to fetch images dynamically."
    );
    return null;
  }

  return new ImageKit({
    publicKey: IMAGEKIT_CONFIG.publicKey,
    privateKey: IMAGEKIT_CONFIG.privateKey,
    urlEndpoint: IMAGEKIT_CONFIG.urlEndpoint,
  });
};

/**
 * Fetch images from ImageKit Media Library API
 * @param folderPath - Folder path in ImageKit (e.g., "/banners" or "/carousel")
 * @returns Array of StorageImage objects
 */
export const getImagesFromImageKit = async (
  folderPath: string = "/banners"
): Promise<StorageImage[]> => {
  try {
    const imagekit = getImageKitClient();

    if (!imagekit) {
      console.error(
        "[ImageKit] Cannot fetch images: ImageKit client not initialized"
      );
      return [];
    }

    // Ensure folder path starts with /
    const normalizedPath = folderPath.startsWith("/")
      ? folderPath
      : `/${folderPath}`;
    // Ensure folder path ends with /
    const searchPath = normalizedPath.endsWith("/")
      ? normalizedPath
      : `${normalizedPath}/`;

    console.log(`[ImageKit] Fetching images from folder: ${searchPath}`);

    // List files from ImageKit Media Library
    const result = await new Promise<any>((resolve, reject) => {
      imagekit.listFiles(
        {
          path: searchPath,
          type: "file", // Only get files, not folders
          fileType: "image", // Only get image files
          limit: 100, // Maximum number of files to fetch
          sort: "ASC_NAME", // Sort by name ascending
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (!result || !Array.isArray(result)) {
      console.warn(`[ImageKit] No images found in folder: ${searchPath}`);
      return [];
    }

    console.log(
      `[ImageKit] Found ${result.length} images in folder: ${searchPath}`
    );

    // Filter and transform ImageKit file objects to StorageImage format
    const images: StorageImage[] = result
      .filter((file: any) => {
        // Additional filtering for image files
        const extension = file.name?.toLowerCase().split(".").pop();
        const isImage = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(
          extension || ""
        );
        return isImage && file.type === "file";
      })
      .map((file: any): StorageImage => {
        // ImageKit file path format: /banners/image.jpg
        const filePath = file.filePath || file.path || "";
        const fileName = file.name || filePath.split("/").pop() || "";

        return {
          name: fileName,
          url: file.url || `${IMAGEKIT_CONFIG.urlEndpoint}${filePath}`,
          alt:
            fileName
              .replace(/\.[^/.]+$/, "") // Remove file extension
              .replace(/[-_]/g, " ") // Replace dashes/underscores with spaces
              .trim() || "Image",
        };
      });

    console.log(`[ImageKit] Successfully fetched ${images.length} images`);
    return images;
  } catch (error: any) {
    console.error("[ImageKit] Error fetching images from ImageKit:", error);
    console.error("[ImageKit] Error details:", {
      message: error?.message,
      status: error?.status,
      response: error?.response,
    });
    return [];
  }
};

// Helper to construct ImageKit URL
export const getImageKitImageUrl = (path: string): string => {
  if (path.startsWith("http")) {
    return path; // Already a full URL
  }
  return `${IMAGEKIT_CONFIG.urlEndpoint}/${path}`;
};
