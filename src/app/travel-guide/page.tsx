import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getTravelGuides, stripHtml } from "./dummyTravelGuides";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
  title: "Complete Travel Guides to Dolpa Nepal | Hotel Blue Sheep Inn - Expert Local Tips & Itineraries",
  description:
    "Discover comprehensive travel guides to Dolpa, Nepal with detailed routes from Kathmandu, flight options to Juphal, jeep connections, local attractions, and insider tips. Plan your perfect journey to Phoksundo Lake and remote Himalayan villages with our expert local knowledge.",
  keywords: [
    "Dolpa travel guide",
    "Nepal travel guides", 
    "Phoksundo Lake travel",
    "Dho Tarap guide",
    "Kathmandu to Dolpa route",
    "Juphal airport flights",
    "Dunai travel information",
    "Upper Dolpa trekking",
    "Nepal Himalayan travel",
    "Dolpa itinerary planning",
    "Remote Nepal destinations",
    "Phoksundo Lake trekking",
    "Dho Tarap trekking guide",
    "Crystal Mountain trek",
    "Dolpa lakes travel",
    "Hotel Blue Sheep Inn guides"
  ],
  alternates: {
    canonical: "/travel-guide",
  },
  openGraph: {
    title: "Complete Travel Guides to Dolpa Nepal | Expert Local Knowledge",
    description:
      "Comprehensive travel guides to Dolpa with detailed routes, flight options, local attractions, and insider tips from Hotel Blue Sheep Inn. Explore Phoksundo Lake, Dho Tarap, and Crystal Mountain.",
    type: "website",
    url: "https://hotelbluesheepinn.com/travel-guide",
    images: [
      {
        url: "https://hotelbluesheepinn.com/phoksundo.jpg",
        width: 1200,
        height: 630,
        alt: "Phoksundo Lake Dolpa Nepal Travel Guide"
      }
    ],
    locale: "en_US",
    siteName: "Hotel Blue Sheep Inn"
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Travel Guides to Dolpa Nepal | Expert Local Knowledge",
    description: "Comprehensive travel guides to Dolpa with detailed routes, flight options, and insider tips. Explore Phoksundo Lake, Dho Tarap, and Crystal Mountain.",
    images: ["https://hotelbluesheepinn.com/phoksundo.jpg"]
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

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function TravelGuidePage() {
  noStore();
  const guides = await getTravelGuides();
  const listGuides = guides.filter((g) => g.type === "list");
  const generalGuides = guides.filter((g) => g.type === "general");
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dolpa Nepal Travel Guides",
    description: "Comprehensive collection of travel guides for Dolpa, Nepal including routes, attractions, and local insights",
    url: "https://hotelbluesheepinn.com/travel-guide",
    numberOfItems: listGuides.length,
    itemListElement: listGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TravelGuide",
        "@id": `https://hotelbluesheepinn.com/travel-guide/${guide.slug}`,
        url: `https://hotelbluesheepinn.com/travel-guide/${guide.slug}`,
        name: guide.title,
        description: stripHtml(guide.description).slice(0, 160),
        author: {
          "@type": "Organization",
          name: "Hotel Blue Sheep Inn",
          url: "https://hotelbluesheepinn.com"
        },
        publisher: {
          "@type": "Organization",
          name: "Hotel Blue Sheep Inn",
          url: "https://hotelbluesheepinn.com"
        },
        about: {
          "@type": "Place",
          name: "Dolpa, Nepal",
          geo: {
            "@type": "GeoCoordinates",
            latitude: "29.0833",
            longitude: "82.8833"
          }
        },
        ...(guide.price > 0 && {
          offers: {
            "@type": "Offer",
            price: guide.price,
            priceCurrency: "NPR",
            availability: "https://schema.org/InStock"
          }
        })
      }
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
        item: "https://hotelbluesheepinn.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel Guides",
        item: "https://hotelbluesheepinn.com/travel-guide"
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I get to Dolpa from Kathmandu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Dolpa from Kathmandu by taking a flight to Juphal Airport (45 minutes) followed by a jeep ride to Dunai (6-8 hours), or by taking a direct bus journey (approximately 30 hours). Our travel guides provide detailed route information for both options."
        }
      },
      {
        "@type": "Question", 
        name: "What is the best time to visit Dolpa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best time to visit Dolpa is during spring (March-May) and autumn (September-November) when weather conditions are most favorable for travel and trekking. Winter can be extremely cold with heavy snowfall."
        }
      },
      {
        "@type": "Question",
        name: "Do I need special permits for Dolpa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dolpa requires special permits including the Restricted Area Permit for Upper Dolpa and TIMS card. Our travel guides include detailed information about permit requirements and how to obtain them."
        }
      },
      {
        "@type": "Question",
        name: "How do I get to Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To reach Phoksundo Lake, fly from Kathmandu to Juphal Airport (45 minutes), then take a jeep to Dunai (6-8 hours), followed by a 2-3 day trek to the lake. Our detailed travel guides include route maps, accommodation options, and permit requirements."
        }
      },
      {
        "@type": "Question",
        name: "Can I visit Dho Tarap from Phoksundo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dho Tarap can be reached from Phoksundo Lake via a multi-day trekking route through Upper Dolpa. This requires special permits and is typically part of a longer Crystal Mountain circuit trek. Our guides provide detailed itineraries for this route."
        }
      }
    ]
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Hotel Blue Sheep Inn Travel Guides",
    description: "Expert travel guides and local knowledge for Dolpa, Nepal",
    url: "https://hotelbluesheepinn.com/travel-guide",
    parentOrganization: {
      "@type": "LodgingBusiness",
      name: "Hotel Blue Sheep Inn",
      url: "https://hotelbluesheepinn.com"
    },
    areaServed: {
      "@type": "Place",
      name: "Dolpa District, Nepal"
    },
    knowsAbout: [
      "Dolpa travel routes",
      "Phoksundo Lake access",
      "Dho Tarap trekking",
      "Crystal Mountain pilgrimage",
      "Nepal mountain travel",
      "Himalayan trekking",
      "Local transportation",
      "Upper Dolpa permits"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="travel-guide" />
      
      <Script
        id="travel-guide-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Script
        id="travel-guide-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="travel-guide-organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="travel-guide-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="pt-4 pb-16 bg-white relative overflow-hidden lg:px-12">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-4">
              <span className="text-5xl" role="img" aria-label="Map">🗺️</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Complete Travel Guides to Dolpa, Nepal
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert travel guides with detailed routes from Kathmandu to Dolpa, flight options to Juphal Airport, jeep connections, local attractions, and insider tips for exploring Phoksundo Lake, Dho Tarap, Crystal Mountain, and remote Himalayan villages. Plan your perfect journey with our comprehensive local knowledge.
            </p>
          </header>

          <div className="mx-auto">
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
              <div className="mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent mb-12" />
                
                <div className="text-center mb-12">
                  <div className="inline-block mb-4">
                    <span className="text-4xl">📚</span>
                  </div>
                  {generalGuides.length > 0 && (
                    <>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                          {generalGuides[0].title}
                        </span>
                      </h2>
                      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Important travel tips, local customs, and practical information for your journey to Nepal&apos;s remote Dolpa region
                      </p>
                    </>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8" />

                {generalGuides.map((g) => (
                  <div key={g.slug} className="mx-auto text-justify">
                    <div className="prose prose-lg max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed text-lg [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2 [&_li]:mb-2 [&_li]:text-gray-700 [&_li]:leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-2"
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
    </div>
  );
}
