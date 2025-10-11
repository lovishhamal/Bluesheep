import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Camping in Dunai, Phoksundo | Garden Camping Experience",
  description:
    "🏕️ Experience the best camping in Dunai, Phoksundo. Garden camping with stunning mountain views and modern facilities. Book your camping spot today!",
  keywords: [
    "camping",
    "camping dunai",
    "camping phoksundo",
    "best camping dunai",
    "best camping phoksundo",
    "garden camping",
    "tent camping dunai",
    "camping phoksundo lake",
    "outdoor camping",
    "mountain camping",
    "camping facilities",
    "Blue Sheep Hotel camping",
  ],
  openGraph: {
    title: "Best Camping in Dunai, Phoksundo | Garden Camping Experience",
    description:
      "🏕️ Experience the best camping in Dunai, Phoksundo. Garden camping with stunning mountain views and modern facilities.",
    url: "https://bluesheephotel.com/camping",
    images: [
      {
        url: "/phoksundo-lake.jpg",
        width: 1200,
        height: 630,
        alt: "Best Camping in Dunai, Phoksundo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Camping in Dunai, Phoksundo | Garden Camping Experience",
    description:
      "🏕️ Experience the best camping in Dunai, Phoksundo. Garden camping with stunning mountain views and modern facilities.",
    images: ["/phoksundo-lake.jpg"],
  },
};

export default function CampingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
