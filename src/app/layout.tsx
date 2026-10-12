import type { Metadata } from "next";
import {
  Inter,
  Poppins,
  Playfair_Display,
  Montserrat,
  Quattrocento_Sans,
} from "next/font/google";
import "./globals.css";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "./util/supabase-server";
import { AppDetailProvider } from "./components/AppDetailProvider";

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

const quattrocentoSans = Quattrocento_Sans({
  variable: "--font-quattrocento-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo | Shey Phoksundo Gateway",
  description:
    "Hotel Blue Sheep Inn - Best hotel in Dunai and Phoksundo, Dolpa Nepal. Premier luxury accommodation, garden restaurant, camping & trekking packages to Shey Phoksundo Lake. Book your stay today!",
  keywords: [
    // Primary User Target Keywords
    "phoksundo",
    "shey phoksundo",
    "hotel in phoksundo",
    "hotels in phoksundo",
    "hotel phoksundo",
    "shey phoksundo hotel",
    "hotel shey phoksundo",
    "treking to phoksundo",
    "trekking to phoksundo",
    "trek to phoksundo",
    "shey phoksundo trek",
    "shey phoksundo trekking",
    "phoksundo lake trek",
    "hotel near phoksundo lake",
    "stay in phoksundo",
    "accommodation in phoksundo",

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

    // HOW TO REACH - All Variations
    "how to reach Dunai",
    "how to reach Dolpa",
    "how to reach Phoksundo",
    "how to reach Phoksundo Lake",
    "how to reach Dho Tarap",
    "how to reach Dho",
    "how to reach Dunai Dolpa",
    "how to reach Dolpa Nepal",
    "how to reach Shey Phoksundo",

    // HOW TO GET - All Variations
    "how to get to Dunai",
    "how to get to Dolpa",
    "how to get to Phoksundo",
    "how to get to Phoksundo Lake",
    "how to get to Dho Tarap",
    "how to get to Dho",
    "how to get to Dunai Dolpa",
    "how to get to Dolpa Nepal",

    // HOW TO GO - All Variations
    "how to go to Dunai",
    "how to go to Dolpa",
    "how to go to Phoksundo",
    "how to go to Phoksundo Lake",
    "how to go to Dho Tarap",
    "how to go to Dho",
    "how to go Dunai",
    "how to go Dolpa",

    // HOW TO TRAVEL - All Variations
    "how to travel to Dunai",
    "how to travel to Dolpa",
    "how to travel to Phoksundo",

    // Itinerary Keywords - High Priority
    "Phoksundo Itinerary",
    "Phoksundo Lake Itinerary",
    "Shey Phoksundo Itinerary",
    "Dho Itinerary",
    "Dho Tarap Itinerary",
    "Dho Tarap Trek Itinerary",
    "Dolpo Itinerary",
    "Dolpa Itinerary",
    "Lower Dolpo Itinerary",
    "Upper Dolpo Itinerary",
    "Phoksundo Trek Itinerary",
    "Dho Tarap Trek Cost",
    "Phoksundo Lake Trek Cost",
    // Common Typos (Requested)
    "itenary",
    "Dolpa itenary",
    "Phoksundo itenary",
    "how to travel to Phoksundo Lake",
    "how to travel to Dho Tarap",
    "how to travel to Dho",
    "how to travel Dunai",
    "how to travel Dolpa",

    // TRAVEL TO - All Variations
    "travel to Dunai",
    "travel to Dolpa",
    "travel to Phoksundo",
    "travel to Phoksundo Lake",
    "travel to Dho Tarap",
    "travel to Dho",
    "traveling to Dunai",
    "traveling to Dolpa",
    "travelling to Dunai",
    "travelling to Dolpa",

    // WAY TO - All Variations
    "way to Dunai",
    "way to Dolpa",
    "way to Phoksundo",
    "way to reach Dunai",
    "way to reach Dolpa",
    "way to reach Phoksundo",
    "best way to Dunai",
    "best way to Dolpa",
    "best way to reach Dunai",
    "best way to reach Dolpa",

    // GETTING TO - All Variations
    "getting to Dunai",
    "getting to Dolpa",
    "getting to Phoksundo",
    "getting to Phoksundo Lake",
    "getting to Dho Tarap",

    // ROUTE/ROAD TO - All Variations
    "route to Dunai",
    "route to Dolpa",
    "route to Phoksundo",
    "road to Dunai",
    "road to Dolpa",
    "road to Phoksundo",

    // FROM KATHMANDU - All Variations
    "Kathmandu to Dunai",
    "Kathmandu to Dolpa",
    "Kathmandu to Phoksundo",
    "Kathmandu to Dho Tarap",
    "from Kathmandu to Dunai",
    "from Kathmandu to Dolpa",

    // FROM OTHER CITIES
    "Nepalgunj to Dunai",
    "Nepalgunj to Dolpa",
    "Juphal to Dunai",
    "Pokhara to Dolpa",
    "Pokhara to Dunai",

    // TRANSPORT METHODS
    "flight to Dolpa",
    "flight to Dunai",
    "flight to Juphal",
    "bus to Dolpa",
    "bus to Dunai",
    "jeep to Dunai",
    "trek to Phoksundo",
    "trek to Dho Tarap",

    // TRAVEL GUIDES
    "Dunai travel guide",
    "Dolpa travel guide",
    "Phoksundo travel guide",
    "Phoksundo Lake travel guide",
    "Dho Tarap travel guide",
    "Dolpa Nepal travel guide",
    "Dunai Dolpa guide",

    // VISIT/VISITING
    "visit Dunai",
    "visit Dolpa",
    "visit Phoksundo",
    "visiting Dunai",
    "visiting Dolpa",
    "visiting Phoksundo Lake",

    // TRIP TO
    "trip to Dunai",
    "trip to Dolpa",
    "trip to Phoksundo",
    "Dolpa trip",
    "Phoksundo trip",

    // Accommodation Keywords
    "accommodation in Dunai",
    "accommodation in Dolpa",
    "stay in Dunai",
    "stay in Dolpa",
    "lodging Dunai",
    "lodging Dolpa",
    "where to stay Dunai",
    "where to stay Dolpa",
    "where to stay Phoksundo",
    "place to stay Dunai",
    "place to stay Dolpa",

    // Facilities Keywords
    "garden restaurant Dolpa",
    "camping in Dolpa",
    "camping Dunai",
    "parking in Dunai",
    "WiFi hotel Dolpa",
    "restaurant in Dunai",
    "food in Dunai",

    // MORE ITINERARY TYPOS & VARIATIONS
    "Shey Phoksundo itinerary",
    "Shey Phoksundo trek",
    "Shey Phoksundo itenary",
    "phoksundo lake itenary",
    "Dho Tarap itenary",
    "dho tarap itenary",
    "dolpo itenary",
    "lower dolpo itenary",
    "upper dolpo itenary",
    "iternary Phoksundo",
    "iternary Dolpa",
    "iternary Dho Tarap",

    // BEST TIME TO VISIT
    "best time to visit Dolpa",
    "best time to visit Phoksundo",
    "best time to visit Phoksundo Lake",
    "best time to visit Dho Tarap",
    "best season Dolpa trek",
    "best month Phoksundo trek",
    "when to visit Dolpa",
    "when to visit Phoksundo",

    // PLACES IN DOLPA
    "places in Dolpa",
    "Dolpa places to visit",
    "places to visit in Dolpa",
    "things to do in Dolpa",
    "things to see in Dolpa",
    "tourist places Dolpa",
    "Dolpa tourist attractions",
    "what to see in Dolpa",
    "must visit places Dolpa",

    // SPECIFIC LOCATIONS
    "Ringmo village",
    "Ringmo Phoksundo",
    "Dunai bazaar",
    "Juphal airport",
    "Shey Gompa",
    "Crystal Mountain Nepal",
    "Shey Phoksundo National Park",

    // COST & BUDGET
    "Dolpa trek cost",
    "Phoksundo trek cost",
    "Phoksundo Lake trek budget",
    "Dho Tarap trek cost",
    "Upper Dolpa trek cost",
    "Lower Dolpa trek cost",
    "Dolpa permit cost",
    "Upper Dolpa permit fee",
    "Dolpa trek budget",
    "cheap trek Nepal Dolpa",

    // DURATION KEYWORDS
    "5 day Phoksundo trek",
    "7 day Phoksundo itinerary",
    "10 day Dho Tarap trek",
    "2 week Dolpa trek",
    "short trek Dolpa",
    "Phoksundo trek days",
    "Dho Tarap trek duration",

    // TREKKING VARIATIONS
    "Phoksundo Lake trek",
    "Lower Dolpo trek",
    "Upper Dolpo trek",
    "Dolpa circuit trek",
    "Crystal Mountain trek",
    "Shey Phoksundo trek",
    "Dolpa trekking package",
    "Dolpa trekking guide",

    // COMPARISON KEYWORDS
    "Phoksundo vs Rara Lake",
    "Dolpa vs Mustang trek",
    "remote treks Nepal",
    "off the beaten path Nepal",
    "hidden gems Nepal",
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

export const revalidate = 86400;

const getAppDetailCached = unstable_cache(
  async () => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return null;
    }

    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from("app_detail")
      .select("banner_text,admin_phone,created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return null;

    return {
      bannerText:
        typeof data?.banner_text === "string" ? data.banner_text.trim() : null,
      adminPhone:
        typeof data?.admin_phone === "string" ? data.admin_phone.trim() : null,
    };
  },
  ["app_detail_latest_v1"],
  { revalidate: 86400 }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appDetail = await Promise.race([
    getAppDetailCached(),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 150)),
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable} ${quattrocentoSans.variable}`}
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
                  name: "How to get to Dolpa from Kathmandu?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "From Kathmandu to Dolpa: Take a direct bus from Gongabu Bus Park (30 hours continuous journey), or fly from Kathmandu to Juphal Airport (45 minutes) then travel to Dunai. Alternative route: Bus to Radi, Rukum (24-25 hours) then local jeep to Dunai (6-8 hours). Stay at Hotel Blue Sheep Inn in Dunai for comfortable accommodation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a hotel in Phoksundo or Shey Phoksundo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "At Phoksundo Lake (Ringmo village, 3,611m), lodging is limited to basic rustic teahouses and designated lakeshore campsites. For luxury accommodation, comfortable rooms, 24/7 hot showers, Wi-Fi, organic restaurant food, and complete trekking equipment, travelers stay at Hotel Blue Sheep Inn in Dunai (the official gateway town) before and after the trek.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to do trekking to Phoksundo (treking to phoksundo)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Trekking to Phoksundo Lake begins with a flight to Juphal Airport or overland bus/jeep to Dunai. From Dunai (staying at Hotel Blue Sheep Inn), trek 2-3 days through Shey Phoksundo National Park via Chhepka and Jharana waterfall to reach Ringmo village and the turquoise waters of Phoksundo Lake (3,611m).",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to travel to Phoksundo Lake?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "To reach Phoksundo Lake: First reach Dunai (via bus or flight to Juphal), then trek from Dunai to Phoksundo Lake (2-3 days trek). Hotel Blue Sheep Inn in Dunai is the perfect base for your Phoksundo Lake trek, offering comfortable rooms and local guidance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How to go to Dho Tarap from Dunai?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "From Dunai to Dho Tarap: Trek from Dunai to Dho Tarap village (highest village in Nepal at 4,200m) taking 3-4 days. Start your journey from Hotel Blue Sheep Inn in Dunai with proper preparation and local guidance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the best way to reach Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The fastest way is flying from Kathmandu to Juphal (45 mins) then traveling to Dunai. For budget travelers, take the direct bus from Kathmandu (30 hours) or bus to Radi then jeep to Dunai. Hotel Blue Sheep Inn in Dunai offers parking facilities for those driving.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I get to Phoksundo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Getting to Phoksundo: Fly or take bus to Dunai, then trek 2-3 days to Phoksundo Lake. Hotel Blue Sheep Inn in Dunai provides accommodation, parking, and local trekking guidance for your Phoksundo journey.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the route to Dunai?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Route to Dunai: 1) Kathmandu → Pokhara → Baglung → NepalGunj → JajarKot → Rukum (Radi) → Tallubagar → Dunai (direct bus, 30 hours), 2) Kathmandu → Radi → Dunai (bus + jeep, 30-36 hours), or 3) Kathmandu → Juphal → Dunai (flight + jeep, fastest). Stay at Hotel Blue Sheep Inn upon arrival.",
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
                {
                  "@type": "Question",
                  name: "How long does it take to travel to Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Travel time to Dolpa: By flight 45 minutes (Kathmandu to Juphal), by direct bus 30 hours (Kathmandu to Dunai), or by bus+jeep combo 30-36 hours. Hotel Blue Sheep Inn in Dunai welcomes you after your journey with comfortable rooms and excellent facilities.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I drive to Dunai Dolpa?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can drive to Dunai, Dolpa via the Kathmandu-Pokhara-Baglung-NepalGunj-Rukum-Dunai route. The journey takes approximately 30-36 hours. Hotel Blue Sheep Inn offers ample parking facilities for guests arriving by car.",
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
        <AppDetailProvider
          bannerText={appDetail?.bannerText ?? null}
          adminPhone={appDetail?.adminPhone ?? null}
        >
          {children}
        </AppDetailProvider>
      </body>
    </html>
  );
}
