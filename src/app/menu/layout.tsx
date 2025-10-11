import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garden Restaurant in Dunai, Phoksundo | Best Dining Experience",
  description:
    "🍽️ Experience the best garden restaurant in Dunai, Phoksundo. Fresh local cuisine with mountain views. Best restaurant in the region with garden dining!",
  keywords: [
    "garden restaurant",
    "garden restaurant dunai",
    "garden restaurant phoksundo",
    "restaurant dunai",
    "restaurant phoksundo",
    "best restaurant dunai",
    "best restaurant phoksundo",
    "dining dunai",
    "dining phoksundo",
    "local cuisine dunai",
    "mountain view restaurant",
    "garden dining",
    "Blue Sheep Hotel restaurant",
  ],
  openGraph: {
    title: "Garden Restaurant in Dunai, Phoksundo | Best Dining Experience",
    description:
      "🍽️ Experience the best garden restaurant in Dunai, Phoksundo. Fresh local cuisine with mountain views and garden dining.",
    url: "https://bluesheephotel.com/menu",
    images: [
      {
        url: "/dining-area.jpg",
        width: 1200,
        height: 630,
        alt: "Garden Restaurant in Dunai, Phoksundo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Restaurant in Dunai, Phoksundo | Best Dining Experience",
    description:
      "🍽️ Experience the best garden restaurant in Dunai, Phoksundo. Fresh local cuisine with mountain views and garden dining.",
    images: ["/dining-area.jpg"],
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
