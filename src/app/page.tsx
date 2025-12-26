import { getImagesFromFolder, getReviews, getPrimaryVideo } from "./util/storage-server";
import { transformBannerImages } from "./util/image-helpers";
import { StorageImage, Review } from "./util/storage";
import { GalleryImage } from "./components/CreativeImageCarousel";
import HomeClient from "./components/HomeClient";
import { getCarouselImagesFromSupabase } from "./util/carousel-images-config";

export default async function Home() {
  // Fetch all data server-side
  // Carousel images from Supabase public_links table (type='image')
  // Videos from Supabase public_links table (type='video')
  const [bannerImages, reviews, hotelGalleryImages, videoUrl] = await Promise.all([
    getCarouselImagesFromSupabase(),
    getReviews(),
    getImagesFromFolder("images", "gallery"),
    getPrimaryVideo(),
  ]);

  // Transform banner images
  const initialGalleryImages: GalleryImage[] =
    transformBannerImages(bannerImages);

  return (
    <HomeClient
      initialGalleryImages={initialGalleryImages}
      initialReviews={reviews}
      initialHotelGalleryImages={hotelGalleryImages}
      videoUrl={videoUrl}
    />
  );
}
