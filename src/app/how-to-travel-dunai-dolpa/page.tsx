import { Metadata } from "next";
import HowToReachDunai from "./HowToReachDunai";
import { getPrimaryVideo } from "../util/storage-server";

export const metadata: Metadata = {
  title: "How to Reach Dunai Dolpa | Complete Travel Guide 2024",
  description:
    "Discover how to reach Dunai Dolpa. Detailed guide on bus routes, flight options from Kathmandu to Nepalgunj to Juphal, and trekking to Dunai. Plan your trip to Dolpa now!",
  keywords:
    "how to reach dunai dolpa, how to reach dolpa, how to travel to dunai, kathmandu to dunai, nepalgunj to dunai, juphal to dunai, dunai travel guide, dolpa travel",
  openGraph: {
    title: "How to Reach Dunai Dolpa | Complete Travel Guide",
    description:
      "Discover how to reach Dunai Dolpa. Detailed guide on bus routes, flight options, and trekking. Plan your trip to Dolpa now!",
    type: "website",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
  const videoUrl = await getPrimaryVideo();
  return <HowToReachDunai videoUrl={videoUrl} />;
}

