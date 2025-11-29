import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hotel Blue Sheep Inn | Best Hotel in Dunai & Phoksundo Dolpa",
    short_name: "Bluesheep",
    description:
      "Best hotel in Dunai and Phoksundo Dolpa with garden restaurant & camping. Luxury accommodation with mountain views, WiFi, and exceptional service.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    orientation: "portrait",
    scope: "/",
    categories: ["hotel", "travel", "hospitality", "accommodation", "tourism"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
