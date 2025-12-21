import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Only use static export when explicitly enabled via NEXT_EXPORT env variable
  ...(process.env.NEXT_EXPORT === "true" && { output: "export" }),
  images: {
    unoptimized: process.env.NEXT_EXPORT === "true",
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hotelbluesheepinn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.hotelbluesheepinn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/render/image/public/**",
      },
    ],
    domains: ["hotelbluesheepinn.com", "www.hotelbluesheepinn.com"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Note: async headers() is not compatible with static export
  // Headers should be configured at server/hosting level instead
  ...(process.env.NODE_ENV !== "production" && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "origin-when-cross-origin",
            },
          ],
        },
      ];
    },
  }),
};

export default nextConfig;
