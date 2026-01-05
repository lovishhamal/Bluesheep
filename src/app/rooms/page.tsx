import { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Rooms & Accommodation | Hotel Blue Sheep Inn",
  description:
    "Explore our comfortable rooms and accommodations at Hotel Blue Sheep Inn, Dunai. We offer a variety of rooms to suit your needs.",
  alternates: {
    canonical: "/rooms/",
  },
  openGraph: {
    title: "Rooms & Accommodation | Hotel Blue Sheep Inn",
    description:
      "Explore our comfortable rooms and accommodations at Hotel Blue Sheep Inn, Dunai. We offer a variety of rooms to suit your needs.",
    images: ["/rooms-og.jpg"],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}

