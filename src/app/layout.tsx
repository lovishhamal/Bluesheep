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
  title:
    "Bluesheep | Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa | Garden Restaurant & Camping",
  description:
    "🏨 Bluesheep - Hotel Blue Sheep Inn. Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation in Dolpa with mountain views, WiFi, and exceptional service. Book your stay today!",
  keywords: [
    "bluesheep",
    "blue sheep",
    "hotel bluesheep",
    "hotel blue sheep",
    "hotel bluesheep inn",
    "hotel blue sheep inn",
    "Blue Sheep Inn",
    "bluesheep inn",
    "Blue Sheep Inn hotel",
    "Hotel Blue Sheep Inn",
    "Hotel Blue Sheep Inn Dunai",
    "best hotel in dunai",
    "best hotel in dunai dolpa",
    "best hotel in dolpa dunai",
    "best hotel dunai dolpa",
    "best hotel dolpa",
    "best hotel in dolpa",
    "dunai dolpa hotel",
    "dolpa dunai hotel",
    "hotel in dunai",
    "hotel in dunai dolpa",
    "hotel in dolpa dunai",
    "hotel in phoksundo",
    "best hotel in phoksundo",
    "best hotel in phoksundo dolpa",
    "best hotel in dolpa phoksundo",
    "best hotel phoksundo dolpa",
    "best hotel phoksundo",
    "phoksundo dolpa hotel",
    "dolpa phoksundo hotel",
    "hotel in phoksundo dolpa",
    "hotel in dolpa phoksundo",
    "phoksundo hotel",
    "dunai hotel",
    "dolpa hotel",
    "luxury hotel dunai dolpa",
    "luxury hotel phoksundo dolpa",
    "luxury hotel dolpa",
    "luxury hotel phoksundo",
    "luxury hotel dunai",
    "garden restaurant",
    "camping",
    "camping dunai",
    "camping dunai dolpa",
    "camping phoksundo",
    "camping phoksundo dolpa",
    "garden restaurant dunai",
    "garden restaurant dunai dolpa",
    "garden restaurant phoksundo",
    "garden restaurant phoksundo dolpa",
    "accommodation Dunai",
    "accommodation dunai dolpa",
    "accommodation dolpa",
    "accommodation phoksundo",
    "accommodation phoksundo dolpa",
    "Blue Sheep Hotel",
    "Dunai hotel booking",
    "Dunai accommodation",
    "dolpa accommodation",
    "phoksundo accommodation",
    "dunai dolpa accommodation",
    "phoksundo dolpa accommodation",
    "mountain hotel Nepal",
    "restaurant dunai",
    "restaurant dunai dolpa",
    "restaurant phoksundo",
    "restaurant phoksundo dolpa",
    "garden camping",
    "tent camping dunai",
    "tent camping phoksundo",
    "phoksundo lake",
    "phoksundo lake nepal",
    "phoksundo lake dolpa",
    "dho tarap",
    "dho tarap village",
    "highest village nepal",
    "dolpa attractions",
    "dolpa nepal attractions",
    "things to do dolpa",
    "visit dolpa",
  ],
  authors: [{ name: "Blue Sheep Hotel" }],
  creator: "Blue Sheep Hotel",
  publisher: "Blue Sheep Hotel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hotelbluesheepinn.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title:
      "Bluesheep | Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa | Garden Restaurant & Camping",
    description:
      "🏨 Bluesheep - Hotel Blue Sheep Inn. Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation with mountain views, WiFi, and exceptional service.",
    url: "https://hotelbluesheepinn.com",
    siteName: "Hotel Blue Sheep Inn",
    images: [
      {
        url: "https://hotelbluesheepinn.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Hotel Blue Sheep Inn - Best Hotel in Dunai - Garden Restaurant & Camping",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bluesheep | Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa | Garden Restaurant & Camping",
    description:
      "🏨 Bluesheep - Hotel Blue Sheep Inn. Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation with mountain views and exceptional service.",
    images: ["https://hotelbluesheepinn.com/logo.png"],
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "apple-touch-icon",
        url: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable}`}
    >
      <head>
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bluesheep" />

        {/* Favicon links for better browser compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        {/* Manifest is automatically generated from app/manifest.ts */}

        {/* Structured Data Scripts */}
        {/* WebSite Schema - Critical for Google Search Results Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Hotel Blue Sheep Inn",
              alternateName: [
                "Bluesheep",
                "bluesheep",
                "Blue Sheep",
                "Blue Sheep Hotel",
                "Blue Sheep Inn",
                "Hotel Blue Sheep",
                "Hotel Bluesheep",
                "Hotel Blue Sheep Inn",
                "Bluesheep Hotel",
                "Bluesheep Inn",
              ],
              url: "https://hotelbluesheepinn.com",
              logo: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://hotelbluesheepinn.com/?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Hotel Blue Sheep Inn",
              logo: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
                contentUrl: "https://hotelbluesheepinn.com/logo.png",
              },
              image: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
              },
              alternateName: [
                "Bluesheep",
                "bluesheep",
                "Blue Sheep",
                "Blue Sheep Hotel",
                "Blue Sheep Inn",
                "Hotel Blue Sheep",
                "Hotel Bluesheep",
                "Hotel Blue Sheep Inn",
                "Bluesheep Hotel",
                "Bluesheep Inn",
              ],
              description:
                "Bluesheep - Hotel Blue Sheep Inn. Best hotel in Dunai and Phoksundo Dolpa offering exceptional hospitality and stunning mountain views",
              url: "https://hotelbluesheepinn.com",
              telephone: "+977-985-806-1927",
              email: "info@hotelbluesheepinn.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dunai, Dolpa",
                addressLocality: "Dunai",
                addressRegion: "Karnali Province",
                postalCode: "",
                addressCountry: "Nepal",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.9167",
                longitude: "82.8333",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Dunai",
                },
                {
                  "@type": "City",
                  name: "Dolpa",
                },
                {
                  "@type": "City",
                  name: "Phoksundo",
                },
                {
                  "@type": "City",
                  name: "Dho Tarap",
                },
              ],
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
                  "Hotel Blue Sheep Inn - Best garden restaurant in Dunai Dolpa with mountain views",
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
                description:
                  "Hotel Blue Sheep Inn - Best camping in Dunai Dolpa with garden facilities",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hotel Blue Sheep Inn",
              alternateName: [
                "Bluesheep",
                "bluesheep",
                "Blue Sheep",
                "Blue Sheep Hotel",
                "Blue Sheep Inn",
                "Hotel Blue Sheep",
                "Hotel Bluesheep",
                "Hotel Blue Sheep Inn",
                "Bluesheep Hotel",
                "Bluesheep Inn",
              ],
              url: "https://hotelbluesheepinn.com",
              logo: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
              },
              image: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
              },
              telephone: "+977-985-806-1927",
              email: "info@hotelbluesheepinn.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dunai, Dolpa",
                addressLocality: "Dunai",
                addressRegion: "Karnali Province",
                postalCode: "",
                addressCountry: "Nepal",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Dunai",
                },
                {
                  "@type": "City",
                  name: "Dolpa",
                },
                {
                  "@type": "City",
                  name: "Phoksundo",
                },
                {
                  "@type": "City",
                  name: "Dho Tarap",
                },
              ],
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://hotelbluesheepinn.com",
              name: "Hotel Blue Sheep Inn",
              logo: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
              },
              image: {
                "@type": "ImageObject",
                url: "https://hotelbluesheepinn.com/logo.png",
                width: 512,
                height: 512,
              },
              alternateName: [
                "Bluesheep",
                "bluesheep",
                "Blue Sheep",
                "Blue Sheep Hotel",
                "Blue Sheep Inn",
                "Hotel Blue Sheep",
                "Hotel Bluesheep",
                "Hotel Blue Sheep Inn",
                "Bluesheep Hotel",
                "Bluesheep Inn",
              ],
              description:
                "Bluesheep - Hotel Blue Sheep Inn. Best hotel in Dunai and Phoksundo Dolpa with garden restaurant and camping facilities",
              url: "https://hotelbluesheepinn.com",
              telephone: "+977-985-806-1927",
              email: "info@hotelbluesheepinn.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dunai, Dolpa",
                addressLocality: "Dunai",
                addressRegion: "Karnali Province",
                postalCode: "",
                addressCountry: "Nepal",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.9167",
                longitude: "82.8333",
              },
              priceRange: "$$",
              servesCuisine: ["Nepali", "International", "Local"],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Dunai",
                },
                {
                  "@type": "City",
                  name: "Dolpa",
                },
                {
                  "@type": "City",
                  name: "Phoksundo",
                },
                {
                  "@type": "City",
                  name: "Dho Tarap",
                },
              ],
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
