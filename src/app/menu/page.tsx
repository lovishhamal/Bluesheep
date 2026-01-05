import { Metadata } from "next";
import MenuClient from "./MenuClient";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Restaurant Menu | Hotel Blue Sheep Inn",
  description:
    "Discover the delicious food and drinks menu at Hotel Blue Sheep Inn. Enjoy local and international cuisine in our garden restaurant.",
  alternates: {
    canonical: "/menu/",
  },
  openGraph: {
    title: "Restaurant Menu | Hotel Blue Sheep Inn",
    description:
      "Discover the delicious food and drinks menu at Hotel Blue Sheep Inn. Enjoy local and international cuisine in our garden restaurant.",
  },
};

export default function MenuPage() {
  return <MenuClient />;
}

