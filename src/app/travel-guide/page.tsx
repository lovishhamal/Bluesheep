import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { dummyTravelGuides, stripHtml } from "./dummyTravelGuides";

export const metadata: Metadata = {
  title: "Travel Guides | Hotel Blue Sheep Inn",
  description:
    "Browse curated travel guides with detailed itineraries, must-visit places, and practical tips. New guides will be added regularly.",
  alternates: {
    canonical: "/travel-guide",
  },
  openGraph: {
    title: "Travel Guides | Hotel Blue Sheep Inn",
    description:
      "Browse curated travel guides with detailed itineraries, must-visit places, and practical tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/travel-guide",
  },
};

export default function TravelGuidePage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: dummyTravelGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://hotelbluesheepinn.com/travel-guide/${guide.slug}`,
      name: guide.title,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      <Script
        id="travel-guide-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Hotel Blue Sheep Inn Logo"
                width={48}
                height={48}
                className="h-12 w-auto rounded-lg shadow-md cursor-pointer"
              />
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white font-medium transition-colors duration-200 hover:text-emerald-100"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Attractions
              </Link>
              <Link
                href="/travel-guide"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium border-b-2 border-emerald-50"
              >
                Travel Guide
              </Link>
              <Link
                href="/contact"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="md:hidden text-white font-semibold">Menu</div>
          </div>

          <div className="md:hidden border-t border-emerald-700/30">
            <div className="py-4 space-y-4">
              <Link
                href="/"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Attractions
              </Link>
              <Link
                href="/travel-guide"
                className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Travel Guide
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
              Travel Guides
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light">
            Detailed itineraries, best spots, and practical tips — built for SEO
            and easy reading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyTravelGuides.map((guide) => {
            const plain = stripHtml(guide.description);
            const excerpt =
              plain.length > 220 ? `${plain.slice(0, 220)}...` : plain;

            return (
              <Link
                key={guide.slug}
                href={`/travel-guide/${guide.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200">
                      {guide.title}
                    </h2>
                    <div className="shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-1 text-emerald-700 font-semibold">
                      ${guide.price.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{excerpt}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-emerald-700 font-semibold">
                    Read guide <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

