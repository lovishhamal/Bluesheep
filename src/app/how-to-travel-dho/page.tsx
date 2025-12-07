import { Metadata } from "next";
import HowToReachDho from "./HowToReachDho";
import { getPrimaryVideo } from "../util/storage-server";

export const metadata: Metadata = {
  title: "How to Travel to Dho, Dolpa - Complete Travel Guide 2024",
  description:
    "Complete guide on how to travel to Dho, Dolpa. Find bus routes, flight options, travel times, costs, and tips for your journey from Kathmandu to Dho, Dolpa, Nepal.",
  keywords:
    "how to travel to dho dolpa, dho travel guide, dolpa travel, kathmandu to dho, dho bus route, dho flight, travel to dho",
  openGraph: {
    title: "How to Travel to Dho, Dolpa - Complete Travel Guide",
    description:
      "Complete guide on how to travel to Dho, Dolpa. Find bus routes, flight options, travel times, and costs.",
    type: "website",
  },
};

export default async function HowToTravelDhoPage() {
  const videoUrl = await getPrimaryVideo();
  return <HowToReachDho videoUrl={videoUrl} />;
}

