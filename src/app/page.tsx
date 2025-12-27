import { getImagesFromFolder, getReviews } from "./util/storage-server";
import { transformBannerImages } from "./util/image-helpers";
import { GalleryImage } from "./components/CreativeImageCarousel";
import HomeClient from "./components/HomeClient";
import { getCarouselImagesFromSupabase } from "./util/carousel-images-config";

export const revalidate = 3600;

export default async function Home() {
  // Fetch all data server-side
  // Carousel images from Supabase public_links table (type='image')
  const [bannerImages, reviews, hotelGalleryImages] = await Promise.all([
    getCarouselImagesFromSupabase(),
    getReviews(),
    getImagesFromFolder("images", "gallery"),
  ]);

  // Transform banner images
  const initialGalleryImages: GalleryImage[] =
    transformBannerImages(bannerImages);

  return (
    <HomeClient
      initialGalleryImages={initialGalleryImages}
      initialReviews={reviews}
      initialHotelGalleryImages={hotelGalleryImages}
    />
  );
}
