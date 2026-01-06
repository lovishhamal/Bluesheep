import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  trailingSlash: true,
  // Only use static export when explicitly enabled via NEXT_EXPORT env variable
  ...(process.env.NEXT_EXPORT === "true" && { output: "export" }),
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
  async redirects() {
    return [
      {
        source: "/how-to-reach-dho/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-reach-dunai-dolpa/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-reach-phoksundo/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-travel-dho/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-travel-dunai-dolpa/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-travel-phoksundo/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
    ];
  },
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
  async redirects() {
    return [
      // Redirect deprecated how-to-reach pages to travel-guide
      {
        source: "/how-to-reach-dho/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-reach-dunai/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-reach-dunai-dolpa/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-reach-phoksundo/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      // Redirect deprecated how-to-travel pages to travel-guide
      {
        source: "/how-to-travel-dho/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-travel-dunai-dolpa/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
      {
        source: "/how-to-travel-phoksundo/:path*",
        destination: "/travel-guide/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
