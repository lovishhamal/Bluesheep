import { Metadata } from "next";
import HowToReachDunai from "./HowToReachDunai";
import { getPrimaryVideo } from "../util/storage-server";

export const metadata: Metadata = {
  title: "How to Travel to Dunai Dolpa - Complete Travel Guide 2024",
  description:
    "Complete guide on how to travel to Dunai, Dolpa. Find bus routes, flight options, travel times, costs, and tips for your journey from Kathmandu to Dunai, Dolpa, Nepal.",
  keywords:
    "how to travel to dunai dolpa, dunai travel guide, dolpa travel, kathmandu to dunai, dunai bus route, dunai flight, travel to dolpa",
  openGraph: {
    title: "How to Travel to Dunai Dolpa - Complete Travel Guide",
    description:
      "Complete guide on how to travel to Dunai, Dolpa. Find bus routes, flight options, travel times, and costs.",
    type: "website",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
  const videoUrl = await getPrimaryVideo();
  return <HowToReachDunai videoUrl={videoUrl} />;
}

