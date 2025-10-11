import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garden Camping - Garden Hotel",
  description:
    "Experience nature in our beautiful garden with tent camping options. Perfect for adventure seekers and nature lovers visiting Phoksundo Lake.",
  keywords:
    "camping, tent camping, garden camping, Phoksundo Lake, Dunai, Nepal, outdoor accommodation",
  openGraph: {
    title: "Garden Camping - Garden Hotel",
    description:
      "Experience nature in our beautiful garden with tent camping options. Perfect for adventure seekers and nature lovers visiting Phoksundo Lake.",
    type: "website",
  },
};

export default function CampingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
