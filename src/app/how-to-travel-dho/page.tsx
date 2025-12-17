import { Metadata } from "next";
import HowToReachDho from "./HowToReachDho";
import { getPrimaryVideo } from "../util/storage-server";

export const metadata: Metadata = {
  title: "How to Reach Dho Tarap | Complete Travel Guide 2024",
  description:
    "Find out how to reach Dho Tarap, Dolpa. Comprehensive guide on travel routes, flights, and trekking to the highest human settlement. Explore the hidden gem of Dolpa.",
  keywords:
    "how to reach dho, how to reach dho tarap, how to reach dolpa, travel to dho tarap, kathmandu to dho, upper dolpa trek, dho tarap travel guide",
  openGraph: {
    title: "How to Reach Dho Tarap | Complete Travel Guide",
    description:
      "Find out how to reach Dho Tarap, Dolpa. Comprehensive guide on travel routes, flights, and trekking to the highest human settlement.",
    type: "website",
  },
};

export default async function HowToTravelDhoPage() {
  const videoUrl = await getPrimaryVideo();
  return <HowToReachDho videoUrl={videoUrl} />;
}

