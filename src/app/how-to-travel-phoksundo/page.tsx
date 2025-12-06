import { Metadata } from "next";
import HowToReachPhoksundo from "./HowToReachPhoksundo";

export const metadata: Metadata = {
  title: "How to Travel to Phoksundo Lake, Dolpa - Complete Travel Guide 2024",
  description:
    "Complete guide on how to travel to Phoksundo Lake, Dolpa. Find trekking routes, travel times, costs, and tips for your journey to Phoksundo Lake, Nepal's deepest lake.",
  keywords:
    "how to travel to phoksundo lake, phoksundo travel guide, phoksundo lake dolpa, kathmandu to phoksundo, phoksundo trek, phoksundo lake travel",
  openGraph: {
    title: "How to Travel to Phoksundo Lake, Dolpa - Complete Travel Guide",
    description:
      "Complete guide on how to travel to Phoksundo Lake, Dolpa. Find trekking routes, travel times, and costs.",
    type: "website",
  },
};

export default function HowToTravelPhoksundoPage() {
  return <HowToReachPhoksundo />;
}

