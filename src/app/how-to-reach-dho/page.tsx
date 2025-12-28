import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Dho Tarap (Upper Dolpa) from Kathmandu | Route, Trek & Permits",
  description:
    "Practical guide to reach Dho Tarap in Upper Dolpa from Kathmandu via Juphal/Dunai, including travel stages, timing guidance, and what to plan for remote Dolpa travel.",
  keywords:
    "how to reach dho tarap, how to reach dho dolpa, dho tarap upper dolpa, kathmandu to dho tarap, juphal to dunai, dunai to dho tarap, upper dolpa permits, dolpo trek route",
  alternates: {
    canonical: "/how-to-reach-dho/",
  },
  openGraph: {
    title:
      "How to Reach Dho Tarap (Upper Dolpa) from Kathmandu | Route, Trek & Permits",
    description:
      "Practical guide to reach Dho Tarap in Upper Dolpa from Kathmandu via Juphal/Dunai, with travel stages, timing, and planning tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-dho/",
  },
};

export default async function HowToTravelDhoPage() {
  noStore();
  return <TravelGuidePage />;
}
