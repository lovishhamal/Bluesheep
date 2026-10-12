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

    const plainDescription = guide ? stripHtml(guide.description) : "";
    const description = plainDescription.length > 160
        ? `${plainDescription.slice(0, 160)}...`
        : plainDescription || "Complete trekking to Phoksundo Lake guide (Shey Phoksundo). Day-by-day itinerary, permit fees, Ringmo village, best hotel in Dunai gateway & travel tips.";

    return {
        title: "Trekking to Phoksundo | Shey Phoksundo Trek Guide & Hotel Base | Hotel Blue Sheep Inn",
        description: description,
        keywords: [
            "phoksundo",
            "shey phoksundo",
            "hotel in phoksundo",
            "hotels in phoksundo",
            "hotel shey phoksundo",
            "treking to phoksundo",
            "trekking to phoksundo",
            "trek to phoksundo",
            "shey phoksundo trek",
            "shey phoksundo trekking",
            "Phoksundo itinerary",
            "Phoksundo Lake itinerary",
            "Shey Phoksundo itinerary",
            "Phoksundo Lake trek",
            "how to reach Phoksundo",
            "Phoksundo trek cost",
            "best time Phoksundo",
            "Ringmo village",
            "Dunai to Phoksundo",
            "Hotel Blue Sheep Inn",
        ],
        alternates: {
            canonical: "https://hotelbluesheepinn.com/itineraries/phoksundo/",
        },
        openGraph: {
            title: "Trekking to Phoksundo | Shey Phoksundo Trek Guide & Hotel Base",
            description: description,
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
            title: "Trekking to Phoksundo | Shey Phoksundo Trek Guide & Hotel Base",
            description: description,
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
            "price": "0",
            "priceCurrency": "NPR",
            "availability": "https://schema.org/InStock",
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

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How to plan trekking to Phoksundo (treking to phoksundo)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Trekking to Phoksundo Lake (3,611m) begins with a flight to Juphal Airport or overland bus/jeep to Dunai. From Dunai, trek 2-3 days through Shey Phoksundo National Park via Chhepka and Jharana to reach Ringmo village and the turquoise waters of Phoksundo Lake. Hotel Blue Sheep Inn in Dunai provides the ideal staging basecamp, rooms, permits, and guides."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a hotel in Phoksundo or Shey Phoksundo?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Directly at Phoksundo Lake (Ringmo village), accommodation consists of rustic local teahouses and camping grounds. Most travelers stay in Dunai at Hotel Blue Sheep Inn, the leading luxury hotel in the region with deluxe rooms, attached bathrooms, hot showers, Wi-Fi, and garden dining before and after the trek."
                }
            },
            {
                "@type": "Question",
                "name": "What is the best Phoksundo Lake itinerary for 7 days?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A classic 7-day Phoksundo itinerary: Day 1 Kathmandu/Nepalgunj to Juphal and jeep to Dunai (stay at Hotel Blue Sheep Inn); Day 2 Dunai to Chhepka; Day 3 Chhepka to Jharana waterfall; Day 4 Jharana to Ringmo village at Phoksundo Lake; Day 5 Explore Phoksundo Lake and Tshowa Bon Gompa; Day 6 Return trek to Chhepka; Day 7 Chhepka to Dunai (Hotel Blue Sheep Inn)."
                }
            },
            {
                "@type": "Question",
                "name": "What permits are required for trekking to Shey Phoksundo?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You require the Shey Phoksundo National Park Entry Permit (NPR 3,000 for foreigners) and the Lower Dolpa Restricted Area Permit ($20 per person per week). Hotel Blue Sheep Inn can assist with permit arrangements in Dunai."
                }
            },
            {
                "@type": "Question",
                "name": "What makes Shey Phoksundo Lake famous?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Shey Phoksundo Lake is Nepal's deepest lake (145m deep) situated at 3,611m altitude. It is famous for its magical crystal-turquoise color, absence of aquatic life, the towering 167m waterfall, and the 900-year-old Bon monastery in Ringmo."
                }
            }
        ]
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
            <Script
                id="phoksundo-faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                                Phoksundo Itinerary
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

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
                        <span>🤔</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">What is the best Phoksundo Lake itinerary for 7 days?</h3>
                            <p className="text-gray-600">A standard 7-day Phoksundo itinerary starts with a flight to Juphal, followed by a trek to Dunai, Chhepka, Jharana, and finally Ringmo village at Shey Phoksundo Lake.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">How do I reach Phoksundo Lake?</h3>
                            <p className="text-gray-600">To reach Phoksundo Lake, fly from Kathmandu to Juphal, take a jeep to Dunai, and then enjoy a beautiful 2-3 day trek through the Shey Phoksundo National Park reaching Ringmo village.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Is a guide required for the Phoksundo itinerary?</h3>
                            <p className="text-gray-600">While not strictly mandatory for the lower Phoksundo trek, we highly recommend a local guide for safety and cultural immersion. Hotel Blue Sheep Inn can arrange expert local guides for your trip.</p>
                        </div>
                    </div>
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
