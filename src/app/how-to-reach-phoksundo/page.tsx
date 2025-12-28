import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Shey Phoksundo Lake (Dolpa) from Kathmandu | Flight, Jeep & Trek",
  description:
    "Complete route guide to reach Shey Phoksundo Lake in Dolpa: Kathmandu to Juphal flight options, transfer to Dunai, and trekking stages to Phoksundo. Timing and practical tips for first-time visitors.",
  keywords:
    "how to reach phoksundo lake, shey phoksundo lake how to reach, kathmandu to phoksundo, flight to juphal phoksundo, juphal to phoksundo trek, dolpa phoksundo trekking route, shey phoksundo national park",
  alternates: {
    canonical: "/how-to-reach-phoksundo/",
  },
  openGraph: {
    title:
      "How to Reach Shey Phoksundo Lake (Dolpa) from Kathmandu | Flight, Jeep & Trek",
    description:
      "Complete route guide to reach Shey Phoksundo Lake in Dolpa with flight, transfer, and trekking stages. Timing and practical tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-phoksundo/",
  },
};

export default async function HowToTravelPhoksundoPage() {
  noStore();
  return <TravelGuidePage />;
}
