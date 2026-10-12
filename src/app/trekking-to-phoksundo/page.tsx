import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Navigation from "../components/Navigation";
import { TicketIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Trekking to Phoksundo Lake | Shey Phoksundo Trek Guide & Itinerary | Hotel Blue Sheep Inn",
  description:
    "Complete factual guide for trekking to Phoksundo Lake (Shey Phoksundo), Dolpa, Nepal. Verified day-by-day 7-day itinerary, permit fees, Ringmo village, altitude facts, and staging hotel in Dunai.",
  keywords: [
    "treking to phoksundo",
    "trekking to phoksundo",
    "trek to phoksundo",
    "shey phoksundo",
    "phoksundo",
    "shey phoksundo trek",
    "shey phoksundo trekking",
    "phoksundo lake trek",
    "phoksundo trek cost",
    "hotel in phoksundo",
    "dunai to phoksundo",
    "shey phoksundo national park",
    "ringmo village",
    "hotel blue sheep inn",
    "dolpa trekking",
  ],
  alternates: {
    canonical: "https://hotelbluesheepinn.com/trekking-to-phoksundo/",
  },
  openGraph: {
    title: "Trekking to Phoksundo Lake | Shey Phoksundo Trek Guide",
    description:
      "Everything you need to know for trekking to Shey Phoksundo Lake (3,611m). 7-day itinerary, permit costs, Ringmo village, and basecamp stay at Hotel Blue Sheep Inn.",
    type: "article",
    url: "https://hotelbluesheepinn.com/trekking-to-phoksundo/",
    images: [
      {
        url: "https://hotelbluesheepinn.com/phoksundo.jpg",
        width: 1200,
        height: 630,
        alt: "Trekking to Phoksundo Lake Nepal",
      },
    ],
    locale: "en_US",
    siteName: "Hotel Blue Sheep Inn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trekking to Phoksundo Lake | Shey Phoksundo Trek Guide",
    description:
      "Everything you need to know for trekking to Shey Phoksundo Lake. 7-day itinerary, permit costs, and basecamp stay at Hotel Blue Sheep Inn in Dunai.",
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

export default function TrekkingToPhoksundoPage() {
  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Trekking to Phoksundo Lake (Shey Phoksundo Trek)",
    description:
      "A classic 7 to 8 day Himalayan trek to Nepal's deepest alpine lake (3,611m) in Shey Phoksundo National Park, starting from Dunai, Dolpa.",
    touristType: ["Adventure Trekker", "Nature Enthusiast", "Photographer"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "LodgingBusiness",
      name: "Hotel Blue Sheep Inn",
      url: "https://hotelbluesheepinn.com",
      telephone: "+977-985-806-1927",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dunai, Dolpa",
        addressLocality: "Dunai",
        addressRegion: "Karnali Province",
        addressCountry: "Nepal",
      },
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Day 1: Arrival in Dunai via Juphal Airport (Stay at Hotel Blue Sheep Inn)",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Day 2: Dunai to Chhepka (Shey Phoksundo National Park Entry)",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Day 3: Chhepka to Jharana (167m Phoksundo Waterfall View)",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Day 4: Jharana to Ringmo Village & Shey Phoksundo Lake (3,611m)",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Day 5: Exploration of Phoksundo Lake & 900-year-old Tshowa Bon Gompa",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Day 6: Return Trek from Phoksundo Lake to Chhepka",
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Day 7: Chhepka to Dunai (Celebration at Hotel Blue Sheep Inn)",
        },
      ],
    },
  };

  const breadcrumbSchema = {
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
        name: "Trekking to Phoksundo",
        item: "https://hotelbluesheepinn.com/trekking-to-phoksundo/",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many days does trekking to Phoksundo take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard trek from Dunai to Phoksundo Lake takes 2 to 3 days each way (7 to 8 days total for the complete round-trip itinerary including flights and exploration at Ringmo village and Tshowa Bon Gompa).",
        },
      },
      {
        "@type": "Question",
        name: "What permits are required for trekking to Shey Phoksundo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trekkers require two permits: 1) Shey Phoksundo National Park Entry Permit (NPR 3,000 for foreigners, NPR 1,500 for SAARC nationals), and 2) Lower Dolpa Restricted Area Permit (RAP) costing $20 USD per person per week.",
        },
      },
      {
        "@type": "Question",
        name: "How difficult is treking to Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trekking to Phoksundo is rated moderate. The trail follows river valleys and forested gorges up to 3,611 meters at Ringmo. It does not cross any high mountain passes, making it suitable for beginners and experienced trekkers in reasonable physical condition.",
        },
      },
      {
        "@type": "Question",
        name: "Where do trekkers stay during the Phoksundo trek?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trekkers stay in Dunai at Hotel Blue Sheep Inn before and after the trek for luxury rooms, hot water, Wi-Fi, and food. Along the trail (in Chhepka, Jharana, and Ringmo village), accommodation is in local stone teahouses or tent campsites.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best month for trekking to Phoksundo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best months are Spring (April to May) and Autumn (September to November), offering clear blue skies, stable weather, and the most vibrant turquoise water colors.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="travel-guide" />

      <Script
        id="phoksundo-trip-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />
      <Script
        id="phoksundo-trip-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="phoksundo-trip-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-sm font-semibold mb-6">
              💎 Shey Phoksundo National Park • Altitude 3,611m
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Trekking to Phoksundo Lake: Complete Guide
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 leading-relaxed">
              Discover Nepal&apos;s deepest and most breathtaking turquoise alpine lake.
              Follow our verified day-by-day route, permit requirements, trail facts,
              and stay at <strong>Hotel Blue Sheep Inn</strong> in Dunai as your official basecamp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/hotel-in-phoksundo/"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors text-center"
              >
                Hotel in Phoksundo Basecamp
              </Link>
              <Link
                href="/itineraries/phoksundo/"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-colors text-center"
              >
                Detailed Itinerary
              </Link>
              <a
                href="https://wa.me/9779858061927?text=Hi%2C%20I%20want%20information%20about%20trekking%20to%20Phoksundo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-emerald-200 font-semibold rounded-xl transition-colors text-center"
              >
                Ask via WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Strip */}
      <section className="bg-emerald-800 text-white py-6 border-y border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-200">3,611 m</div>
              <div className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider">Lake Altitude</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-200">145 m</div>
              <div className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider">Maximum Depth (Nepal&apos;s Deepest)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-200">7 - 8 Days</div>
              <div className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider">Standard Trek Duration</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-200">Dunai</div>
              <div className="text-xs sm:text-sm text-emerald-100 uppercase tracking-wider">Trek Starting Basecamp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Day-by-Day Route */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Verified 7-Day Day-by-Day Trekking Route
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real trail itinerary from Kathmandu to Shey Phoksundo Lake and return.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                day: "Day 1",
                title: "Fly to Juphal (2,475m) & Travel to Dunai (2,140m)",
                desc: "Take a scenic mountain flight from Nepalgunj to Juphal Airport. Transfer by jeep or walk 3 hours along the Bheri River to Dunai, the district headquarters of Dolpa. Check in at Hotel Blue Sheep Inn for pre-trek briefing, hot showers, and gear check.",
              },
              {
                day: "Day 2",
                title: "Dunai to Chhepka (2,838m) • 5-6 Hours Trek",
                desc: "Cross the suspension bridge over Bheri River, reach Suligad and enter the official Shey Phoksundo National Park checkpoint. Follow the trail alongside the roaring Phoksundo Khola through lush pine and bamboo forests to reach Chhepka village.",
              },
              {
                day: "Day 3",
                title: "Chhepka to Jharana Viewpoint / Rechi (3,110m) • 5 Hours Trek",
                desc: "Hike through dense cedar woodlands and cross timber bridges. Climb steadily toward the Jharana ridge, where you are greeted by the magnificent 167m Phoksundo waterfall—Nepal's highest cascading waterfall.",
              },
              {
                day: "Day 4",
                title: "Jharana to Ringmo Village & Shey Phoksundo Lake (3,611m) • 4-5 Hours Trek",
                desc: "A breathtaking ascent through pine and birch trees brings you over a gentle ridge to the opening of the Phoksundo valley. Ringmo village welcomes you with mani stones, prayer flags, and the crystal turquoise waters of Phoksundo Lake.",
              },
              {
                day: "Day 5",
                title: "Exploration of Phoksundo Lake & Tshowa Bon Gompa",
                desc: "Rest and explore the magical shores of Phoksundo Lake. Walk along the legendary cliff trail carved into rock walls above the water. Visit the 900-year-old Tshowa Gompa, an ancient Bon monastery perched on a rocky promontory overlooking the deep blue waters.",
              },
              {
                day: "Day 6",
                title: "Ringmo to Shyanta / Chhepka • 6 Hours Trek",
                desc: "Say farewell to Phoksundo Lake and retrace your steps down the river valley through the national park woodlands.",
              },
              {
                day: "Day 7",
                title: "Return to Dunai (Hotel Blue Sheep Inn)",
                desc: "Complete the final stretch back to Dunai. Rejuvenate with hot showers, comfortable beds, and a celebratory dinner at Hotel Blue Sheep Inn garden restaurant.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-emerald-50/30 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                  {step.day}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permits & Logistics */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Permits & Trekking Costs for Shey Phoksundo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All trekkers must obtain valid permits before entering Shey Phoksundo National Park.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-emerald-600 font-bold text-lg mb-2 flex items-center gap-2">
                <TicketIcon className="w-6 h-6" />
                1. National Park Permit
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Shey Phoksundo National Park Entry Permit is mandatory for all visitors entering via Suligad.
              </p>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Foreign Nationals: <strong>NPR 3,000</strong> (~$23 USD) + 13% VAT</li>
                <li>• SAARC Citizens: <strong>NPR 1,500</strong></li>
                <li>• Nepali Citizens: <strong>NPR 100</strong></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-blue-600 font-bold text-lg mb-2 flex items-center gap-2">
                <TicketIcon className="w-6 h-6" />
                2. Lower Dolpa Restricted Permit
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Lower Dolpa Restricted Area Permit (RAP) issued by the Department of Immigration.
              </p>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Cost: <strong>$20 USD per person per week</strong></li>
                <li>• Requirement: Minimum 2 trekkers through registered agency</li>
                <li>• Assistance: Available through Hotel Blue Sheep Inn in Dunai</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Staging Basecall */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase mb-4 tracking-wider">
                Basecamp Accommodation
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Stay at Hotel Blue Sheep Inn in Dunai
              </h2>
              <p className="text-emerald-100 text-base sm:text-lg mb-8 leading-relaxed">
                Before heading into the rugged trails of Shey Phoksundo, ensure you are well-rested
                and equipped. Hotel Blue Sheep Inn offers clean rooms with private baths, hot water,
                Wi-Fi, vehicle parking, and full guide & porter logistics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rooms/"
                  className="px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors text-center shadow-md"
                >
                  Book Hotel Rooms
                </Link>
                <Link
                  href="/hotel-in-phoksundo/"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center"
                >
                  Phoksundo Hotel Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions: Trekking to Phoksundo
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
