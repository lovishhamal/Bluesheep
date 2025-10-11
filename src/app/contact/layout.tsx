import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Garden Hotel",
  description:
    "Get in touch with Garden Hotel in Dunai, Phoksundo Lake. Contact us for reservations, inquiries, or any assistance you need during your stay.",
  keywords:
    "contact, hotel contact, Dunai, Phoksundo Lake, Nepal, reservations, inquiries",
  openGraph: {
    title: "Contact Us - Garden Hotel",
    description:
      "Get in touch with Garden Hotel in Dunai, Phoksundo Lake. Contact us for reservations, inquiries, or any assistance you need during your stay.",
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
