import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Travel Guide to Dolpa, Nepal | Hotel Blue Sheep Inn",
  description:
    "Complete travel guides to Dolpa, Nepal with routes, tips, and practical information for travelers.",
  keywords:
    "dolpa travel guide, dunai travel guide, how to travel to dolpa, kathmandu to dolpa, phoksundo travel guide",
  alternates: {
    canonical: "/how-to-travel-dunai-dolpa",
  },
  openGraph: {
    title: "Travel Guide to Dolpa, Nepal | Hotel Blue Sheep Inn",
    description:
      "Complete travel guides to Dolpa, Nepal with routes, tips, and practical information for travelers.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-travel-dunai-dolpa",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
  noStore();
  return <TravelGuidePage />;
}
