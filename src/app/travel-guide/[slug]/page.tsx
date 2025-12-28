import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import {
  getTravelGuideBySlug,
  stripHtml,
} from "../dummyTravelGuides";
import TravelGuideContent from "../../components/TravelGuideContent";
import Navigation from "../../components/Navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  noStore();
  const { slug } = await params;
  const guide = await getTravelGuideBySlug(slug);
  if (!guide) return {};

  const plain = stripHtml(guide.description);
  const description = plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
  const url = `https://hotelbluesheepinn.com/travel-guide/${guide.slug}/`;
  const title = `${guide.title} | Dolpa Travel Guide | Hotel Blue Sheep Inn`;

  return {
    title,
    description,
    alternates: {
      canonical: `/travel-guide/${guide.slug}/`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: "https://hotelbluesheepinn.com/phoksundo.jpg",
          width: 1200,
          height: 630,
          alt: `${guide.title} - Dolpa Travel Guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://hotelbluesheepinn.com/phoksundo.jpg"],
    },
  };
}

export default async function TravelGuideDetailPage({ params }: PageProps) {
  noStore();
  const { slug } = await params;
  const guide = await getTravelGuideBySlug(slug);
  if (!guide || guide.type !== "list") notFound();

  const plain = stripHtml(guide.description);
  const url = `https://hotelbluesheepinn.com/travel-guide/${guide.slug}/`;

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
        name: "Travel Guide",
        item: "https://hotelbluesheepinn.com/travel-guide/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: url,
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: guide.title,
    description: plain,
    offers: {
      "@type": "Offer",
      priceCurrency: "NPR",
      price: guide.price,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      <Navigation currentPage="travel-guide" />
      
      <Script
        id="travel-guide-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="travel-guide-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="mb-8">
          <Link
            href="/travel-guide"
            className="inline-flex items-center gap-3 text-emerald-700 font-semibold hover:text-emerald-600 transition-colors bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-200"
          >
            <span className="text-lg">←</span> 
            <span>Back to Travel Guides</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 rounded-xl p-4 md:p-6 text-white mb-6 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🗺️</span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium border border-white/30">
                    Travel Guide
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                  {guide.title}
                </h1>
                <p className="text-emerald-100 text-sm max-w-xl">
                  Complete guide with detailed itineraries and insider tips.
                </p>
              </div>
              {guide.price > 0 && (
                <div className="flex-shrink-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30 text-center">
                    <div className="text-emerald-100 text-xs font-medium mb-1">Price</div>
                    <div className="text-xl font-bold">NPR {guide.price.toFixed(0)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <TravelGuideContent content={guide.description} title={guide.title} />
      </main>
    </div>
  );
}
