import { MetadataRoute } from "next";
import { getTravelGuides } from "./travel-guide/dummyTravelGuides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hotelbluesheepinn.com";
  const guides = await getTravelGuides();
  const listGuides = guides.filter((g) => g.type === "list");

  const travelGuideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/travel-guide/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...listGuides.map((guide) => ({
      url: `${baseUrl}/travel-guide/${guide.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  // High-priority itinerary pages for SEO
  const itineraryRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/itineraries/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/itineraries/phoksundo/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/itineraries/upper-dolpa/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/itineraries/lower-dolpa/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
  ];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/rooms/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/camping/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/attractions/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/places-in-dolpa/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...itineraryRoutes,
    ...travelGuideRoutes,
  ];
}
