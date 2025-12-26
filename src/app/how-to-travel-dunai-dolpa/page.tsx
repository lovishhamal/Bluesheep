import { Metadata } from "next";
import HowToReachDunai from "./HowToReachDunai";
import { getPrimaryVideo } from "../util/storage-server";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Reach Dunai, Dolpa (How to Travel) - Complete Guide 2025",
  description:
    "Complete guide on how to reach Dunai, Dolpa (and how to travel there). Find bus routes, flight options, travel times, costs, and tips for your journey from Kathmandu to Dunai, Dolpa, Nepal.",
  keywords:
    "how to reach dunai dolpa, how to travel to dunai dolpa, how to travel/reach dunai dolpa, dunai travel guide, dolpa travel, kathmandu to dunai, dunai bus route, dunai flight, travel to dolpa",
  alternates: {
    canonical: "/how-to-travel-dunai-dolpa",
  },
  openGraph: {
    title: "How to Reach Dunai, Dolpa (How to Travel) - Complete Guide",
    description:
      "Complete guide on how to reach Dunai, Dolpa (and how to travel there). Find bus routes, flight options, travel times, and costs.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-travel-dunai-dolpa",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
  const videoUrl = await getPrimaryVideo();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: "How to Reach Dunai, Dolpa",
    description:
      "How to reach Dunai, Dolpa from Kathmandu: bus routes, flight options, travel time, and practical tips.",
    fromLocation: {
      "@type": "City",
      name: "Kathmandu",
      addressCountry: "NP",
    },
    toLocation: {
      "@type": "City",
      name: "Dunai",
      addressRegion: "Dolpa",
      addressCountry: "NP",
    },
    result: {
      "@type": "Trip",
      name: "Travel to Dunai, Dolpa",
    },
  };

  return (
    <>
      <Script
        id="how-to-reach-dunai-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HowToReachDunai videoUrl={videoUrl} />
    </>
  );
}
