import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
    title: "Places in Dolpa 2025 | Best Tourist Attractions | Hotel Blue Sheep Inn",
    description:
        "Discover the best places to visit in Dolpa: Phoksundo Lake, Dho Tarap, Shey Gompa, Crystal Mountain, Ringmo Village, Dunai, and more. Complete guide to Dolpa attractions from Hotel Blue Sheep Inn.",
    keywords: [
        // Primary Keywords
        "places in Dolpa",
        "Dolpa places to visit",
        "places to visit in Dolpa",
        "things to do in Dolpa",
        "things to see in Dolpa",
        "Dolpa attractions",
        "Dolpa tourist attractions",
        "what to see in Dolpa",
        "must visit places Dolpa",
        "tourist places Dolpa",

        // Specific Places
        "Phoksundo Lake",
        "Dho Tarap",
        "Shey Gompa",
        "Crystal Mountain Nepal",
        "Ringmo village",
        "Dunai Dolpa",
        "Juphal airport",
        "Shey Phoksundo National Park",
        "Tarap Valley",

        // Related Keywords
        "Dolpa Nepal",
        "Dolpa tourism",
        "visit Dolpa",
        "Dolpa sightseeing",
        "best of Dolpa",
        "Dolpa hidden gems",
        "remote places Nepal",
        "off beat Nepal",
        "Hotel Blue Sheep Inn",
    ],
    alternates: {
        canonical: "/places-in-dolpa/",
    },
    openGraph: {
        title: "Places in Dolpa 2025 | Best Tourist Attractions to Visit",
        description:
            "Discover the best places to visit in Dolpa: Phoksundo Lake, Dho Tarap, Shey Gompa, Crystal Mountain, and more from Hotel Blue Sheep Inn.",
        type: "website",
        url: "https://hotelbluesheepinn.com/places-in-dolpa/",
        images: [
            {
                url: "https://hotelbluesheepinn.com/phoksundo.jpg",
                width: 1200,
                height: 630,
                alt: "Places in Dolpa Nepal - Phoksundo Lake",
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

const places = [
    {
        name: "Phoksundo Lake",
        nepaliName: "फोक्सुण्डो ताल",
        description:
            "Nepal's deepest lake at 145 meters, famous for its stunning turquoise color. Located at 3,611m in Shey Phoksundo National Park, this crystal-clear lake has no aquatic life due to its mineral composition. The lake is sacred to both Buddhists and Bon practitioners.",
        elevation: "3,611m",
        location: "Lower Dolpa",
        bestTime: "Mar-May, Sep-Nov",
        difficulty: "Moderate",
        duration: "2-3 days from Dunai",
        highlights: [
            "Deepest lake in Nepal (145m)",
            "Stunning turquoise color",
            "No aquatic life",
            "Sacred to Buddhists",
            "Ringmo village nearby",
        ],
        image: "/phoksundo.jpg",
        color: "emerald",
        emoji: "💎",
    },
    {
        name: "Dho Tarap",
        nepaliName: "ढो तराप",
        description:
            "One of Nepal's highest permanently inhabited villages at 4,200m. This remote Tibetan Buddhist settlement preserves ancient traditions unchanged for centuries. Experience authentic yak herding culture, ancient monasteries, and the warm hospitality of the Dolpo people.",
        elevation: "4,200m",
        location: "Upper Dolpa",
        bestTime: "May-Jun, Sep-Oct",
        difficulty: "Strenuous",
        duration: "4-5 days from Dunai",
        highlights: [
            "Highest village in Nepal",
            "Ancient Tibetan culture",
            "Yak herding traditions",
            "Remote monasteries",
            "Untouched Himalayan life",
        ],
        image: "/dho.jpg",
        color: "blue",
        emoji: "🏔️",
    },
    {
        name: "Shey Gompa",
        nepaliName: "शे गोम्पा",
        description:
            "An ancient Tibetan Buddhist monastery and pilgrimage site near Crystal Mountain. Dating back centuries, Shey Gompa is a sacred site for Bon and Buddhist practitioners. The annual full moon festival attracts pilgrims from across the Himalayan region.",
        elevation: "4,300m",
        location: "Upper Dolpa",
        bestTime: "Sep-Nov",
        difficulty: "Strenuous",
        duration: "5-6 days from Dunai",
        highlights: [
            "Ancient monastery",
            "Buddhist & Bon pilgrimage",
            "Crystal Mountain views",
            "Annual festival",
            "Sacred meditation caves",
        ],
        image: "/phoksundo.jpg",
        color: "orange",
        emoji: "🛕",
    },
    {
        name: "Crystal Mountain",
        nepaliName: "क्रिस्टल माउन्टेन",
        description:
            "A sacred peak revered by Tibetan Buddhists as a representation of the cosmic axis. Featured in Peter Matthiessen's famous book 'The Snow Leopard', Crystal Mountain draws spiritual seekers and adventurers alike. The mountain's unique crystal formations give it a mystical appearance.",
        elevation: "5,188m",
        location: "Upper Dolpa",
        bestTime: "Sep-Nov",
        difficulty: "Very Strenuous",
        duration: "10-14 days circuit",
        highlights: [
            "Sacred Buddhist peak",
            "Crystal formations",
            "Snow leopard habitat",
            "The Snow Leopard book",
            "Ultimate Himalayan pilgrimage",
        ],
        image: "/phoksundo.jpg",
        color: "indigo",
        emoji: "🔮",
    },
    {
        name: "Ringmo Village",
        nepaliName: "रिङ्मो गाउँ",
        description:
            "A traditional Tibetan village perched above Phoksundo Lake. Home to about 60 households, Ringmo maintains ancient traditions and is known for its distinctive Tibetan architecture, friendly locals, and the ancient Ringmo Gompa with its Buddhist murals.",
        elevation: "3,640m",
        location: "Lower Dolpa",
        bestTime: "Mar-May, Sep-Nov",
        difficulty: "Moderate",
        duration: "2-3 days from Dunai",
        highlights: [
            "Traditional Tibetan village",
            "Ancient gompa",
            "Buddhist murals",
            "Lake views",
            "Local hospitality",
        ],
        image: "/phoksundo.jpg",
        color: "amber",
        emoji: "🏘️",
    },
    {
        name: "Dunai",
        nepaliName: "डुनई",
        description:
            "The district headquarters and gateway to all Dolpa adventures. This small bazaar town offers basic amenities, permit offices, and is home to Hotel Blue Sheep Inn. Dunai is the starting point for treks to Phoksundo, Dho Tarap, and beyond.",
        elevation: "2,100m",
        location: "Central Dolpa",
        bestTime: "Year-round",
        difficulty: "Easy",
        duration: "Base camp",
        highlights: [
            "District headquarters",
            "Gateway to Dolpa",
            "Hotel Blue Sheep Inn",
            "Permit offices",
            "Local market",
        ],
        image: "/phoksundo.jpg",
        color: "teal",
        emoji: "🏨",
    },
    {
        name: "Tarap Valley",
        nepaliName: "तराप उपत्यका",
        description:
            "A broad, beautiful high-altitude valley leading to Dho Tarap. The Tarap Valley offers spectacular scenery with yak pastures, scattered settlements, and dramatic mountain views. It's one of Nepal's most remote and pristine valleys.",
        elevation: "3,500m - 4,200m",
        location: "Upper Dolpa",
        bestTime: "May-Jun, Sep-Oct",
        difficulty: "Strenuous",
        duration: "3-4 days from Dunai",
        highlights: [
            "High-altitude valley",
            "Yak pastures",
            "Tibetan settlements",
            "Mountain panoramas",
            "Remote wilderness",
        ],
        image: "/dho.jpg",
        color: "green",
        emoji: "🏞️",
    },
    {
        name: "Phoksundo Waterfall",
        nepaliName: "फोक्सुण्डो झरना",
        description:
            "One of Nepal's tallest waterfalls at 167 meters, located near the entrance to Phoksundo Lake. The waterfall cascades dramatically into the Suli Gad river and is a stunning sight, especially during spring when water flow is highest.",
        elevation: "3,200m",
        location: "Lower Dolpa",
        bestTime: "Mar-Jun",
        difficulty: "Moderate",
        duration: "1-2 days from Dunai",
        highlights: [
            "167m tall waterfall",
            "One of Nepal's tallest",
            "Dramatic cascades",
            "Near Phoksundo Lake",
            "Photography spot",
        ],
        image: "/phoksundo.jpg",
        color: "cyan",
        emoji: "💧",
    },
];

const faqData = [
    {
        question: "What are the best places to visit in Dolpa?",
        answer:
            "The best places in Dolpa are: 1) Phoksundo Lake - Nepal's deepest turquoise lake, 2) Dho Tarap - highest village in Nepal, 3) Shey Gompa - ancient Buddhist monastery, 4) Crystal Mountain - sacred peak, 5) Ringmo Village - traditional Tibetan settlement, and 6) Phoksundo Waterfall - 167m tall cascade.",
    },
    {
        question: "How many days do I need to see places in Dolpa?",
        answer:
            "It depends on what you want to see: Phoksundo Lake needs 5-7 days, Dho Tarap requires 10-13 days, and a comprehensive Dolpa circuit takes 2-3 weeks. Most visitors spend 7-8 days to see Phoksundo Lake and Ringmo village.",
    },
    {
        question: "What is the best time to visit places in Dolpa?",
        answer:
            "The best time is March-May (spring) for wildflowers and clear skies, and September-November (autumn) for stable weather and mountain views. Avoid monsoon (June-August) and harsh winter (December-February).",
    },
    {
        question: "Which places in Dolpa don't need special permits?",
        answer:
            "Lower Dolpa (Phoksundo Lake, Ringmo, Phoksundo Waterfall) only requires TIMS and National Park permits. Upper Dolpa (Dho Tarap, Shey Gompa, Crystal Mountain) requires expensive restricted area permits ($500 for 10 days).",
    },
    {
        question: "What is the most famous place in Dolpa?",
        answer:
            "Phoksundo Lake is the most famous - Nepal's deepest lake with stunning turquoise waters at 3,611m. It's featured in many documentaries and is the primary attraction for Dolpa visitors.",
    },
    {
        question: "Are there hotels near Dolpa attractions?",
        answer:
            "Hotel Blue Sheep Inn in Dunai is the best base for exploring Dolpa attractions. It offers comfortable rooms, local guides, and is located at the gateway to all major Dolpa destinations.",
    },
];

export default function PlacesInDolpaPage() {
    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Places to Visit in Dolpa, Nepal",
        description:
            "Complete guide to the best tourist attractions and places to visit in Dolpa district, Nepal",
        url: "https://hotelbluesheepinn.com/places-in-dolpa/",
        numberOfItems: places.length,
        itemListElement: places.map((place, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "TouristAttraction",
                name: place.name,
                description: place.description,
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: "29.2000",
                    longitude: "82.9000",
                },
            },
        })),
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
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
                name: "Places in Dolpa",
                item: "https://hotelbluesheepinn.com/places-in-dolpa/",
            },
        ],
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
            emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
            blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
            orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
            indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700" },
            amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
            teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", badge: "bg-teal-100 text-teal-700" },
            green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", badge: "bg-green-100 text-green-700" },
            cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", badge: "bg-cyan-100 text-cyan-700" },
        };
        return colors[color] || colors.emerald;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation currentPage="attractions" />

            <Script
                id="places-itemlist-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <Script
                id="places-faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Script
                id="places-breadcrumb-jsonld"
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
                            <li className="text-emerald-600 font-medium">Places in Dolpa</li>
                        </ol>
                    </nav>

                    <div className="text-center">
                        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                            {places.length} Amazing Destinations
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Places in Dolpa
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Discover the hidden gems of Nepal&apos;s most remote and beautiful
                            district. From turquoise lakes to ancient monasteries and the
                            highest villages in the Himalayas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Places Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8">
                        {places.map((place) => {
                            const colors = getColorClasses(place.color);
                            return (
                                <div
                                    key={place.name}
                                    className={`${colors.bg} rounded-2xl border ${colors.border} shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}
                                >
                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Left - Icon & Title */}
                                            <div className="lg:w-1/3">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <span className="text-5xl">{place.emoji}</span>
                                                    <div>
                                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                            {place.name}
                                                        </h2>
                                                        <p className="text-gray-500">{place.nepaliName}</p>
                                                    </div>
                                                </div>

                                                {/* Quick Stats */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                        <span className="text-xs text-gray-500 uppercase">Elevation</span>
                                                        <p className="font-bold text-gray-900">{place.elevation}</p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                        <span className="text-xs text-gray-500 uppercase">Difficulty</span>
                                                        <p className="font-bold text-gray-900">{place.difficulty}</p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                        <span className="text-xs text-gray-500 uppercase">Best Time</span>
                                                        <p className="font-bold text-gray-900 text-sm">{place.bestTime}</p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                                        <span className="text-xs text-gray-500 uppercase">Duration</span>
                                                        <p className="font-bold text-gray-900 text-sm">{place.duration}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right - Description & Highlights */}
                                            <div className="lg:w-2/3">
                                                <span className={`inline-block px-3 py-1 ${colors.badge} rounded-full text-sm font-medium mb-3`}>
                                                    {place.location}
                                                </span>
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    {place.description}
                                                </p>

                                                {/* Highlights */}
                                                <div className="flex flex-wrap gap-2">
                                                    {place.highlights.map((highlight, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                                                        >
                                                            {highlight}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white rounded-xl border border-emerald-100 shadow-md overflow-hidden"
                            >
                                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:text-emerald-700 transition-colors">
                                    <span className="pr-4">{faq.question}</span>
                                    <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                        ▼
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Explore Dolpa?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Stay at Hotel Blue Sheep Inn in Dunai - the perfect base for
                        exploring all places in Dolpa. We offer comfortable accommodation,
                        local guides, and everything you need for your adventure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/itineraries/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                        >
                            View Itineraries
                        </Link>
                        <Link
                            href="/contact/"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
