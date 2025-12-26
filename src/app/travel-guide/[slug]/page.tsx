import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  getTravelGuides,
  getTravelGuideBySlug,
  stripHtml,
} from "../dummyTravelGuides";
import TravelGuideContent from "../../components/TravelGuideContent";
import MobileNavigation from "../../components/MobileNavigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const guides = await getTravelGuides();
  return guides.filter((g) => g.type === "list").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getTravelGuideBySlug(slug);
  if (!guide) return {};

  const plain = stripHtml(guide.description);
  const description = plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
  const url = `https://hotelbluesheepinn.com/travel-guide/${guide.slug}`;

  return {
    title: `${guide.title} | Travel Guide`,
    description,
    alternates: {
      canonical: `/travel-guide/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} | Travel Guide`,
      description,
      type: "article",
      url,
    },
  };
}

export default async function TravelGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getTravelGuideBySlug(slug);
  if (!guide || guide.type !== "list") notFound();

  const plain = stripHtml(guide.description);
  const url = `https://hotelbluesheepinn.com/travel-guide/${guide.slug}`;

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
        item: "https://hotelbluesheepinn.com/travel-guide",
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
      priceCurrency: "USD",
      price: guide.price,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
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

      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🗺️</span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                    Complete Travel Guide
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {guide.title}
                </h1>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl">
                  Your comprehensive guide with detailed itineraries, insider tips, and everything you need for an amazing journey.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center">
                  <div className="text-emerald-100 text-sm font-medium mb-2">Complete Guide</div>
                  <div className="text-4xl font-bold mb-2">NPR {guide.price.toFixed(0)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <TravelGuideContent content={guide.description} title={guide.title} />
      </main>

      <MobileNavigation />
    </div>
  );
}
