import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Navigation from "../components/Navigation";
import {
  PhoneIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Hotel in Phoksundo & Shey Phoksundo | Best Stays & Lodging | Hotel Blue Sheep Inn",
  description:
    "Looking for a hotel in Phoksundo or Shey Phoksundo? Hotel Blue Sheep Inn in Dunai is the premier gateway hotel offering luxury rooms, hot showers, Wi-Fi, garden restaurant, camping & trekking packages to Phoksundo Lake.",
  keywords: [
    "hotel in phoksundo",
    "hotels in phoksundo",
    "hotel phoksundo",
    "shey phoksundo hotel",
    "hotel shey phoksundo",
    "hotel near phoksundo lake",
    "phoksundo hotel booking",
    "stay in phoksundo",
    "accommodation in phoksundo",
    "where to stay in phoksundo",
    "ringmo village hotel",
    "dolpa phoksundo hotel",
    "best hotel in phoksundo",
    "hotel blue sheep inn",
    "phoksundo lodging",
  ],
  alternates: {
    canonical: "https://hotelbluesheepinn.com/hotel-in-phoksundo/",
  },
  openGraph: {
    title: "Hotel in Phoksundo & Shey Phoksundo | Best Stays & Lodging",
    description:
      "Premier hotel accommodation for travelers to Shey Phoksundo Lake. Luxury rooms, hot running water, Wi-Fi, organic restaurant, camping, and trekking logistics at Hotel Blue Sheep Inn.",
    type: "website",
    url: "https://hotelbluesheepinn.com/hotel-in-phoksundo/",
    images: [
      {
        url: "https://hotelbluesheepinn.com/phoksundo.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel in Phoksundo - Hotel Blue Sheep Inn Gateway",
      },
    ],
    locale: "en_US",
    siteName: "Hotel Blue Sheep Inn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel in Phoksundo & Shey Phoksundo | Best Stays & Lodging",
    description:
      "Premier hotel accommodation for travelers to Shey Phoksundo Lake. Luxury rooms, hot water, Wi-Fi, camping, and trekking basecamp at Hotel Blue Sheep Inn.",
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

export default function HotelInPhoksundoPage() {
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Blue Sheep Inn - Hotel in Dunai & Phoksundo Gateway",
    alternateName: [
      "Hotel in Phoksundo",
      "Phoksundo Hotel Base",
      "Shey Phoksundo Hotel Gateway",
      "Blue Sheep Inn Dolpa",
    ],
    image: "https://hotelbluesheepinn.com/logo.png",
    description:
      "Premier luxury hotel and basecamp for travelers to Shey Phoksundo Lake, Dolpa. Deluxe rooms, hot showers, Wi-Fi, garden restaurant, camping grounds, and trekking guide arrangements.",
    url: "https://hotelbluesheepinn.com/hotel-in-phoksundo/",
    telephone: "+977-985-806-1927",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dunai, Dolpa",
      addressLocality: "Dunai",
      addressRegion: "Karnali Province",
      addressCountry: "Nepal",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.9167",
      longitude: "82.8333",
    },
    areaServed: [
      { "@type": "City", name: "Phoksundo" },
      { "@type": "City", name: "Dunai" },
      { "@type": "AdministrativeArea", name: "Shey Phoksundo National Park" },
      { "@type": "City", name: "Ringmo" },
      { "@type": "AdministrativeArea", name: "Dolpa" },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "24/7 Hot Water Showers" },
      { "@type": "LocationFeatureSpecification", name: "Attached Private Bathrooms" },
      { "@type": "LocationFeatureSpecification", name: "Garden Restaurant & Organic Food" },
      { "@type": "LocationFeatureSpecification", name: "Lakeshore & Garden Camping Facilities" },
      { "@type": "LocationFeatureSpecification", name: "Trekking Guide & Porter Services" },
      { "@type": "LocationFeatureSpecification", name: "Private Vehicle Parking" },
    ],
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
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
        name: "Hotel in Phoksundo",
        item: "https://hotelbluesheepinn.com/hotel-in-phoksundo/",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is there a hotel in Phoksundo or Shey Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Directly on the shores of Phoksundo Lake in Ringmo village (3,611m), accommodation is limited to basic traditional stone teahouses with shared facilities and designated campsites. For luxury accommodation, modern rooms, 24/7 hot showers, high-speed Wi-Fi, and comprehensive trekking services, travelers stay at Hotel Blue Sheep Inn in Dunai (the official gateway town of Dolpa) before and after their trek to Phoksundo Lake.",
        },
      },
      {
        "@type": "Question",
        name: "Which is the best hotel near Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hotel Blue Sheep Inn located in Dunai, Dolpa is the highest-rated hotel serving the Phoksundo region. It offers deluxe rooms, attached bathrooms, hot water, garden restaurant dining, vehicle parking, camping grounds, and full logistical support for Shey Phoksundo trekking.",
        },
      },
      {
        "@type": "Question",
        name: "What accommodation is available in Ringmo village near Phoksundo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Ringmo village, local families operate rustic teahouses offering basic rooms with twin beds, thick blankets, and wood-stove heated communal dining halls. Camping is also permitted in designated lakeshore camping areas. Hotel Blue Sheep Inn arranges advance teahouse bookings and camping equipment for trekkers heading to Ringmo.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a hotel for my Phoksundo trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book rooms directly at Hotel Blue Sheep Inn via WhatsApp at +977-985-806-1927 or online through hotelbluesheepinn.com. We can also assist with airport transfers from Juphal, trekking guides, porters, and national park permits.",
        },
      },
      {
        "@type": "Question",
        name: "How far is Hotel Blue Sheep Inn from Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hotel Blue Sheep Inn is located in Dunai, the district headquarters of Dolpa. From the hotel, the trek to Phoksundo Lake is a scenic 2 to 3 day hike (approximately 38 km) through Shey Phoksundo National Park via Chhepka and Jharana waterfall.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="rooms" />

      <Script
        id="phoksundo-hotel-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <Script
        id="phoksundo-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="phoksundo-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-sm font-semibold mb-6">
              <SparklesIcon className="w-4 h-4" />
              Official Phoksundo & Dolpa Staging Hotel
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Hotel in Phoksundo & Shey Phoksundo Gateway
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 leading-relaxed">
              Your premier basecamp for exploring Nepal&apos;s deepest turquoise lake.
              Enjoy luxury rooms, 24/7 hot showers, high-speed Wi-Fi, organic dining,
              and complete trekking logistics at <strong>Hotel Blue Sheep Inn</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/rooms/"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors text-center"
              >
                View Rooms & Rates
              </Link>
              <a
                href="https://wa.me/9779858061927?text=Hi%2C%20I%20would%20like%20to%20book%20a%20stay%20for%20my%20Phoksundo%20trip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl backdrop-blur-sm transition-colors text-center"
              >
                Book via WhatsApp
              </a>
              <Link
                href="/itineraries/phoksundo/"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-emerald-200 font-semibold rounded-xl transition-colors text-center"
              >
                Phoksundo Trek Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facts About Phoksundo Accommodation */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Where to Stay: Phoksundo Lake Accommodation Facts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding how lodging works in Shey Phoksundo National Park ensures a safe,
              comfortable, and well-planned Himalayan expedition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Box 1: Hotel Blue Sheep Inn in Dunai */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-200 shadow-md">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase mb-4">
                Premier Luxury Basecamp
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Hotel Blue Sheep Inn (Dunai)
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Located in Dunai (the administrative capital of Dolpa), Hotel Blue Sheep Inn serves as
                the central staging hotel before starting the trek and the comfort haven upon your return.
              </p>
              <ul className="space-y-3">
                {[
                  "Deluxe rooms with attached private bathrooms & clean linens",
                  "24/7 hot running showers (essential after multi-day trekking)",
                  "High-speed Wi-Fi and 24-hour electricity & charging points",
                  "Restaurant serving fresh organic Nepali, continental & Dolpa dishes",
                  "Secure parking for private jeeps, bikes, and luggage storage",
                  "Trekking permit assistance & arrangement of licensed local guides",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Ringmo Village Teahouses & Camping */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase mb-4">
                Lakeshore Stays (3,611m)
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ringmo Village Teahouses & Camping
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ringmo is a traditional Bon Buddhist village situated right on the southern edge of
                Phoksundo Lake. Here, lodging is rustic and authentic:
              </p>
              <ul className="space-y-3">
                {[
                  "Local family-run stone teahouses with basic twin-bed wooden rooms",
                  "Shared squat toilets and limited solar lighting/heating",
                  "Communal dining rooms centered around traditional wood stoves",
                  "Designated national park campsites along the turquoise lake",
                  "Simple home-cooked meals (Dal Bhat, Tibetan bread, Tsampa, noodle soup)",
                  "Hotel Blue Sheep Inn arranges your teahouse bookings & camping gear in advance",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Amenities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hotel Facilities at Hotel Blue Sheep Inn
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for total comfort before and after your Shey Phoksundo trek.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-gray-100 bg-emerald-50/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                🛏️
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Comfortable Rooms</h4>
              <p className="text-sm text-gray-600">
                Cozy beds, clean linens, attached bathrooms, and scenic Himalayan mountain views.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-blue-50/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                🚿
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Hot Showers</h4>
              <p className="text-sm text-gray-600">
                Continuous hot running water to relax your muscles before and after the trek.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-emerald-50/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                🍽️
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Garden Restaurant</h4>
              <p className="text-sm text-gray-600">
                Fresh organic local food, Dal Bhat, momos, trout, and international breakfast choices.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-blue-50/40 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                ⛺
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Garden & Camp Logistics</h4>
              <p className="text-sm text-gray-600">
                Spacious garden camping, equipment rental, porter hiring, and national park permits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trekking Connection Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trekking to Phoksundo Lake from Our Hotel
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Hotel Blue Sheep Inn is located directly at the trailhead gateway in Dunai.
            From our doorstep, you can embark on the legendary 7-day trek to Phoksundo Lake.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itineraries/phoksundo/"
              className="px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
            >
              View Day-by-Day Trek Itinerary
            </Link>
            <Link
              href="/attractions/"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Explore Dolpa Attractions
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions: Hotel in Phoksundo
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Reserve Your Hotel Stay for Phoksundo
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Rooms in Dolpa fill up fast during the peak trekking seasons (April-May & September-November).
            Contact us today to secure your reservation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:+9779858061927"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              <PhoneIcon className="w-5 h-5" />
              Call +977-985-806-1927
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-600 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Contact Us Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
