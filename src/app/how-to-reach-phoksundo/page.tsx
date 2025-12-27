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
    "dolpa travel guide, phoksundo travel guide, how to travel to dolpa, kathmandu to dolpa, dunai travel guide",
  alternates: {
    canonical: "/how-to-travel-phoksundo",
  },
  openGraph: {
    title: "Travel Guide to Dolpa, Nepal | Hotel Blue Sheep Inn",
    description:
      "Complete travel guides to Dolpa, Nepal with routes, tips, and practical information for travelers.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-travel-phoksundo",
  },
};

export default async function HowToTravelPhoksundoPage() {
  noStore();
  return <TravelGuidePage />;
}
