import { createPublicClient } from "../util/supabase-server";

export type TravelGuideType = "general" | "list";

export type TravelGuide = {
  type: TravelGuideType;
  title: string;
  description: string;
  price: number;
  order: number;
  slug: string;
  category?: string | null;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['\"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const parseType = (value: unknown): TravelGuideType => {
  const raw =
    typeof value === "string" ? value.trim().toLowerCase() : "";
  return raw === "general" ? "general" : "list";
};

const normalizeTravelGuide = (row: unknown, index: number): TravelGuide | null => {
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;

  const type = parseType(record.type ?? record.guide_type ?? record.kind);

  const title =
    typeof record.title === "string"
      ? record.title
      : typeof record.name === "string"
        ? record.name
        : null;

  if (!title) return null;

  const description =
    typeof record.description === "string"
      ? record.description
      : typeof record.content === "string"
        ? record.content
        : "";

  const order =
    parseNumber(record.order) ??
    parseNumber(record.sort_order) ??
    parseNumber(record.position) ??
    index + 1;

  const price =
    type === "list"
      ? (parseNumber(record.price) ?? parseNumber(record.cost) ?? 0)
      : 0;

  const slug =
    typeof record.slug === "string" && record.slug.trim().length > 0
      ? record.slug.trim()
      : slugify(title);

  const category =
    typeof record.category === "string" && record.category.trim().length > 0
      ? record.category.trim()
      : null;

  return {
    type,
    title,
    description,
    price,
    order,
    slug,
    category,
  };
};

export async function getTravelGuides(): Promise<TravelGuide[]> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return [];
    }

    const supabase = createPublicClient();

    // Fetch from RPC get_travel_guides which contains the real active database guides
    let data: unknown[] | null = null;

    const rpcResult = await supabase.rpc("get_travel_guides");
    if (!rpcResult.error && Array.isArray(rpcResult.data) && rpcResult.data.length > 0) {
      data = rpcResult.data;
    } else {
      const tableResult = await supabase.from("travel_guide").select("*");
      if (!tableResult.error && Array.isArray(tableResult.data) && tableResult.data.length > 0) {
        data = tableResult.data;
      }
    }

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const normalized = data
      .map((row, index) => normalizeTravelGuide(row, index))
      .filter((g): g is TravelGuide => Boolean(g))
      .sort((a, b) => a.order - b.order);

    return normalized;
  } catch {
    return [];
  }
}

export const getTravelGuideBySlug = async (slug: string) => {
  const guides = await getTravelGuides();
  return guides.find(
    (g) => g.type === "list" && (g.slug === slug || slug.includes(g.slug) || g.slug.includes(slug))
  );
};

export const getTravelGuideByCategory = async (category: string) => {
  const guides = await getTravelGuides();
  const normalizedCategory = category.toLowerCase().trim();
  return guides.find(
    (g) => g.type === "list" && g.category && g.category.toLowerCase().includes(normalizedCategory)
  );
};

export const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
