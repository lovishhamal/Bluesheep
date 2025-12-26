import { Metadata } from "next";
import HowToReachPhoksundo from "./HowToReachPhoksundo";
import { getPrimaryVideo } from "../util/storage-server";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Reach Phoksundo Lake, Dolpa (How to Travel) - Guide 2025",
  description:
    "Complete guide on how to reach Phoksundo Lake, Dolpa (and how to travel there). Find trekking routes, travel times, costs, and tips for your journey to Nepal's deepest lake.",
  keywords:
    "how to reach phoksundo lake, how to reach phoksundo, how to travel to phoksundo lake, how to travel/reach phoksundo lake, phoksundo travel guide, phoksundo lake dolpa, kathmandu to phoksundo, phoksundo trek, phoksundo lake travel",
  alternates: {
    canonical: "/how-to-travel-phoksundo",
  },
  openGraph: {
    title: "How to Reach Phoksundo Lake, Dolpa (How to Travel) - Guide",
    description:
      "Complete guide on how to reach Phoksundo Lake, Dolpa (and how to travel there). Find trekking routes, travel times, and costs.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-travel-phoksundo",
  },
};

export default async function HowToTravelPhoksundoPage() {
  const videoUrl = await getPrimaryVideo();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: "How to Reach Phoksundo Lake, Dolpa",
    description:
      "How to reach Phoksundo Lake, Dolpa from Kathmandu: flights, trek routes, travel time, and practical tips.",
    fromLocation: {
      "@type": "City",
      name: "Kathmandu",
      addressCountry: "NP",
    },
    toLocation: {
      "@type": "TouristAttraction",
      name: "Phoksundo Lake",
      addressRegion: "Dolpa",
      addressCountry: "NP",
    },
    result: {
      "@type": "Trip",
      name: "Travel to Phoksundo Lake, Dolpa",
    },
  };

  return (
    <>
      <Script
        id="how-to-reach-phoksundo-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HowToReachPhoksundo videoUrl={videoUrl} />
    </>
  );
}
