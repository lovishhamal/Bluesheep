import { getImagesFromFolder, getReviews } from "./util/storage-server";
import { transformBannerImages } from "./util/image-helpers";
import { StorageImage, Review } from "./util/storage";
import { GalleryImage } from "./components/CreativeImageCarousel";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  // Fetch all data server-side
  const [bannerImages, reviews, hotelGalleryImages] = await Promise.all([
    getImagesFromFolder("images", "banners"),
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
