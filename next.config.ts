import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: "export", // Static export for hosting
  images: {
    unoptimized: true, // Required for static export
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
    domains: ["www.hotelbluesheepinn.com"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Note: async headers() is not compatible with static export
  // Headers should be configured at server/hosting level instead
};

export default nextConfig;
