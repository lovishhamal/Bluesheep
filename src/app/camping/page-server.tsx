import { getImagesFromFolder } from "../util/storage-server";
import { StorageImage } from "../util/storage";
import CampingPageClient from "./CampingPageClient";

export default async function CampingPage() {
  const campingImages = await getImagesFromFolder("images", "camping");

  return <CampingPageClient initialCampingImages={campingImages} />;
}

