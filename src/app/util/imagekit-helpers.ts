import { IMAGEKIT_CONFIG } from "./imagekit-config";

// Check if URL is from ImageKit
export const isImageKitUrl = (url: string): boolean => {
  return url.includes(IMAGEKIT_CONFIG.urlEndpoint);
};

// Extract ImageKit path from full URL
export const getImageKitPath = (url: string): string => {
  console.log(`[ImageKit] Extracting path from URL: ${url}`);
  
  if (isImageKitUrl(url)) {
    const path = url.replace(`${IMAGEKIT_CONFIG.urlEndpoint}/`, "");
    console.log(`[ImageKit] Extracted path: ${path}`);
    return path;
  }
  // If it's already a path (not a full URL), return as is
  if (!url.startsWith("http")) {
    console.log(`[ImageKit] URL is already a path: ${url}`);
    return url;
  }
  // For other URLs (like Supabase), return empty string to use src instead
  console.log(`[ImageKit] URL is not from ImageKit, returning empty path`);
  return "";
};

// Get ImageKit URL for videos
export const getImageKitVideoUrl = (path: string): string => {
  if (path.startsWith("http")) {
    return path; // Already a full URL
  }
  return `${IMAGEKIT_CONFIG.urlEndpoint}/${path}`;
};

