export type TravelGuide = {
  title: string;
  description: string;
  price: number;
  order: number;
  slug: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const withSlug = (guide: Omit<TravelGuide, "slug">): TravelGuide => ({
  ...guide,
  slug: slugify(guide.title),
});

export const dummyTravelGuides: TravelGuide[] = [
  withSlug({
    title: "Ultimate Guide to Tokyo",
    description:
      "<h2>Discover the Magic of Tokyo</h2><p>Tokyo is a vibrant metropolis where ancient traditions meet cutting-edge technology. From serene temples to bustling streets of Shibuya, this guide will help you explore the best of Japan's capital.</p><h3>Must-Visit Places:</h3><ul><li><strong>Senso-ji Temple</strong> - Tokyo's oldest temple</li><li><strong>Shibuya Crossing</strong> - The world's busiest intersection</li><li><strong>Tsukiji Outer Market</strong> - Fresh sushi and street food</li></ul><p><em>Best time to visit: March-May (cherry blossom season)</em></p>",
    price: 29.99,
    order: 1,
  }),
  withSlug({
    title: "Paris: City of Lights",
    description:
      "<h2>Experience Romance in Paris</h2><p>Paris captivates visitors with its timeless beauty, world-class museums, and exquisite cuisine. This comprehensive guide covers everything from iconic landmarks to hidden gems.</p><h3>Highlights Include:</h3><ol><li>Eiffel Tower at sunset</li><li>Louvre Museum masterpieces</li><li>Charming Montmartre streets</li><li>Seine River cruises</li></ol><blockquote><p>\"Paris is always a good idea.\" - Audrey Hepburn</p></blockquote>",
    price: 34.99,
    order: 2,
  }),
  withSlug({
    title: "Bali Beach Paradise",
    description:
      "<h2>Your Tropical Escape Awaits</h2><p>Bali offers pristine beaches, lush rice terraces, and spiritual retreats. Perfect for both adventure seekers and those looking to relax.</p><h3>What's Inside:</h3><ul><li>Top 10 beaches for surfing</li><li>Traditional Balinese temples</li><li>Yoga and wellness retreats</li><li>Local food guide</li></ul><p style='color: #2196F3;'><strong>Special Bonus:</strong> Includes detailed maps and insider tips from locals!</p>",
    price: 24.99,
    order: 3,
  }),
  withSlug({
    title: "New York City Explorer",
    description:
      "<h2>The City That Never Sleeps</h2><p>From Broadway shows to world-famous pizza, NYC has it all. Navigate the Big Apple like a local with this insider's guide.</p><h3>Featured Sections:</h3><ul><li><strong>Manhattan Essentials</strong> - Times Square, Central Park, Empire State Building</li><li><strong>Brooklyn Gems</strong> - Williamsburg, DUMBO, Brooklyn Bridge</li><li><strong>Food Tours</strong> - Best pizza, bagels, and fine dining</li><li><strong>Broadway Guide</strong> - How to get tickets and best shows</li></ul><p><em>Updated for 2024 with latest restaurant openings!</em></p>",
    price: 39.99,
    order: 4,
  }),
  withSlug({
    title: "Iceland Adventure Guide",
    description:
      "<h2>Land of Fire and Ice</h2><p>Iceland's dramatic landscapes offer unforgettable experiences from the Northern Lights to geothermal hot springs.</p><h3>Adventure Awaits:</h3><ol><li>Golden Circle tour highlights</li><li>Blue Lagoon relaxation</li><li>Glacier hiking expeditions</li><li>Northern Lights viewing spots</li><li>Reykjavik nightlife</li></ol><p><strong>Note:</strong> Best visited during summer (June-August) for midnight sun or winter (September-March) for Northern Lights.</p>",
    price: 44.99,
    order: 5,
  }),
  withSlug({
    title: "Rome: The Eternal City",
    description:
      "<h2>Walk Through History</h2><p>Rome is an open-air museum where every corner tells a story. This guide helps you maximize your time in Italy's magnificent capital.</p><h3>Ancient Wonders:</h3><ul><li>Colosseum and Roman Forum</li><li>Vatican City and Sistine Chapel</li><li>Trevi Fountain</li><li>Pantheon</li></ul><h3>Food & Culture:</h3><p>Discover authentic Roman trattorias, gelaterias, and the best <em>carbonara</em> in town. Plus tips on avoiding tourist traps!</p>",
    price: 32.99,
    order: 6,
  }),
].sort((a, b) => a.order - b.order);

export const getTravelGuideBySlug = (slug: string) =>
  dummyTravelGuides.find((g) => g.slug === slug);

export const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

