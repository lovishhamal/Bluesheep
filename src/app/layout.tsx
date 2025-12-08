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
  keywords: [
    // Hotel Keywords
    "Hotel Blue Sheep Inn",
    "Blue Sheep Inn Dolpa",
    "hotel in Dunai",
    "hotel in Dolpa",
    "best hotel Dunai",
    "best hotel Dolpa",
    "Dunai hotel",
    "Dolpa hotel",
    "Phoksundo hotel",
    "hotel near Phoksundo",
    "hotel near Phoksundo Lake",
    // How to Reach Keywords - CRITICAL for your SEO
    "how to reach Dunai",
    "how to reach Dolpa",
    "how to reach Phoksundo",
    "how to reach Phoksundo Lake",
    "how to reach Dho Tarap",
    "how to reach Dho",
    "how to go to Dunai",
    "how to go to Dolpa",
    "how to travel to Dunai",
    "how to travel to Dolpa",
    "how to travel to Phoksundo",
    "Dunai travel guide",
    "Dolpa travel guide",
    "Phoksundo travel guide",
    "route to Dunai",
    "route to Dolpa",
    "Kathmandu to Dunai",
    "Kathmandu to Dolpa",
    "Nepalgunj to Dunai",
    "Juphal to Dunai",
    "flight to Dolpa",
    "bus to Dolpa",
    // Accommodation Keywords
    "accommodation in Dunai",
    "accommodation in Dolpa",
    "stay in Dunai",
    "stay in Dolpa",
    "lodging Dunai",
    "lodging Dolpa",
    // Facilities Keywords
    "garden restaurant Dolpa",
    "camping in Dolpa",
    "camping Dunai",
    "parking in Dunai",
    "WiFi hotel Dolpa",
  ],
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

        {/* FAQ Schema - Critical for "How to Reach" Queries */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How to reach Dunai, Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can reach Dunai, Dolpa by: 1) Direct bus from Kathmandu (Gongabu) taking ~30 hours through scenic mountain routes, 2) Bus to Radi (Rukum) then local jeep to Dunai (24-25 hours + 6-8 hours), or 3) Flight from Kathmandu to Juphal Airport (45 mins) then short jeep/walk to Dunai. Hotel Blue Sheep Inn is located in the heart of Dunai with ample parking facilities.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to reach Dolpa from Kathmandu?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "From Kathmandu to Dolpa: Take a direct bus from Gongabu Bus Park (30 hours continuous journey), or fly from Kathmandu to Juphal Airport (45 minutes) then travel to Dunai. Alternative route: Bus to Radi, Rukum (24-25 hours) then local jeep to Dunai (6-8 hours). Stay at Hotel Blue Sheep Inn in Dunai for comfortable accommodation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to reach Phoksundo Lake?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "To reach Phoksundo Lake: First reach Dunai (via bus or flight to Juphal), then trek from Dunai to Phoksundo Lake (2-3 days trek). Hotel Blue Sheep Inn in Dunai is the perfect base for your Phoksundo Lake trek, offering comfortable rooms and local guidance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to reach Dho Tarap from Dunai?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "From Dunai to Dho Tarap: Trek from Dunai to Dho Tarap village (highest village in Nepal at 4,200m) taking 3-4 days. Start your journey from Hotel Blue Sheep Inn in Dunai with proper preparation and local guidance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best way to travel to Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The fastest way is flying from Kathmandu to Juphal (45 mins) then traveling to Dunai. For budget travelers, take the direct bus from Kathmandu (30 hours) or bus to Radi then jeep to Dunai. Hotel Blue Sheep Inn in Dunai offers parking facilities for those driving.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where to stay in Dunai, Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hotel Blue Sheep Inn is the best hotel in Dunai, Dolpa offering luxury accommodation with mountain views, garden restaurant, camping facilities, free WiFi, and ample parking space. Located in the heart of Dunai, it's the perfect base for exploring Phoksundo Lake and Dho Tarap.",
                  },
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
