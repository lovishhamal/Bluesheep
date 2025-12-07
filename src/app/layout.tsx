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
  title: "Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa",
  description:
    "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation in Dolpa with mountain views, WiFi, and exceptional service. Book your stay today!",
  applicationName: "Hotel Blue Sheep Inn", // ✅ CRITICAL: Shows site name in Google Search
  authors: [{ name: "Hotel Blue Sheep Inn" }],
  creator: "Hotel Blue Sheep Inn",
  publisher: "Hotel Blue Sheep Inn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://hotelbluesheepinn.com"),
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest", // ✅ CRITICAL: Links to your web app manifest
  openGraph: {
    title: "Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa",
    description:
      "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation with mountain views, WiFi, and exceptional service.",
    url: "https://hotelbluesheepinn.com",
    siteName: "Hotel Blue Sheep Inn", // ✅ CRITICAL: Shows site name in social sharing
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
    title: "Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa",
    description:
      "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation with mountain views and exceptional service.",
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
  // ✅ Already verified with HTML file (googlebd825b3bd6f44982.html) - no meta tag needed
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Hotel Blue Sheep Inn",
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

        {/* Structured Data Scripts - Critical for Google Search */}
        {/* WebSite Schema */}
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

        {/* Hotel Schema */}
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
                "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo Dolpa offering exceptional hospitality and stunning mountain views",
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

        {/* Organization Schema */}
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

        {/* LocalBusiness Schema */}
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
                "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo Dolpa with garden restaurant and camping facilities",
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
