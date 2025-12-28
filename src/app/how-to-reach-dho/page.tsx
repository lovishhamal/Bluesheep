import { Metadata } from "next";
import Script from "next/script";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Dho Tarap (Upper Dolpa) from Kathmandu | Route, Trek & Permits",
  description:
    "Practical guide to reach Dho Tarap in Upper Dolpa from Kathmandu via Juphal/Dunai, including travel stages, timing guidance, and what to plan for remote Dolpa travel.",
  keywords:
    "how to reach dho tarap, how to reach dho dolpa, dho tarap upper dolpa, kathmandu to dho tarap, juphal to dunai, dunai to dho tarap, upper dolpa permits, dolpo trek route",
  alternates: {
    canonical: "/how-to-reach-dho/",
  },
  openGraph: {
    title:
      "How to Reach Dho Tarap (Upper Dolpa) from Kathmandu | Route, Trek & Permits",
    description:
      "Practical guide to reach Dho Tarap in Upper Dolpa from Kathmandu via Juphal/Dunai, with travel stages, timing, and planning tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-dho/",
  },
};

export default async function HowToTravelDhoPage() {
  noStore();
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
        name: "How to Reach Dho Tarap",
        item: "https://hotelbluesheepinn.com/how-to-reach-dho/",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I reach Dho Tarap (Upper Dolpa)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most travelers reach Dolpa via Juphal (flight) or by overland routes to Dunai, then continue to Upper Dolpa and Dho Tarap by trekking routes. Plan extra time for weather and remote logistics.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need permits for Upper Dolpa and Dho Tarap?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upper Dolpa typically requires restricted area permits in addition to trekking documentation. Confirm current rules with a registered trekking agency before traveling.",
        },
      },
      {
        "@type": "Question",
        name: "Where do most Dho Tarap trips start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Juphal and Dunai are common starting points for logistics in Dolpa before heading toward Upper Dolpa trekking routes.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="how-to-reach-dho-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="how-to-reach-dho-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TravelGuidePage />
    </>
  );
}
