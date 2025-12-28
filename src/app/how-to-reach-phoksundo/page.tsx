import { Metadata } from "next";
import Script from "next/script";
import { unstable_noStore as noStore } from "next/cache";
import TravelGuidePage from "../travel-guide/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title:
    "How to Reach Shey Phoksundo Lake (Dolpa) from Kathmandu | Flight, Jeep & Trek",
  description:
    "Complete route guide to reach Shey Phoksundo Lake in Dolpa: Kathmandu to Juphal flight options, transfer to Dunai, and trekking stages to Phoksundo. Timing and practical tips for first-time visitors.",
  keywords:
    "how to reach phoksundo lake, shey phoksundo lake how to reach, kathmandu to phoksundo, flight to juphal phoksundo, juphal to phoksundo trek, dolpa phoksundo trekking route, shey phoksundo national park",
  alternates: {
    canonical: "/how-to-reach-phoksundo/",
  },
  openGraph: {
    title:
      "How to Reach Shey Phoksundo Lake (Dolpa) from Kathmandu | Flight, Jeep & Trek",
    description:
      "Complete route guide to reach Shey Phoksundo Lake in Dolpa with flight, transfer, and trekking stages. Timing and practical tips.",
    type: "website",
    url: "https://hotelbluesheepinn.com/how-to-reach-phoksundo/",
  },
};

export default async function HowToTravelPhoksundoPage() {
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
        name: "How to Reach Phoksundo Lake",
        item: "https://hotelbluesheepinn.com/how-to-reach-phoksundo/",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I get to Shey Phoksundo Lake from Kathmandu?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common route is to fly from Kathmandu to Juphal (often via Nepalgunj), travel to Dunai, then trek for multiple days to reach Phoksundo Lake inside Shey Phoksundo National Park.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need permits for Shey Phoksundo National Park?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you generally need national park and trekking permits for the area. Confirm current requirements before travel, especially if combining routes into Upper Dolpa.",
        },
      },
      {
        "@type": "Question",
        name: "How many days are needed for Phoksundo Lake?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on your route and pace. Many itineraries take several days including transfers to Dolpa and a multi-day trek from the Juphal/Dunai area to the lake.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="how-to-reach-phoksundo-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="how-to-reach-phoksundo-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TravelGuidePage />
    </>
  );
}
