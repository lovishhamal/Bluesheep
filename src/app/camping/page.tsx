import { Metadata } from "next";
import { getImagesFromFolder } from "../util/storage-server";
import CampingPageClient from "./CampingPageClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Camping & Tents | Hotel Blue Sheep Inn",
  description:
    "Experience camping in Dolpa at Hotel Blue Sheep Inn. We provide tent accommodation and camping facilities for trekkers and nature lovers.",
  alternates: {
    canonical: "/camping/",
  },
  openGraph: {
    title: "Camping & Tents | Hotel Blue Sheep Inn",
    description:
      "Experience camping in Dolpa at Hotel Blue Sheep Inn. We provide tent accommodation and camping facilities for trekkers and nature lovers.",
  },
};

export default async function CampingPage() {
  // Load only first 20 images initially for better performance
  const campingImages = await getImagesFromFolder("images", "camping", 20);

  return <CampingPageClient initialCampingImages={campingImages} />;
}
