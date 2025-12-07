import { StorageImage } from "./storage";
import { GalleryImage } from "../components/CreativeImageCarousel";

// Helper function to generate title from filename
export const getImageTitle = (fileName: string, index: number) => {
  const nameWithoutExt = fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ");
  const capitalized = nameWithoutExt
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return capitalized || `Image ${index + 1}`;
};

// Helper function to generate description from filename
export const getImageDescription = (fileName: string) => {
  const nameWithoutExt = fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ");
  return `Beautiful view from Hotel Blue Sheep Inn - ${nameWithoutExt}`;
};

// Transform and sort banner images
export const transformBannerImages = (
  images: StorageImage[]
): GalleryImage[] => {
  if (!images || images.length === 0) {
    return [
      {
        src: "/phoksundo.jpg",
        alt: "Mountain View",
        title: "Mountain Views",
        description: "Stunning Himalayan mountain views from our hotel",
      },
    ];
  }

  // Sort images: offer_1, offer_2, offer_3...offer_n first (in order), then rest
  const sortedImages = [...images].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    // Extract offer number if present (e.g., "offer_1" -> 1, "offer_2" -> 2)
    const getOfferNumber = (name: string): number | null => {
      const match = name.match(/offer[_-](\d+)/);
      return match ? parseInt(match[1], 10) : null;
    };

    const aOfferNum = getOfferNumber(aName);
    const bOfferNum = getOfferNumber(bName);

    // Both have offer numbers - sort by number
    if (aOfferNum !== null && bOfferNum !== null) {
      return aOfferNum - bOfferNum;
    }

    // Only a has offer number - a comes first
    if (aOfferNum !== null && bOfferNum === null) {
      return -1;
    }

    // Only b has offer number - b comes first
    if (aOfferNum === null && bOfferNum !== null) {
      return 1;
    }

    // Neither has offer number - sort alphabetically
    return aName.localeCompare(bName);
  });

  // Transform Supabase images to match our gallery format
  return sortedImages.map((image: StorageImage, index: number) => ({
    src: image.url,
    alt: image.alt,
    title: getImageTitle(image.name, index),
    description: getImageDescription(image.name),
  }));
};

