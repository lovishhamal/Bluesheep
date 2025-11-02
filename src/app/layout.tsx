import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Blue Sheep Inn | Best Hotel in Dunai | Garden Restaurant & Camping",
  description:
    "🏨 Hotel Blue Sheep Inn - Best hotel in Dunai with garden restaurant & camping. Luxury accommodation in Dolpa with mountain views, WiFi, and exceptional service. Book your stay today!",
  keywords: [
    "hotel bluesheep inn",
    "hotel blue sheep inn",
    "Blue Sheep Inn",
    "bluesheep inn",
    "Blue Sheep Inn hotel",
    "Hotel Blue Sheep Inn Dunai",
    "best hotel in dunai",
    "hotel in dunai",
    "hotel in phoksundo",
    "best hotel in phoksundo",
    "garden restaurant",
    "camping",
    "camping dunai",
    "camping phoksundo",
    "garden restaurant dunai",
    "garden restaurant phoksundo",
    "luxury hotel Dunai",
    "accommodation Dunai",
    "Blue Sheep Hotel",
    "Dunai hotel booking",
    "Dunai accommodation",
    "mountain hotel Nepal",
    "Dolpa hotel",
    "restaurant dunai",
    "restaurant phoksundo",
    "garden camping",
    "tent camping dunai",
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
    title: "Hotel Blue Sheep Inn | Best Hotel in Dunai | Garden Restaurant & Camping",
    description:
      "🏨 Hotel Blue Sheep Inn - Best hotel in Dunai with garden restaurant & camping. Luxury accommodation with mountain views, WiFi, and exceptional service.",
    url: "https://bluesheephotel.com",
    siteName: "Hotel Blue Sheep Inn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Hotel in Dunai - Garden Restaurant & Camping",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Blue Sheep Inn | Best Hotel in Dunai | Garden Restaurant & Camping",
    description:
      "🏨 Hotel Blue Sheep Inn - Best hotel in Dunai with garden restaurant & camping. Luxury accommodation with mountain views and exceptional service.",
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Hotel Blue Sheep Inn",
              alternateName: ["Blue Sheep Hotel", "Blue Sheep Inn", "Hotel Blue Sheep Inn"],
              description:
                "Hotel Blue Sheep Inn - Luxury hotel in Dunai offering exceptional hospitality and stunning mountain views",
              url: "https://bluesheephotel.com",
              telephone: "+977-985-806-1927",
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
                  name: "Garden Restaurant",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Camping",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Mountain View",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Garden Camping",
                },
              ],
              starRating: {
                "@type": "Rating",
                ratingValue: "5",
              },
              hasRestaurant: {
                "@type": "Restaurant",
                name: "Hotel Blue Sheep Inn Garden Restaurant",
                alternateName: "Garden Restaurant",
                description:
                  "Hotel Blue Sheep Inn - Best garden restaurant in Dunai with mountain views",
                servesCuisine: ["Nepali", "International", "Local"],
                amenityFeature: [
                  {
                    "@type": "LocationFeatureSpecification",
                    name: "Garden Views",
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    name: "Mountain Views",
                  },
                ],
              },
              hasCamping: {
                "@type": "LodgingBusiness",
                name: "Hotel Blue Sheep Inn Garden Camping",
                alternateName: "Garden Camping",
                description: "Hotel Blue Sheep Inn - Best camping in Dunai with garden facilities",
                amenityFeature: [
                  {
                    "@type": "LocationFeatureSpecification",
                    name: "Tent Camping",
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    name: "Garden Camping",
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    name: "Mountain Views",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
