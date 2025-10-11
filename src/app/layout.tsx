import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Blue Sheep Hotel - Best Hotel in Dunai, Phoksundo | Luxury Accommodation",
  description:
    "Experience luxury hospitality at Blue Sheep Hotel in Dunai, Phoksundo. Best hotel in the region with modern amenities, stunning mountain views, and exceptional service. Book your stay today!",
  keywords: [
    "hotel in Dunai",
    "hotel in Phoksundo",
    "best hotel Phoksundo",
    "luxury hotel Dunai",
    "accommodation Phoksundo",
    "Blue Sheep Hotel",
    "Dunai hotel booking",
    "Phoksundo accommodation",
    "mountain hotel Nepal",
    "Dolpa hotel",
  ],
  authors: [{ name: "Blue Sheep Hotel" }],
  creator: "Blue Sheep Hotel",
  publisher: "Blue Sheep Hotel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bluesheephotel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blue Sheep Hotel - Best Hotel in Dunai, Phoksundo",
    description:
      "Experience luxury hospitality at Blue Sheep Hotel in Dunai, Phoksundo. Best hotel in the region with modern amenities and stunning mountain views.",
    url: "https://bluesheephotel.com",
    siteName: "Blue Sheep Hotel",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Sheep Hotel - Luxury Hotel in Dunai, Phoksundo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Sheep Hotel - Best Hotel in Dunai, Phoksundo",
    description:
      "Experience luxury hospitality at Blue Sheep Hotel in Dunai, Phoksundo. Best hotel in the region with modern amenities and stunning mountain views.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Blue Sheep Hotel",
              description:
                "Luxury hotel in Dunai, Phoksundo offering exceptional hospitality and stunning mountain views",
              url: "https://bluesheephotel.com",
              telephone: "+977-XXXX-XXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dunai, Dolpa",
                addressLocality: "Dunai",
                addressRegion: "Karnali Province",
                addressCountry: "Nepal",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.9167",
                longitude: "82.8333",
              },
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Free WiFi",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Restaurant",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Mountain View",
                },
              ],
              starRating: {
                "@type": "Rating",
                ratingValue: "5",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
