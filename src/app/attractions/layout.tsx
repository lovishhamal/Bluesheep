import type { Metadata } from "next";



export const metadata: Metadata = {
  title:
    "Phoksundo Lake & Dho Tarap | Best Attractions in Dolpa Nepal | Hotel Blue Sheep Inn",
  description:
    "Discover Phoksundo Lake (3,611m) and Dho Tarap - the highest village in Nepal (4,200m). Plan your visit to these stunning Dolpa attractions from Hotel Blue Sheep Inn. Best hotel base for exploring Dolpa's natural wonders.",
  keywords: [
    "phoksundo lake",
    "phoksundo lake nepal",
    "phoksundo lake dolpa",
    "phoksundo dolpa",
    "dho tarap",
    "dho tarap village",
    "dho tarap nepal",
    "highest village nepal",
    "highest village in nepal",
    "dolpa attractions",
    "dolpa nepal attractions",
    "best attractions dolpa",
    "things to do dolpa",
    "dolpa trekking",
    "dolpa trek",
    "nepal high altitude",
    "nepal high altitude lake",
    "nepal high altitude village",
    "shey phoksundo national park",
    "phoksundo national park",
    "dolpa tourism",
    "dolpa travel",
    "visit dolpa",
    "dolpa nepal",
    "upper dolpa",
    "tibetan culture nepal",
    "alpine lake nepal",
    "crystal clear lake nepal",
    "turquoise lake nepal",
    "mountain lake nepal",
    "dolpa hotel",
    "hotel near phoksundo",
    "hotel near dho tarap",
    "accommodation dolpa",
    "dolpa accommodation",
    "dunai dolpa",
    "dunai hotel",
    // SEO Optimized Keywords (Itinerary & How to Reach)
    "Dolpo itinerary",
    "Phoksundo itinerary",
    "Phoksundo Lake itinerary",
    "Dho Tarap itinerary",
    "how to reach Phoksundo",
    "how to reach Dho Tarap",
    "how to travel to Dolpa",
    "how to get to Phoksundo Lake",
    "Phoksundo Lake trek itinerary",
    "Dho Tarap trek itinerary",
  ],
  authors: [{ name: "Hotel Blue Sheep Inn" }],
  creator: "Hotel Blue Sheep Inn",
  publisher: "Hotel Blue Sheep Inn",
  metadataBase: new URL("https://hotelbluesheepinn.com"),
  alternates: {
    canonical: "/attractions/",
  },
  openGraph: {
    title:
      "Phoksundo Lake & Dho Tarap | Best Attractions in Dolpa Nepal | Hotel Blue Sheep Inn",
    description:
      "Discover Phoksundo Lake (3,611m) and Dho Tarap - the highest village in Nepal (4,200m). Plan your visit to these stunning Dolpa attractions from Hotel Blue Sheep Inn.",
    url: "https://hotelbluesheepinn.com/attractions/",
    siteName: "Hotel Blue Sheep Inn",
    images: [
      {
        url: "/phoksundo.jpg",
        width: 1200,
        height: 630,
        alt: "Phoksundo Lake - Crystal Clear Alpine Lake in Dolpa Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Phoksundo Lake & Dho Tarap | Best Attractions in Dolpa Nepal | Hotel Blue Sheep Inn",
    description:
      "Discover Phoksundo Lake (3,611m) and Dho Tarap - the highest village in Nepal (4,200m). Plan your visit to these stunning Dolpa attractions.",
    images: ["/phoksundo.jpg"],
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
};

export default function AttractionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Phoksundo Lake and Dho Tarap",
            description:
              "Discover Phoksundo Lake, one of Nepal's most stunning high-altitude lakes at 3,611m, and Dho Tarap, the highest permanently inhabited village in Nepal at 4,200m.",
            url: "https://hotelbluesheepinn.com/attractions",
            image: "https://hotelbluesheepinn.com/phoksundo.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dolpa",
              addressRegion: "Karnali Province",
              addressCountry: "Nepal",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "29.2000",
              longitude: "82.9000",
            },
            containsPlace: [
              {
                "@type": "TouristAttraction",
                name: "Phoksundo Lake",
                description:
                  "Crystal clear alpine lake at 3,611 meters elevation in Dolpa, Nepal",
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "29.2000",
                  longitude: "82.9000",
                },
              },
              {
                "@type": "TouristAttraction",
                name: "Dho Tarap",
                description:
                  "Highest permanently inhabited village in Nepal at 4,200 meters elevation",
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: "29.3000",
                  longitude: "83.0000",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
