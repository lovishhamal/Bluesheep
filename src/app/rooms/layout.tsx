import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Hotel Rooms in Dunai | Luxury Accommodation",
  description:
    "🏨 Book the best hotel rooms in Dunai. Luxury accommodation with mountain views, modern amenities, and exceptional service. Best hotel in the region!",
  keywords: [
    "best hotel in dunai",
    "hotel rooms dunai",
    "hotel in phoksundo",
    "best hotel in phoksundo",
    "luxury accommodation dunai",
    "hotel booking dunai",
    "Dunai accommodation",
    "Dolpa hotel rooms",
    "mountain view rooms",
    "Blue Sheep Hotel rooms",
  ],
  openGraph: {
    title: "Best Hotel Rooms in Dunai | Luxury Accommodation",
    description:
      "🏨 Book the best hotel rooms in Dunai. Luxury accommodation with mountain views and modern amenities.",
    url: "https://bluesheephotel.com/rooms",
    images: [
      {
        url: "/hotel-room.jpg",
        width: 1200,
        height: 630,
        alt: "Best Hotel Rooms in Dunai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Hotel Rooms in Dunai | Luxury Accommodation",
    description:
      "🏨 Book the best hotel rooms in Dunai. Luxury accommodation with mountain views and modern amenities.",
    images: ["/hotel-room.jpg"],
  },
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
