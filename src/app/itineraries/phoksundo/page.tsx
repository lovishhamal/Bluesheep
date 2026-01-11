import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import TravelGuideContent from "../../components/TravelGuideContent";
import { getTravelGuideByCategory, stripHtml } from "../../travel-guide/dummyTravelGuides";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
    const guide = await getTravelGuideByCategory("phoksundo");

    if (!guide) {
        return {
            title: "Phoksundo Lake Itinerary | Hotel Blue Sheep Inn",
            description: "Complete Phoksundo Lake trek itinerary from Hotel Blue Sheep Inn in Dunai.",
        };
    }

    const plainDescription = stripHtml(guide.description);
    const description = plainDescription.length > 160
        ? `${plainDescription.slice(0, 160)}...`
        : plainDescription;

    return {
        title: "Phoksundo Lake Itinerary 2025 | Day-by-Day Trek Guide | Hotel Blue Sheep Inn",
        description: description || "Complete Phoksundo Lake trek itinerary with day-by-day guide, cost breakdown, best time to visit, permits, and accommodation tips.",
        keywords: [
            "Phoksundo itinerary",
            "Phoksundo Lake itinerary",
            "Shey Phoksundo itinerary",
            "Phoksundo itenary",
            "Phoksundo Lake trek",
            "how to reach Phoksundo",
            "Phoksundo trek cost",
            "best time Phoksundo",
            "Ringmo village",
            "Dunai to Phoksundo",
            "Hotel Blue Sheep Inn",
        ],
        alternates: {
            canonical: "/itineraries/phoksundo/",
        },
        openGraph: {
            title: "Phoksundo Lake Itinerary 2025 | Complete Trek Guide",
            description: description || "Complete Phoksundo Lake trek itinerary from Hotel Blue Sheep Inn.",
            type: "article",
            url: "https://hotelbluesheepinn.com/itineraries/phoksundo/",
            images: [
                {
                    url: "https://hotelbluesheepinn.com/phoksundo.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Phoksundo Lake Nepal - Turquoise Mountain Lake",
                },
            ],
            locale: "en_US",
            siteName: "Hotel Blue Sheep Inn",
        },
        twitter: {
            card: "summary_large_image",
            title: "Phoksundo Lake Itinerary 2025 | Complete Trek Guide",
            description: description || "Complete Phoksundo Lake trek itinerary from Hotel Blue Sheep Inn.",
            images: ["https://hotelbluesheepinn.com/phoksundo.jpg"],
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
}

export default async function PhoksundoItineraryPage() {
    const guide = await getTravelGuideByCategory("phoksundo");

    if (!guide) {
        notFound();
    }

    const plainDescription = stripHtml(guide.description);
    const url = "https://hotelbluesheepinn.com/itineraries/phoksundo/";

    const tripJsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: guide.title,
        description: plainDescription,
        touristType: ["Adventure Tourist", "Nature Lover", "Trekker"],
        offers: {
            "@type": "Offer",
            price: guide.price > 0 ? guide.price.toString() : "50000",
            priceCurrency: "NPR",
            availability: "https://schema.org/InStock",
        },
        provider: {
            "@type": "LodgingBusiness",
            name: "Hotel Blue Sheep Inn",
            url: "https://hotelbluesheepinn.com",
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://hotelbluesheepinn.com/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Itineraries",
                item: "https://hotelbluesheepinn.com/itineraries/",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Phoksundo",
                item: url,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation currentPage="travel-guide" />

            <Script
                id="phoksundo-trip-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
            />
            <Script
                id="phoksundo-breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative pt-10 pb-4 lg:pt-16 lg:pb-8 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                            💎 Nepal&apos;s Deepest Lake
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                                {guide.title}
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Ready to Trek to Phoksundo Lake?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Start your Phoksundo adventure from Hotel Blue Sheep Inn in Dunai. We offer comfortable accommodation, local guides, and everything you need.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link
                                href="/travel-guide/"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                            >
                                Travel Guide
                            </Link>
                            <Link
                                href="/attractions/"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                            >
                                View Attractions
                            </Link>
                        </div>

                        {/* Cost section removed as requested */}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pt-4 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <TravelGuideContent content={guide.description} title={guide.title} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Trek to Phoksundo Lake?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Start your Phoksundo adventure from Hotel Blue Sheep Inn in Dunai. We offer
                        comfortable accommodation, local guides, and everything you need.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/travel-guide/"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            Travel Guide
                        </Link>
                        <Link
                            href="/attractions/"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            View Attractions
                        </Link>
                    </div>
                </div>
            </section>

            {/* Visit These Attractions Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                            Visit These Attractions
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Link
                            href="/attractions/#attraction-phoksundo-lake"
                            className="group block bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="h-48 bg-emerald-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">💎</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    Phoksundo Lake
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Nepal&apos;s deepest lake with mesmerizing turquoise waters at 3,611m.
                                </p>
                                <span className="text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                    View Attraction <span>→</span>
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/attractions/#attraction-ringmo-village"
                            className="group block bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="h-48 bg-amber-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">🏘️</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                                    Ringmo Village
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Traditional Tibetan village on the shores of Phoksundo Lake.
                                </p>
                                <span className="text-amber-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                    View Attraction <span>→</span>
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/attractions/"
                            className="group block bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="h-48 bg-blue-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">🌊</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    Phoksundo Waterfall
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    167m tall waterfall cascading from the lake outflow.
                                </p>
                                <span className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                                    View All Attractions <span>→</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Itineraries */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                            Explore More Dolpa Itineraries
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Link
                            href="/itineraries/upper-dolpa/"
                            className="group bg-gradient-to-r from-white to-blue-50/50 rounded-2xl border border-blue-100 shadow-lg p-6 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                                    🏔️
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        Dho Tarap Itinerary
                                    </h3>
                                    <p className="text-gray-600">
                                        10-13 days • Highest village in Nepal
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/itineraries/lower-dolpa/"
                            className="group bg-gradient-to-r from-white to-purple-50/50 rounded-2xl border border-purple-100 shadow-lg p-6 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                                    🗺️
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                        Lower Dolpa Itinerary
                                    </h3>
                                    <p className="text-gray-600">
                                        5-7 days • Budget-friendly option
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
