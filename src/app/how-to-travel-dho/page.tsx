import { Metadata } from "next";
import HowToReachDho from "./HowToReachDho";
import { getPrimaryVideo } from "../util/storage-server";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Reach Dho, Dolpa (How to Travel) - Complete Guide",
  description:
    "Complete guide on how to reach Dho, Dolpa (and how to travel there). Find bus routes, flight options, travel times, costs, and tips for your journey from Kathmandu to Dho, Dolpa, Nepal.",
  keywords:
    "how to reach dho dolpa, how to travel to dho dolpa, how to travel/reach dho dolpa, dho travel guide, dolpa travel, kathmandu to dho, dho bus route, dho flight, travel to dho",
  alternates: {
    canonical: "/how-to-travel-dho",
  },
  openGraph: {
    title: "How to Reach Dho, Dolpa (How to Travel) - Complete Guide",
    description:
      "Complete guide on how to reach Dho, Dolpa (and how to travel there). Find bus routes, flight options, travel times, and costs.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-travel-dho",
  },
};

export default async function HowToTravelDhoPage() {
  const videoUrl = await getPrimaryVideo();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: "How to Reach Dho, Dolpa",
    description:
      "How to reach Dho, Dolpa from Kathmandu: bus routes, flights, travel time, and practical tips.",
    fromLocation: {
      "@type": "City",
      name: "Kathmandu",
      addressCountry: "NP",
    },
    toLocation: {
      "@type": "City",
      name: "Dho",
      addressRegion: "Dolpa",
      addressCountry: "NP",
    },
    result: {
      "@type": "Trip",
      name: "Travel to Dho, Dolpa",
    },
  };

  return (
    <>
      <Script
        id="how-to-reach-dho-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HowToReachDho videoUrl={videoUrl} />
    </>
  );
}
