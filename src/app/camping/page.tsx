import { unstable_noStore as noStore } from "next/cache";
import { getImagesFromFolder } from "../util/storage-server";
import CampingPageClient from "./CampingPageClient";

export const revalidate = 0;

export default async function CampingPage() {
  noStore();
  const campingImages = await getImagesFromFolder("images", "camping");

  return <CampingPageClient initialCampingImages={campingImages} />;
}
