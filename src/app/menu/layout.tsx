import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Menu - Blue Sheep Hotel Dunai, Phoksundo",
  description:
    "Explore our delicious menu featuring authentic local cuisine and international dishes. Fresh ingredients, traditional recipes, and exceptional flavors await you at Blue Sheep Hotel.",
  keywords: [
    "restaurant menu Dunai",
    "food menu Phoksundo",
    "local cuisine Nepal",
    "hotel restaurant menu",
    "traditional Nepali food",
    "Blue Sheep Hotel menu",
    "Dunai dining",
    "Phoksundo restaurant",
  ],
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
