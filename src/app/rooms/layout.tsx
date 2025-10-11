import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Rooms & Suites - Blue Sheep Hotel Dunai, Phoksundo",
  description:
    "Experience luxury accommodation in Dunai, Phoksundo. Our rooms offer stunning mountain views, modern amenities, and exceptional comfort. Book your perfect stay today.",
  keywords: [
    "hotel rooms Dunai",
    "luxury accommodation Phoksundo",
    "mountain view rooms",
    "hotel suites Dunai",
    "Phoksundo hotel rooms",
    "Blue Sheep Hotel rooms",
  ],
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
