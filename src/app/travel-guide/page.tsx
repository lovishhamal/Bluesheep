import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getTravelGuides, stripHtml } from "./dummyTravelGuides";
import MobileNavigation from "../components/MobileNavigation";

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

          <div className="max-w-6xl mx-auto">
              {listGuides.length === 0 && generalGuides.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📍</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      No travel guides available yet
                    </h2>
                    <p className="text-gray-600 text-lg">We&apos;re working on creating amazing travel guides for you. Please check back soon!</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {listGuides.map((guide, index) => {
                    const plain = stripHtml(guide.description);
                    const excerpt =
                      plain.length > 150 ? `${plain.slice(0, 150)}...` : plain;

                    // Random color schemes for cards
                    const colorSchemes = [
                      {
                        badge: "from-emerald-500 to-emerald-600",
                        text: "text-emerald-700",
                        bg: "bg-emerald-50",
                        border: "border-emerald-100"
                      },
                      {
                        badge: "from-blue-500 to-blue-600",
                        text: "text-blue-700",
                        bg: "bg-blue-50",
                        border: "border-blue-100"
                      },
                      {
                        badge: "from-purple-500 to-purple-600",
                        text: "text-purple-700",
                        bg: "bg-purple-50",
                        border: "border-purple-100"
                      },
                      {
                        badge: "from-orange-500 to-orange-600",
                        text: "text-orange-700",
                        bg: "bg-orange-50",
                        border: "border-orange-100"
                      },
                      {
                        badge: "from-teal-500 to-teal-600",
                        text: "text-teal-700",
                        bg: "bg-teal-50",
                        border: "border-teal-100"
                      },
                      {
                        badge: "from-indigo-500 to-indigo-600",
                        text: "text-indigo-700",
                        bg: "bg-indigo-50",
                        border: "border-indigo-100"
                      }
                    ];
                    
                    const colorScheme = colorSchemes[index % colorSchemes.length];

                    return (
                      <Link
                        key={guide.slug}
                        href={`/travel-guide/${guide.slug}`}
                        className="group block"
                      >
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${colorScheme.badge} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <h2 className={`text-lg md:text-xl font-bold text-gray-900 group-hover:${colorScheme.text} transition-colors duration-200 leading-tight`}>
                                  {guide.title}
                                </h2>
                                {guide.price > 0 && (
                                  <div className={`shrink-0 rounded-lg ${colorScheme.bg} border ${colorScheme.border} px-2 py-1 ${colorScheme.text} font-semibold text-sm`}>
                                    NPR {guide.price.toFixed(0)}
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-4 text-sm">{excerpt}</p>
                              <div className={`inline-flex items-center gap-2 ${colorScheme.text} font-semibold text-sm`}>
                                Read Guide{" "}
                                <span className="transition-transform duration-200 group-hover:translate-x-1">
                                  →
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
          </div>

          {generalGuides.length > 0 ? (
            <div className="mt-16 lg:mt-20">
              <div className="max-w-6xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent mb-12" />
                
                <div className="text-center mb-12">
                  <div className="inline-block mb-4">
                    <span className="text-4xl">📚</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                      General Travel Information
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Essential information and tips for your journey
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                {generalGuides.map((g) => (
                  <div key={g.slug} className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed text-lg [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&_li]:mb-3 [&_strong]:text-gray-900 [&_strong]:font-semibold [&_strong]:bg-yellow-100 [&_strong]:px-1 [&_strong]:rounded [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-2"
                        dangerouslySetInnerHTML={{ __html: g.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
}
