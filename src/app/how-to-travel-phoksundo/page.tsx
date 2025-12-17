import { Metadata } from "next";
import HowToReachPhoksundo from "./HowToReachPhoksundo";
import { getPrimaryVideo } from "../util/storage-server";

export const metadata: Metadata = {
  title: "How to Reach Phoksundo Lake | Complete Travel Guide 2024",
  description:
    "Learn how to reach Phoksundo Lake in Dolpa. Step-by-step guide on flights to Juphal, trekking routes to Phoksundo, costs, and itinerary. Experience the deepest lake in Nepal.",
  keywords:
    "how to reach phoksundo, how to reach phoksundo lake, how to travel to phoksundo, kathmandu to phoksundo, trekking to phoksundo, shey phoksundo national park, dolpa trek",
  openGraph: {
    title: "How to Reach Phoksundo Lake | Complete Travel Guide",
    description:
      "Learn how to reach Phoksundo Lake in Dolpa. Step-by-step guide on flights, trekking routes, and itinerary. Experience the deepest lake in Nepal.",
    type: "website",
  },
};

export default async function HowToTravelPhoksundoPage() {
  const videoUrl = await getPrimaryVideo();
  return <HowToReachPhoksundo videoUrl={videoUrl} />;
}

