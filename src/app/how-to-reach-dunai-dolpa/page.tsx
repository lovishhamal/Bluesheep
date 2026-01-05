import { Metadata } from "next";
import Script from "next/script";
import { unstable_noStore as noStore } from "next/cache";
import HowToReachDunai from "./HowToReachDunai";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Dunai (Dolpa) from Kathmandu | Bus, Flight to Juphal & Jeep",
  description:
    "Step-by-step routes to reach Dunai, Dolpa from Kathmandu: direct bus, bus + jeep via Radi/Tallubagar, or flight to Juphal with transfer to Dunai. Practical timing tips for Dolpa travel.",
  keywords:
    "how to reach dunai, how to reach dolpa, kathmandu to dunai bus, kathmandu to dolpa bus, flight to juphal, juphal to dunai jeep, dolpa travel route, dunai dolpa travel",
  alternates: {
    canonical: "/how-to-reach-dunai-dolpa/",
  },
  openGraph: {
    title:
      "How to Reach Dunai (Dolpa) from Kathmandu | Bus, Flight to Juphal & Jeep",
    description:
      "Step-by-step routes to reach Dunai, Dolpa from Kathmandu: direct bus, bus + jeep, or flight to Juphal. Practical timings and travel tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-dunai-dolpa/",
  },
};

export default async function HowToTravelDunaiDolpaPage() {
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
        name: "How to Reach Dunai, Dolpa",
        item: "https://hotelbluesheepinn.com/how-to-reach-dunai-dolpa/",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I reach Dunai (Dolpa) from Kathmandu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Dunai from Kathmandu by direct bus (long overland journey), by bus to Radi (Rukum) then jeep via Tallubagar to Dunai, or by flight to Juphal Airport followed by a short transfer to Dunai.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fastest way to reach Dolpa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Flying to Juphal Airport is typically the fastest option, then continuing to Dunai by jeep or on foot depending on conditions and availability.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to reach Dunai by road?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Road travel times vary by route and conditions. Overland routes can take around 30–36 hours and are often split across days.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="how-to-reach-dunai-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="how-to-reach-dunai-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HowToReachDunai />
    </>
  );
}
