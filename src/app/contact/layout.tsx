import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Hotel Blue Sheep Inn",
  description:
    "Get in touch with Hotel Blue Sheep Inn in Dunai, Dolpa. Contact us for reservations, inquiries, or any assistance you need during your stay.",
  keywords:
    "contact, hotel contact, Dunai, Dolpa, Nepal, reservations, inquiries, Hotel Blue Sheep Inn",
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: "Contact Us | Hotel Blue Sheep Inn",
    description:
      "Get in touch with Hotel Blue Sheep Inn in Dunai, Dolpa. Contact us for reservations, inquiries, or any assistance you need during your stay.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
