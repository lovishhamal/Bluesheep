import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
    title: "Dolpa Trek Itineraries 2025 | Phoksundo, Dho Tarap, Lower Dolpa | Hotel Blue Sheep Inn",
    description:
        "Complete Dolpa trekking itineraries: Phoksundo Lake (7-8 days), Dho Tarap (10-13 days), Lower Dolpa (5-7 days). Day-by-day guides, costs, permits, and tips from Hotel Blue Sheep Inn in Dunai.",
    keywords: [
        "Dolpa itinerary",
        "Dolpo itinerary",
        "Phoksundo itinerary",
        "Dho Tarap itinerary",
        "Lower Dolpa itinerary",
        "Upper Dolpa itinerary",
        "Dolpa trek",
        "Dolpa trekking",
        "Nepal trek itinerary",
        "Dolpa itenary",
        "Phoksundo itenary",
        "best Dolpa treks",
        "Hotel Blue Sheep Inn",
    ],
    alternates: {
        canonical: "/itineraries/",
    },
    openGraph: {
        title: "Dolpa Trek Itineraries 2025 | Complete Planning Guides",
        description:
            "Complete Dolpa trekking itineraries: Phoksundo Lake, Dho Tarap, Lower Dolpa. Day-by-day guides from Hotel Blue Sheep Inn.",
        type: "website",
        url: "https://hotelbluesheepinn.com/itineraries/",
        images: [
            {
                url: "https://hotelbluesheepinn.com/phoksundo.jpg",
                width: 1200,
                height: 630,
                alt: "Dolpa Trek Itineraries - Phoksundo Lake Nepal",
            },
        ],
        locale: "en_US",
        siteName: "Hotel Blue Sheep Inn",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const itineraries = [
    {
        title: "Phoksundo Lake Itinerary",
        slug: "phoksundo",
        duration: "7-8 days",
        difficulty: "Moderate",
        maxAltitude: "3,611m",
        cost: "$400-650",
        permitRequired: false,
        description:
            "Trek to Nepal's deepest and most stunning turquoise lake. The classic Dolpa experience with ancient monasteries and Tibetan culture.",
        highlights: [
            "Phoksundo Lake (3,611m)",
            "Ringmo village & monastery",
            "167m Phoksundo waterfall",
            "Shey Phoksundo National Park",
        ],
        color: "emerald",
        emoji: "💎",
    },
    {
        title: "Dho Tarap Itinerary",
        slug: "upper-dolpa",
        duration: "10-13 days",
        difficulty: "Strenuous",
        maxAltitude: "5,238m",
        cost: "$1,600-2,400",
        permitRequired: true,
        description:
            "The ultimate Upper Dolpa adventure to Nepal's highest permanently inhabited village. Experience authentic Tibetan culture unchanged for centuries.",
        highlights: [
            "Dho Tarap village (4,200m)",
            "Numa La Pass (5,238m)",
            "Ancient monasteries",
            "Tibetan Buddhist culture",
        ],
        color: "blue",
        emoji: "🏔️",
    },
    {
        title: "Lower Dolpa Itinerary",
        slug: "lower-dolpa",
        duration: "5-7 days",
        difficulty: "Moderate",
        maxAltitude: "3,611m",
        cost: "$400-650",
        permitRequired: false,
        description:
            "The easiest and most affordable way to experience Dolpa. Perfect for first-time trekkers wanting to see Phoksundo Lake.",
        highlights: [
            "No restricted permit needed",
            "Budget-friendly",
            "Phoksundo Lake",
            "Suitable for beginners",
        ],
        color: "purple",
        emoji: "🗺️",
    },
];

export default function ItinerariesIndexPage() {
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Dolpa Trek Itineraries",
        description:
            "Complete trekking itineraries for Dolpa, Nepal including Phoksundo Lake, Dho Tarap, and Lower Dolpa",
        url: "https://hotelbluesheepinn.com/itineraries/",
        numberOfItems: itineraries.length,
        itemListElement: itineraries.map((itinerary, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "TouristTrip",
                name: itinerary.title,
                description: itinerary.description,
                url: `https://hotelbluesheepinn.com/itineraries/${itinerary.slug}/`,
            },
        })),
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
        ],
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
            emerald: {
                bg: "from-white to-emerald-50/50",
                border: "border-emerald-100",
                text: "text-emerald-600",
                gradient: "from-emerald-500 to-emerald-600",
            },
            blue: {
                bg: "from-white to-blue-50/50",
                border: "border-blue-100",
                text: "text-blue-600",
                gradient: "from-blue-500 to-indigo-600",
            },
            purple: {
                bg: "from-white to-purple-50/50",
                border: "border-purple-100",
                text: "text-purple-600",
                gradient: "from-purple-500 to-pink-500",
            },
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation currentPage="travel-guide" />

            <Script
                id="itineraries-itemlist-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <Script
                id="itineraries-breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm">
                        <ol className="flex items-center space-x-2 text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-emerald-600">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li className="text-emerald-600 font-medium">Itineraries</li>
                        </ol>
                    </nav>

                    <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                            2025 Updated Guides
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Dolpa Trek Itineraries
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Complete day-by-day itineraries for Dolpa&apos;s most spectacular
                            treks. From the turquoise Phoksundo Lake to the remote Dho Tarap
                            village - plan your perfect Himalayan adventure.
                        </p>
                    </div>
                </div>
            </section>

            {/* Itineraries Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {itineraries.map((itinerary) => {
                            const colors = getColorClasses(itinerary.color);
                            return (
                                <Link
                                    key={itinerary.slug}
                                    href={`/itineraries/${itinerary.slug}/`}
                                    className="group block"
                                >
                                    <div
                                        className={`bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full`}
                                    >
                                        {/* Header */}
                                        <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-4xl">{itinerary.emoji}</span>
                                                <div>
                                                    <h2 className="text-xl font-bold group-hover:underline">
                                                        {itinerary.title}
                                                    </h2>
                                                    <p className="text-white/80 text-sm">
                                                        {itinerary.duration} • {itinerary.difficulty}
                                                    </p>
                                                </div>
                                            </div>

                                            {itinerary.permitRequired && (
                                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                                    ⚠️ Restricted Permit Required
                                                </span>
                                            )}
                                            {!itinerary.permitRequired && (
                                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                                    ✓ No Special Permit
                                                </span>
                                            )}
                                        </div>

                                        {/* Body */}
                                        <div className="p-6">
                                            <p className="text-gray-700 mb-4 leading-relaxed">
                                                {itinerary.description}
                                            </p>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                    <span className="text-xs text-gray-500 uppercase">Max Alt</span>
                                                    <p className="font-bold text-gray-900">{itinerary.maxAltitude}</p>
                                                </div>
                                                <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                    <span className="text-xs text-gray-500 uppercase">Est. Cost</span>
                                                    <p className="font-bold text-gray-900">{itinerary.cost}</p>
                                                </div>
                                            </div>

                                            {/* Highlights */}
                                            <div className="space-y-2 mb-4">
                                                {itinerary.highlights.map((highlight, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span className={colors.text}>✓</span>
                                                        <span>{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className={`${colors.text} font-semibold flex items-center gap-2 group-hover:gap-3 transition-all`}>
                                                View Full Itinerary
                                                <span>→</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Start Your Dolpa Adventure
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Hotel Blue Sheep Inn in Dunai is the perfect base for all Dolpa
                        treks. We offer comfortable accommodation, local guides, permit
                        assistance, and expert advice.
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
                            More Travel Guides
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
