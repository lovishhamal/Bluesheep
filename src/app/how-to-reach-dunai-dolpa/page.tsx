import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Dunai (Dolpa) from Kathmandu | Bus, Flight to Juphal & Jeep",
  description:
    "Step-by-step routes to reach Dunai, Dolpa from Kathmandu: direct bus, bus + jeep via Radi/Tallubagar, or flight to Juphal with transfer to Dunai. Practical timing tips for Dolpa travel.",
  keywords:
    "how to reach dunai, how to reach dolpa, kathmandu to dunai bus, kathmandu to dolpa bus, flight to juphal, juphal to dunai jeep, dolpa travel route, dunai dolpa travel",
  alternates: {
    canonical: "/how-to-reach-dunai-dolpa/",
  },
  openGraph: {
    title:
      "How to Reach Dunai (Dolpa) from Kathmandu | Bus, Flight to Juphal & Jeep",
    description:
      "Step-by-step routes to reach Dunai, Dolpa from Kathmandu: direct bus, bus + jeep, or flight to Juphal. Practical timings and travel tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-dunai-dolpa/",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
  noStore();
  return <TravelGuidePage />;
}
