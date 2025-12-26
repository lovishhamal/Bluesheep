import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import {
  dummyTravelGuides,
  getTravelGuideBySlug,
  stripHtml,
} from "../dummyTravelGuides";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return dummyTravelGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTravelGuideBySlug(slug);
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
  const guide = getTravelGuideBySlug(slug);
  if (!guide) notFound();

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="mb-8">
          <Link
            href="/travel-guide"
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-600 transition-colors"
          >
            <span>←</span> Back to Travel Guides
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {guide.title}
              </h1>
              <div className="shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2 text-emerald-700 font-bold text-lg">
                ${guide.price.toFixed(2)}
              </div>
            </div>

            <article
              className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&_li]:mb-2 [&_strong]:text-gray-900 [&_em]:text-gray-700 [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-300 [&>blockquote]:bg-emerald-50/60 [&>blockquote]:rounded-xl [&>blockquote]:px-5 [&>blockquote]:py-4 [&>blockquote]:my-6"
              dangerouslySetInnerHTML={{ __html: guide.description }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
