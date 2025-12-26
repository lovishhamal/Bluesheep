import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getTravelGuides, stripHtml } from "./dummyTravelGuides";
import TravelGuideSidebar from "./TravelGuideSidebar";
import { getPrimaryVideo } from "../util/storage-server";

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

export default async function TravelGuidePage() {
  const guides = await getTravelGuides();
  const listGuides = guides.filter((g) => g.type === "list");
  const generalGuides = guides.filter((g) => g.type === "general");
  const videoUrl = await getPrimaryVideo();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: listGuides.map((guide, index) => ({
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
        <div className="max-w-7xl mx-auto px-3">
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

      <section className="pt-4 pb-16 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-4">
              <span className="text-5xl">🗺️</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Travel Guides
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed itineraries, best spots, and practical tips — built for
              SEO and easy reading.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
              {listGuides.length === 0 && generalGuides.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-400/20 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    No travel guides available yet
                  </h2>
                  <p className="text-gray-600">Please check back soon.</p>
                </div>
              ) : null}

              {listGuides.map((guide, index) => {
                const plain = stripHtml(guide.description);
                const excerpt =
                  plain.length > 260 ? `${plain.slice(0, 260)}...` : plain;

                return (
                  <Link
                    key={guide.slug}
                    href={`/travel-guide/${guide.slug}`}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-400/30 shadow-lg hover:shadow-xl transition-all duration-300 group block"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200">
                            {guide.title}
                          </h2>
                          <div className="shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-1 text-emerald-700 font-semibold">
                            ${guide.price.toFixed(2)}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{excerpt}</p>
                        <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                          Read guide{" "}
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          {generalGuides.length > 0 ? (
            <div className="mt-10 lg:mt-14">
              <div className="max-w-4xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mb-10" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
                  General Information
                </h2>

                <div className="divide-y divide-gray-200/70">
                  {generalGuides.map((g) => (
                    <div key={g.slug} className="py-8">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {g.title}
                      </h3>
                      <div className="mt-4 h-px bg-gradient-to-r from-emerald-200/0 via-emerald-200/70 to-emerald-200/0" />
                      <p className="mt-4 text-gray-700 leading-relaxed">
                        {stripHtml(g.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-10 lg:mt-14">
            <div className="max-w-5xl mx-auto">
              <TravelGuideSidebar videoUrl={videoUrl} sticky={false} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
