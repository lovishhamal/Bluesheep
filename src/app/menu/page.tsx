"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckIcon,
  CurrencyDollarIcon,
  TagIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  BeakerIcon,
  CakeIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../util/supabase";
import { useState, useEffect } from "react";

// Menu interface matching your database schema
interface MenuItem {
  id: string;
  item_name: string;
  description: string;
  price: number;
  category: string;
  images: string; // Changed from string[] to string
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch menu items from database
  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    const fetchMenuItems = async () => {
      try {
        console.log("Fetching menu items from database...");
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log(
          "Supabase Anon Key:",
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Check if we're in development mode and use mock data
        if (process.env.NODE_ENV === "development") {
          console.log("Development mode: Using mock data");
          const mockMenuItems: MenuItem[] = [
            {
              id: "1",
              item_name: "Dal Bhat",
              description:
                "Traditional Nepali rice with lentil soup and seasonal vegetables",
              price: 250,
              category: "main",
              images: "/dining-area.jpg",
              is_available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "2",
              item_name: "Momo",
              description:
                "Steamed dumplings filled with vegetables or meat, served with spicy sauce",
              price: 180,
              category: "appetizer",
              images: "/dining-area.jpg",
              is_available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "3",
              item_name: "Thukpa",
              description:
                "Traditional Tibetan noodle soup with vegetables and meat",
              price: 200,
              category: "soup",
              images: "/dining-area.jpg",
              is_available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ];
          setMenuItems(mockMenuItems);
          setError(null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("menu")
          .select("*")
          .order("category", { ascending: true })
          .order("item_name", { ascending: true });

        console.log("Supabase response:", { data, error });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setMenuItems(data || []);
          setError(null);
          console.log(
            "Menu items loaded successfully:",
            data?.length || 0,
            "items"
          );
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        if (isMounted) {
          setError(
            `Failed to load menu: ${
              err instanceof Error ? err.message : "Unknown error"
            }`
          );
          setMenuItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMenuItems();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // Format price for display
  const formatPrice = (price: number) => {
    return (
      "Rs. " +
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    );
  };

  // Capitalize category names
  const capitalizeCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  // Capitalize item names
  const capitalizeItemName = (itemName: string) => {
    return itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
  };

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(
      new Set(menuItems.map((item) => item.category).filter(Boolean))
    ),
  ];

  // Filter items by category
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Get first image or fallback
  const getItemImage = (images: string[]) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return "/dining-area.jpg"; // Fallback image
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (
      categoryLower.includes("breakfast") ||
      categoryLower.includes("morning")
    ) {
      return SunIcon;
    } else if (
      categoryLower.includes("lunch") ||
      categoryLower.includes("main")
    ) {
      return FireIcon;
    } else if (
      categoryLower.includes("dinner") ||
      categoryLower.includes("evening")
    ) {
      return MoonIcon;
    } else if (
      categoryLower.includes("drink") ||
      categoryLower.includes("beverage")
    ) {
      return BeakerIcon;
    } else if (categoryLower.includes("snack")) {
      return CakeIcon;
    } else if (
      categoryLower.includes("dessert") ||
      categoryLower.includes("sweet")
    ) {
      return CakeIcon;
    } else {
      return SparklesIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-4">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-gray-400/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-12 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
                />
              </Link>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-yellow-400 font-semibold border-b-2 border-yellow-400 transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-400/30"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-yellow-400 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Restaurant Menu Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-sm overflow-hidden mt-20"
      >
        {/* Menu Header */}
        <div className="relative bg-gradient-to-br from-gray-900 to-red-900 text-white text-center py-16 px-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                animation: "drift 60s linear infinite",
              }}
            />
          </div>

          <h1
            className="text-5xl md:text-6xl font-light mb-4 tracking-widest relative z-10"
            style={{
              fontFamily: "serif",
              background: "linear-gradient(45deg, #ffd700, #ffed4e, #ffd700)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}
          >
            GARDEN RESTAURANT
          </h1>
          <p
            className="text-xl font-light tracking-widest relative z-10"
            style={{ color: "#d4af37", fontStyle: "italic" }}
          >
            AUTHENTIC LOCAL CUISINE
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-gray-50 py-6 px-8 border-b border-gray-200">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-gray-900 shadow-lg"
                    : "bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200"
                }`}
              >
                {category === "All" ? "All" : capitalizeCategory(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content */}
        <div className="bg-gray-50 py-12 px-8 md:px-16">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading menu...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-400 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto border border-gray-200">
                <p className="text-gray-600 text-lg mb-4">
                  No items available in this category.
                </p>
                <p className="text-gray-500">
                  Please check back later or try a different category.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {selectedCategory === "All" ? (
                // Show all categories as sections
                categories.slice(1).map((category) => {
                  const categoryItems = menuItems.filter(
                    (item) => item.category === category
                  );
                  if (categoryItems.length === 0) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="menu-section"
                    >
                      <h2
                        className="text-3xl font-bold text-yellow-500 border-b-2 border-yellow-500 pb-3 mb-8 text-center tracking-wide"
                        style={{ fontFamily: "serif" }}
                      >
                        {capitalizeCategory(category)}
                      </h2>

                      <div className="space-y-6">
                        {categoryItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex justify-between items-start py-4 border-b border-dashed border-gray-300 hover:transform hover:translate-x-2 transition-all duration-200"
                          >
                            <div className="flex-1 pr-6">
                              <div className="flex items-center gap-3 mb-2">
                                <h3
                                  className="text-xl font-semibold text-gray-800"
                                  style={{ fontFamily: "serif" }}
                                >
                                  {capitalizeItemName(item.item_name)}
                                </h3>
                                {!item.is_available && (
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                                    Not Available
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 leading-relaxed">
                                {item.description ||
                                  "Delicious and freshly prepared"}
                              </p>
                            </div>
                            <div
                              className="text-xl font-bold text-yellow-500 whitespace-nowrap"
                              style={{ fontFamily: "serif" }}
                            >
                              {formatPrice(item.price)}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Show single category
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="menu-section"
                >
                  <h2
                    className="text-3xl font-bold text-yellow-500 border-b-2 border-yellow-500 pb-3 mb-8 text-center tracking-wide"
                    style={{ fontFamily: "serif" }}
                  >
                    {capitalizeCategory(selectedCategory)}
                  </h2>

                  <div className="space-y-6">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-start py-4 border-b border-dashed border-gray-300 hover:transform hover:translate-x-2 transition-all duration-200"
                      >
                        <div className="flex-1 pr-6">
                          <div className="flex items-center gap-3 mb-2">
                            <h3
                              className="text-xl font-semibold text-gray-800"
                              style={{ fontFamily: "serif" }}
                            >
                              {capitalizeItemName(item.item_name)}
                            </h3>
                            {!item.is_available && (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                                Not Available
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {item.description ||
                              "Delicious and freshly prepared"}
                          </p>
                        </div>
                        <div
                          className="text-xl font-bold text-yellow-500 whitespace-nowrap"
                          style={{ fontFamily: "serif" }}
                        >
                          {formatPrice(item.price)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, 30px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
