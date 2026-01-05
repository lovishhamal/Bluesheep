"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  BeakerIcon,
  BuildingLibraryIcon,
  GlobeAsiaAustraliaIcon,
  MapIcon,
  MapPinIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getWhatsAppUrl } from "../util/constants";

type AttractionTag = {
  label: string;
  value: string;
};

type Attraction = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  images: string[];
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  tags: AttractionTag[];
};

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const toTitleCase = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/g)
    .map((w) => (w ? `${w[0]!.toUpperCase()}${w.slice(1)}` : w))
    .join(" ");

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter(
      (v): v is string => typeof v === "string" && v.length > 0
    );
  }
  if (typeof value !== "string" || !value.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (v): v is string => typeof v === "string" && v.length > 0
      );
    }
  } catch {}

  if (value.includes(",")) {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [value.trim()];
};

const normalizeTags = (raw: unknown): AttractionTag[] => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    const tags = raw
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") {
          const [labelRaw, ...rest] = item.split(":");
          const valueRaw = rest.join(":").trim();
          if (!labelRaw?.trim() || !valueRaw) return null;
          return { label: toTitleCase(labelRaw), value: valueRaw };
        }
        if (typeof item === "object") {
          const obj = item as Record<string, unknown>;
          const label =
            typeof obj.label === "string"
              ? obj.label
              : typeof obj.key === "string"
                ? obj.key
                : typeof obj.name === "string"
                  ? obj.name
                  : "";
          const value =
            typeof obj.value === "string"
              ? obj.value
              : typeof obj.val === "string"
                ? obj.val
                : typeof obj.text === "string"
                  ? obj.text
                  : "";
          if (!label || !value) return null;
          return { label: toTitleCase(label), value };
        }
        return null;
      })
      .filter((t): t is AttractionTag => Boolean(t));

    return tags;
  }

  if (typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    return Object.entries(obj)
      .map(([key, value]) => {
        if (value == null) return null;
        if (typeof value === "string" || typeof value === "number") {
          return { label: toTitleCase(key), value: String(value) };
        }
        return null;
      })
      .filter((t): t is AttractionTag => Boolean(t));
  }

  if (typeof raw === "string") {
    return raw
      .split(/[|,]+/g)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => ({ label: "Info", value: chunk }));
  }

  return [];
};

const pickPreferredTags = (tags: AttractionTag[]) => {
  const normalized = tags.map((t) => ({
    label: t.label,
    value: t.value,
    key: t.label.toLowerCase().replace(/\s+/g, ""),
  }));

  const priorities = [
    "elevation",
    "altitude",
    "watertype",
    "culture",
    "region",
    "distance",
  ];

  const picked: AttractionTag[] = [];
  const used = new Set<string>();

  for (const p of priorities) {
    const match = normalized.find((t) => t.key === p);
    if (match && !used.has(match.key)) {
      picked.push({ label: match.label, value: match.value });
      used.add(match.key);
    }
  }

  for (const t of normalized) {
    if (used.has(t.key)) continue;
    picked.push({ label: t.label, value: t.value });
    used.add(t.key);
  }

  return picked;
};

const findFirstStringValue = (
  r: Record<string, unknown>,
  keys: string[]
): string => {
  for (const key of keys) {
    const value = r[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const findFirstStringByKeyMatch = (
  r: Record<string, unknown>,
  predicate: (keyLower: string) => boolean
): string => {
  for (const [key, value] of Object.entries(r)) {
    if (!predicate(key.toLowerCase())) continue;
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const collectTagsFromColumns = (r: Record<string, unknown>): AttractionTag[] => {
  const tags: AttractionTag[] = [];

  const elevation =
    typeof r.elevation === "string"
      ? r.elevation
      : typeof r.altitude === "string"
        ? r.altitude
        : typeof r.elevation_m === "string"
          ? r.elevation_m
          : typeof r.elevationMeters === "string"
            ? r.elevationMeters
            : "";
  if (elevation) tags.push({ label: "Elevation", value: elevation });

  const waterType =
    typeof r.water_type === "string"
      ? r.water_type
      : typeof r.waterType === "string"
        ? r.waterType
        : "";
  if (waterType) tags.push({ label: "Water Type", value: waterType });

  const culture =
    typeof r.culture === "string"
      ? r.culture
      : typeof r.cultural === "string"
        ? r.cultural
        : "";
  if (culture) tags.push({ label: "Culture", value: culture });

  const region =
    typeof r.region === "string"
      ? r.region
      : typeof r.location === "string"
        ? r.location
        : "";
  if (region) tags.push({ label: "Region", value: region });

  return tags;
};

const normalizeAttraction = (row: unknown, index: number): Attraction | null => {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;

  const idRaw = r.id ?? r.attraction_id ?? r.uuid ?? r.slug ?? index;
  const id = String(idRaw);

  const title =
    findFirstStringValue(r, [
      "title",
      "name",
      "attraction_name",
      "attraction_title",
      "attractionTitle",
      "attractionTitleText",
      "heading",
      "attraction",
    ]) ||
    findFirstStringByKeyMatch(
      r,
      (key) =>
        (key.includes("title") || key.includes("name")) &&
        !key.includes("image") &&
        !key.includes("alt")
    );
  if (!title) return null;

  const subtitle =
    findFirstStringValue(r, [
      "subtitle",
      "sub_title",
      "tagline",
      "short_description",
      "shortDescription",
      "summary",
      "subheading",
    ]) ||
    findFirstStringByKeyMatch(
      r,
      (key) => key.includes("subtitle") || key.includes("tagline")
    );

  const iconRaw = r.icon ?? r.emoji;
  const icon = typeof iconRaw === "string" ? iconRaw.trim() : "";

  const images = parseStringArray(
    r.images ??
      r.image_urls ??
      r.imageUrls ??
      r.photos ??
      r.gallery ??
      r.image_list ??
      r.imageList ??
      r.image_array ??
      r.imageArray
  );
  const imageSrcFromFields =
    findFirstStringValue(r, [
      "image",
      "main_image",
      "mainImage",
      "main_image_url",
      "mainImageUrl",
      "main_image_src",
      "mainImageSrc",
      "cover_image",
      "coverImage",
      "thumbnail",
      "thumbnail_url",
    ]) || "";
  const imageSrc = images[0] || imageSrcFromFields;

  const allImages = Array.from(
    new Set([imageSrcFromFields, ...images].filter(Boolean))
  );

  const imageAlt =
    findFirstStringValue(r, ["image_alt", "imageAlt", "image_alt_text", "alt"]) ||
    `${title} - Dolpa Nepal attraction`;

  const descriptionRaw =
    r.description ??
    r.content ??
    r.body ??
    r.long_description ??
    r.longDescription ??
    r.details ??
    r.about ??
    r.content_html ??
    r.contentHtml;
  const descriptionHtml =
    typeof descriptionRaw === "string" ? String(descriptionRaw) : "";
  const descriptionText = descriptionHtml ? stripHtml(descriptionHtml) : "";

  const fieldParagraphs = Object.entries(r)
    .filter(([key, value]) => {
      if (typeof value !== "string") return false;
      const k = key.toLowerCase();
      return (
        (k.startsWith("paragraph") || k.startsWith("para_")) &&
        value.trim().length > 0
      );
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => stripHtml(String(value)).trim())
    .filter(Boolean);

  const paragraphs =
    typeof r.paragraphs === "object" && Array.isArray(r.paragraphs)
      ? r.paragraphs
          .filter(
            (p): p is string => typeof p === "string" && p.trim().length > 0
          )
          .map((p) => p.trim())
      : typeof r.paragraphs === "string"
        ? parseStringArray(r.paragraphs)
            .filter((p) => typeof p === "string" && p.trim().length > 0)
            .map((p) => p.trim())
        : fieldParagraphs.length
          ? fieldParagraphs
          : descriptionHtml
            ? [descriptionHtml.trim()]
            : descriptionText
                .split(/\n\s*\n+/g)
                .map((p) => p.trim())
                .filter(Boolean);

  const tags = [
    ...collectTagsFromColumns(r),
    ...normalizeTags(r.tags ?? r.meta ?? r.metadata ?? r.highlights ?? r.tag_list),
  ];
  const preferredTags = pickPreferredTags(tags);

  return {
    id,
    title,
    subtitle: subtitle || undefined,
    icon: icon || undefined,
    images: allImages,
    imageSrc: imageSrc || "/phoksundo.jpg",
    imageAlt,
    paragraphs:
      paragraphs.length >= 2
        ? paragraphs.slice(0, 2)
        : paragraphs.length === 1
          ? [paragraphs[0], ""]
          : ["", ""],
    tags: preferredTags,
  };
};

const normalizeAttractionRows = (rows: unknown[] | null | undefined) => {
  if (!rows || !Array.isArray(rows)) return [];
  return rows
    .map((row, index) => normalizeAttraction(row, index))
    .filter((a): a is Attraction => Boolean(a));
};

const fallbackAttractions: Attraction[] = [
  {
    id: "phoksundo-lake",
    title: "Phoksundo Lake",
    subtitle: "Crystal Clear Alpine Paradise",
    icon: "🏞️",
    images: ["/phoksundo.jpg"],
    imageSrc: "/phoksundo.jpg",
    imageAlt:
      "Phoksundo Lake Dolpa Nepal - Crystal Clear Alpine Lake at 3611m elevation",
    paragraphs: [
      "is one of Nepal's most stunning high-altitude lakes, located at an elevation of 3,611 meters (11,849 feet) in the Dolpa district. This pristine alpine lake is renowned for its crystal-clear turquoise waters that change color throughout the day, reflecting the surrounding snow-capped peaks.",
      "The lake is considered sacred by the local people and is part of the Shey Phoksundo National Park. It's a perfect destination for trekkers and nature enthusiasts seeking breathtaking mountain scenery and peaceful natural beauty.",
    ],
    tags: [
      { label: "Elevation", value: "3,611m" },
      { label: "Water Type", value: "Freshwater" },
    ],
  },
  {
    id: "dho-tarap",
    title: "Dho Tarap",
    subtitle: "Highest Village in Nepal",
    icon: "🏘️",
    images: ["/dho.jpg"],
    imageSrc: "/dho.jpg",
    imageAlt:
      "Dho Tarap - Highest Village in Nepal at 4200m elevation - Traditional Tibetan Buddhist culture",
    paragraphs: [
      "is recognized as the highest permanently inhabited village in Nepal, situated at an impressive elevation of approximately 4,200 meters (13,780 feet) above sea level. This remote and culturally rich village is located in the Upper Dolpa region and offers visitors a unique glimpse into traditional Tibetan Buddhist culture.",
      "The village is home to ancient monasteries, traditional stone houses, and a community that has preserved its unique way of life for centuries. Dho Tarap is a must-visit destination for those seeking authentic cultural experiences and stunning high-altitude landscapes.",
    ],
    tags: [
      { label: "Elevation", value: "4,200m" },
      { label: "Culture", value: "Tibetan" },
    ],
  },
];

function AttractionImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}) {
  const isLocal = src.startsWith("/");
  if (isLocal) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <img src={src} alt={alt} className={className} width={width} height={height} />
  );
}

type AttractionsClientProps = {
  initialAttractionsData?: unknown[] | null;
  initialAttractionsError?: string | null;
};

export default function AttractionsClient({
  initialAttractionsData,
  initialAttractionsError,
}: AttractionsClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImageByAttractionId, setSelectedImageByAttractionId] = useState<
    Record<string, string>
  >({});
  const [expandedByAttractionId, setExpandedByAttractionId] = useState<
    Record<string, boolean>
  >({});
  const [isOverflowingByAttractionId, setIsOverflowingByAttractionId] = useState<
    Record<string, boolean>
  >({});
  const descriptionContainerByAttractionIdRef = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const attractions = useMemo(() => {
    const normalized = normalizeAttractionRows(initialAttractionsData);
    return normalized.length ? normalized : fallbackAttractions;
  }, [initialAttractionsData]);

  const isLoadingAttractions = false;
  const attractionsError = initialAttractionsError || null;

  const tableOfContents = useMemo(() => {
    return attractions
      .map((a) => ({
        id: `attraction-${String(a.id).replace(/[^a-zA-Z0-9_-]/g, "-")}`,
        title: a.title,
      }))
      .filter((item) => item.title.trim().length > 0);
  }, [attractions]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const next: Record<string, boolean> = {};

      for (const attraction of attractions) {
        const el = descriptionContainerByAttractionIdRef.current[attraction.id];
        if (!el) continue;
        next[attraction.id] = el.scrollHeight > el.clientHeight + 1;
      }

      setIsOverflowingByAttractionId((prev) => {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(next);
        if (prevKeys.length !== nextKeys.length) return next;
        for (const k of nextKeys) {
          if (prev[k] !== next[k]) return next;
        }
        return prev;
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [attractions, expandedByAttractionId]);

  const ctaAttractionText = useMemo(() => {
    const names = attractions.map((a) => a.title).filter(Boolean);
    if (names.length >= 2) return `${names[0]} and ${names[1]}`;
    if (names.length === 1) return names[0]!;
    return "Phoksundo Lake and Dho Tarap";
  }, [attractions]);

  const getAttractionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("lake") || t.includes("river") || t.includes("waterfall"))
      return BeakerIcon;
    if (t.includes("village") || t.includes("monastery") || t.includes("culture"))
      return BuildingLibraryIcon;
    if (t.includes("mount") || t.includes("peak") || t.includes("trek") || t.includes("pass"))
      return ArrowTrendingUpIcon;
    return MapIcon;
  };

  const getTagIcon = (label: string) => {
    const labelLower = label.toLowerCase();
    if (labelLower.includes("water")) return BeakerIcon;
    if (labelLower.includes("culture")) return BuildingLibraryIcon;
    if (labelLower.includes("elev") || labelLower.includes("altitude"))
      return ArrowTrendingUpIcon;
    if (labelLower.includes("distance")) return MapPinIcon;
    if (labelLower.includes("region") || labelLower.includes("location"))
      return GlobeAsiaAustraliaIcon;
    return TagIcon;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 overflow-x-hidden">
      {/* Navigation - With Green Gradient */}
      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto rounded-lg shadow-md cursor-pointer"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white font-medium transition-colors duration-200 hover:text-emerald-100"
              >
                Home
              </Link>
              <Link
                href="/rooms/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium border-b-2 border-emerald-50"
              >
                Attractions
              </Link>
              <Link
                href="/travel-guide/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Travel Guide
              </Link>
              <Link
                href="/contact/"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-emerald-100 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-emerald-700/30"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms/"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu/"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping/"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions/"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/travel-guide/"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel Guide
                </Link>
                <Link
                  href="/contact/"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header Section - Creative Design */}
      <section className="relative pt-2 pb-4 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-3 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex  mt-6 items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-semibold mb-8 sm:mb-3 shadow-lg"
            >
              <span>🏔️</span>
              <span>Discover Dolpa&apos;s Wonders</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Discover Dolpa&apos;s Wonders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
              Explore the breathtaking beauty of Phoksundo Lake and the highest
              village in Nepal
            </p>
            <div className="mt-4 flex justify-center">
              <motion.button
                type="button"
                onClick={() => {
                  const message = `Hi! I'd like to plan my visit to Dolpa (including ${ctaAttractionText}). Can you help me with an itinerary and hotel stay?`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
              >
                Plan your visit →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {!isLoadingAttractions &&
        !attractionsError &&
        tableOfContents.length > 0 && (
          <section className="py-4 sm:py-5 bg-white border-y border-emerald-100/70">
            <div className="w-full px-4 sm:px-6 lg:px-12">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Explore Dolpa’s hidden gems
                  </div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">
                    Dolpa is still one of Nepal’s most unexplored regions—start here.
                  </div>
                </div>
                <div className="text-xs font-semibold text-gray-500">
                  Click to jump
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300 transition-colors duration-200 max-w-full"
                  >
                    <span className="min-w-0 break-words whitespace-normal">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

      {isLoadingAttractions && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-3">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              <p className="text-gray-600 mt-4 text-lg">
                Loading attractions...
              </p>
            </div>
          </div>
        </section>
      )}

      {!isLoadingAttractions && attractionsError && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-3">
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg">
                Failed to load attractions: {attractionsError}
              </p>
            </div>
          </div>
        </section>
      )}

      {!isLoadingAttractions && !attractionsError && attractions.length === 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-3">
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg">No attractions found.</p>
            </div>
          </div>
        </section>
      )}

      {!isLoadingAttractions &&
        !attractionsError &&
        attractions.map((attraction, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          const isEven = index % 2 === 0;

          const anchorId = `attraction-${String(attraction.id).replace(
            /[^a-zA-Z0-9_-]/g,
            "-"
          )}`;

          const hasBlueTheme =
            isSecond ||
            attraction.title.toLowerCase().includes("dho") ||
            attraction.title.toLowerCase().includes("tarap");

          const sectionClass = hasBlueTheme
            ? "py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50"
            : "py-12 lg:py-16 bg-white";

          const iconBg = hasBlueTheme
            ? "from-blue-500 to-purple-500"
            : "from-emerald-500 to-blue-500";

          const accentText = hasBlueTheme ? "text-blue-600" : "text-emerald-600";

          const tags = attraction.tags ?? [];

          const imageSideFirst = isFirst ? true : isEven;

          const mediaHeightClass =
            "h-[320px] sm:h-[380px] md:h-[520px] lg:h-[560px]";

          const imageMotionProps = isFirst
            ? { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } }
            : imageSideFirst
              ? {
                  initial: { opacity: 0, x: -50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true as const },
                }
              : {
                  initial: { opacity: 0, x: 50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true as const },
                };

          const contentMotionProps = isFirst
            ? { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } }
            : imageSideFirst
              ? {
                  initial: { opacity: 0, x: 50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true as const },
                }
              : {
                  initial: { opacity: 0, x: -50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true as const },
                };

          const transition = { duration: 0.8 };

          const availableImages =
            attraction.images && attraction.images.length
              ? attraction.images
              : [attraction.imageSrc].filter(Boolean);
          const selectedImage =
            selectedImageByAttractionId[attraction.id] ||
            availableImages[0] ||
            attraction.imageSrc;

          const AttractionIcon = getAttractionIcon(attraction.title);
          const isExpanded = Boolean(expandedByAttractionId[attraction.id]);

          const imageNode = (
            <motion.div
              {...imageMotionProps}
              transition={transition}
              className={
                isFirst
                  ? "order-1 md:order-1"
                  : imageSideFirst
                    ? "order-1 md:order-1"
                    : "order-1 md:order-2"
              }
            >
              <div
                className={`relative overflow-hidden rounded-xl shadow-2xl group ${mediaHeightClass}`}
              >
                <AttractionImage
                  src={selectedImage}
                  alt={attraction.imageAlt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {availableImages.length > 1 && (
                <div className="mt-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-lg shadow-black/10 px-3 py-3">
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {availableImages.slice(0, 8).map((src) => {
                      const isSelected = src === selectedImage;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() =>
                            setSelectedImageByAttractionId((prev) => ({
                              ...prev,
                              [attraction.id]: src,
                            }))
                          }
                          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                            isSelected
                              ? hasBlueTheme
                                ? "border-blue-500"
                                : "border-emerald-500"
                              : "border-white/70 hover:border-white"
                          }`}
                        >
                          <AttractionImage
                            src={src}
                            alt={attraction.imageAlt}
                            width={96}
                            height={72}
                            className="w-full aspect-[4/3] object-cover"
                          />
                          {!isSelected && (
                            <div className="absolute inset-0 bg-black/10" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );

          const contentNode = (
            <motion.div
              {...contentMotionProps}
              transition={transition}
              className={
                isFirst
                  ? isExpanded
                    ? "order-2 md:order-2 md:flex md:flex-col"
                    : "order-2 md:order-2 md:flex md:flex-col md:min-h-0 md:h-[520px] lg:h-[560px]"
                  : imageSideFirst
                    ? isExpanded
                      ? "order-2 md:order-2 md:flex md:flex-col"
                      : "order-2 md:order-2 md:flex md:flex-col md:min-h-0 md:h-[520px] lg:h-[560px]"
                    : isExpanded
                      ? "order-2 md:order-1 md:flex md:flex-col"
                      : "order-2 md:order-1 md:flex md:flex-col md:min-h-0 md:h-[520px] lg:h-[560px]"
              }
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 bg-gradient-to-br ${iconBg} rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white`}
                >
                  <AttractionIcon className="h-10 w-10" aria-hidden="true" />
                </motion.div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                    {attraction.title}
                  </h2>
                  {attraction.subtitle && (
                    <p className={`${accentText} font-semibold text-lg`}>
                      {attraction.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:flex-1 md:min-h-0 md:flex md:flex-col">
                <div
                  ref={(el) => {
                    descriptionContainerByAttractionIdRef.current[attraction.id] = el;
                  }}
                  className={`space-y-4 text-gray-700 text-lg leading-relaxed ${
                    isExpanded ? "max-h-none overflow-visible" : "max-h-[320px] overflow-hidden"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: attraction.paragraphs[0] || "",
                    }}
                  />
                  {Boolean(attraction.paragraphs[1]) && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: attraction.paragraphs[1] || "",
                      }}
                    />
                  )}
                </div>

                {(isOverflowingByAttractionId[attraction.id] || isExpanded) && (
                  <div className="flex justify-end pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedByAttractionId((prev) => ({
                          ...prev,
                          [attraction.id]: !prev[attraction.id],
                        }))
                      }
                      className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  </div>
                )}

                {tags.length > 0 && (
                  <div
                    className={`grid gap-4 pt-4 ${
                      tags.length === 1
                        ? "grid-cols-1"
                        : tags.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-2 sm:grid-cols-3"
                    }`}
                  >
                    {tags.map((tag, i) => {
                      const TagIconComponent = getTagIcon(tag.label);

                      const isFirstTag = i % 2 === 0;
                      const cardClass = hasBlueTheme
                        ? isFirstTag
                          ? "bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg"
                          : "bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-4 border-2 border-purple-200 shadow-lg"
                        : isFirstTag
                          ? "bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 border-2 border-emerald-200 shadow-lg"
                          : "bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-4 border-2 border-blue-200 shadow-lg";

                      const valueClass = hasBlueTheme
                        ? isFirstTag
                          ? "text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                          : "text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                        : isFirstTag
                          ? "text-xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                          : "text-xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent";

                      return (
                        <motion.div
                          key={`${tag.label}-${tag.value}`}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className={cardClass}
                        >
                          <TagIconComponent
                            className="h-6 w-6 mb-2 text-gray-700"
                            aria-hidden="true"
                          />
                          <div className="text-xs font-semibold text-gray-600 mb-1">
                            {tag.label}
                          </div>
                          <div className={valueClass}>{tag.value}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          );

          return (
            <section
              key={attraction.id}
              id={anchorId}
              className={`${sectionClass} scroll-mt-24`}
            >
              <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="grid md:grid-cols-2 gap-12 items-start md:items-stretch">
                  {imageSideFirst ? (
                    <>
                      {imageNode}
                      {contentNode}
                    </>
                  ) : (
                    <>
                      {contentNode}
                      {imageNode}
                    </>
                  )}
                </div>
              </div>
            </section>
          );
        })}

      {/* Why Visit Section - Creative Design */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: "🏔️",
                title: "Breathtaking Scenery",
                description:
                  "Witness some of the most stunning mountain landscapes and pristine natural beauty in Nepal",
                gradient: "from-emerald-50 to-blue-50",
                iconBg: "from-emerald-500 to-blue-500",
              },
              {
                icon: "🙏",
                title: "Cultural Heritage",
                description:
                  "Explore ancient monasteries and experience traditional Tibetan Buddhist culture",
                gradient: "from-blue-50 to-purple-50",
                iconBg: "from-blue-500 to-purple-500",
              },
              {
                icon: "🚶",
                title: "Trekking Paradise",
                description:
                  "Perfect base for trekking adventures in the remote and beautiful Dolpa region",
                gradient: "from-purple-50 to-emerald-50",
                iconBg: "from-purple-500 to-emerald-500",
              },
              {
                icon: "📸",
                title: "Photography",
                description:
                  "Capture incredible photos of crystal-clear lakes, snow-capped peaks, and traditional villages",
                gradient: "from-emerald-50 to-orange-50",
                iconBg: "from-emerald-500 to-orange-500",
              },
              {
                icon: "🌌",
                title: "Stargazing",
                description:
                  "Enjoy clear night skies perfect for stargazing at high altitudes",
                gradient: "from-blue-50 to-indigo-50",
                iconBg: "from-blue-500 to-indigo-500",
              },
              {
                icon: "🏨",
                title: "Comfortable Base",
                description:
                  "Hotel Blue Sheep Inn provides the perfect comfortable base for your Dolpa adventures",
                gradient: "from-emerald-50 to-teal-50",
                iconBg: "from-emerald-500 to-teal-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl p-5 shadow-md border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/20"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                ></div>

                {/* Icon Container with Gradient */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-14 h-14 bg-gradient-to-br ${feature.iconBg} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-white group-hover:shadow-xl`}
                >
                  {/* Animated Shine Effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
                  />
                  <span className="text-3xl relative z-10">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Creative Design */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-3 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Explore Dolpa?
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-emerald-100 mb-10 font-light">
              Book your stay at Hotel Blue Sheep Inn and start your adventure to
              {ctaAttractionText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room and plan my visit to ${ctaAttractionText}.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-600 font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl text-lg sm:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine Effect */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <span className="relative z-10">📱 Book Your Stay</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => {
                  window.location.href = "/rooms";
                }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/20 text-lg sm:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">🏨 View Rooms</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-2xl"
                >
                  🏨
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
