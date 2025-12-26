import { unstable_noStore as noStore } from "next/cache";
import { getImagesFromFolder } from "../util/storage-server";
import CampingPageClient from "./CampingPageClient";

export const revalidate = 0;

export default async function CampingPage() {
  noStore();
  // Load only first 20 images initially for better performance
  const campingImages = await getImagesFromFolder("images", "camping", 20);

  return <CampingPageClient initialCampingImages={campingImages} />;
}
