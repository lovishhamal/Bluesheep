import { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Hotel in Phoksundo & Dunai | Rooms & Accommodation | Hotel Blue Sheep Inn",
  description:
    "Explore comfortable hotel rooms and accommodation for travelers heading to Shey Phoksundo Lake. Deluxe rooms with attached baths, hot water, Wi-Fi & mountain views in Dunai, Dolpa.",
  keywords: [
    "hotel in phoksundo",
    "hotels in phoksundo",
    "hotel phoksundo",
    "shey phoksundo hotel",
    "hotel in dunai",
    "dolpa hotel",
    "rooms in dolpa",
    "phoksundo hotel booking",
    "accommodation in phoksundo",
  ],
  alternates: {
    canonical: "/rooms/",
  },
  openGraph: {
    title: "Hotel in Phoksundo & Dunai | Rooms & Accommodation",
    description:
      "Comfortable rooms and lodging at Hotel Blue Sheep Inn, Dunai. Deluxe rooms with hot showers, Wi-Fi, and trekking logistics for Shey Phoksundo Lake.",
    images: ["/rooms-og.jpg"],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}

