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
  images: string[];
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
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        console.log("Fetching menu items from database...");

        // Check if Supabase is configured
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ) {
          throw new Error("Supabase environment variables not configured");
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

        setMenuItems(data || []);
        console.log(
          "Menu items loaded successfully:",
          data?.length || 0,
          "items"
        );
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError(
          `Failed to load menu: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-yellow-600/30 shadow-sm">
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
                  className="h-16 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
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
                href="/activities"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                Activities
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
              className="md:hidden border-t border-yellow-600/30"
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
                  href="/activities"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Activities
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

      {/* Header */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest mb-4 font-montserrat bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              MENU
            </h1>
            <p className="text-lg sm:text-xl text-yellow-300 italic tracking-widest font-montserrat">
              Culinary Excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/30 transform scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-yellow-600/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 inline-block border border-yellow-600/30">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading menu...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 inline-block border border-yellow-600/30">
                <p className="text-red-400 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 inline-block border border-yellow-600/30">
                <p className="text-white text-lg mb-4">
                  No items available in this category.
                </p>
                <p className="text-gray-300">
                  Please check back later or try a different category.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {selectedCategory === "All"
                ? // Show all categories as cards
                  categories.slice(1).map((category) => {
                    const categoryItems = menuItems.filter(
                      (item) => item.category === category
                    );
                    if (categoryItems.length === 0) return null;
                    const CategoryIcon = getCategoryIcon(category);

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border border-yellow-600/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 group relative overflow-hidden min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] w-full"
                      >
                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                        {/* Category Icon */}
                        <div className="text-center mb-4 sm:mb-6 relative z-10">
                          <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 animate-bounce">
                            {category.toLowerCase().includes("breakfast") &&
                              "🌅"}
                            {category.toLowerCase().includes("snack") && "🍿"}
                            {category.toLowerCase().includes("lunch") && "🍽️"}
                            {category.toLowerCase().includes("dinner") && "🌙"}
                            {category.toLowerCase().includes("beverage") &&
                              "🍷"}
                            {category.toLowerCase().includes("drink") && "🥤"}
                            {category.toLowerCase().includes("dessert") && "🍰"}
                            {!category.toLowerCase().includes("breakfast") &&
                              !category.toLowerCase().includes("snack") &&
                              !category.toLowerCase().includes("lunch") &&
                              !category.toLowerCase().includes("dinner") &&
                              !category.toLowerCase().includes("beverage") &&
                              !category.toLowerCase().includes("drink") &&
                              !category.toLowerCase().includes("dessert") &&
                              "✨"}
                          </div>
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 tracking-wider font-montserrat break-words">
                            {category}
                          </h2>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-3 sm:space-y-4 relative z-10">
                          {categoryItems.slice(0, 4).map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="border-b border-white/10 pb-3 last:border-b-0"
                            >
                              <div className="mb-4">
                                <div className="flex flex-col gap-3 mb-3">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <h3 className="text-xl sm:text-2xl font-semibold text-white font-montserrat break-words flex-1">
                                        {item.item_name}
                                      </h3>
                                      <span className="text-2xl sm:text-3xl font-bold text-yellow-400 whitespace-nowrap">
                                        {formatPrice(item.price)}
                                      </span>
                                    </div>
                                    {!item.is_available && (
                                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 self-start w-fit">
                                        Not Available
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed italic break-words">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Item Image */}
                              {item.images && item.images.length > 0 && (
                                <div className="mt-3">
                                  <img
                                    src={item.images[0]}
                                    alt={item.item_name}
                                    className="w-full h-32 object-cover rounded-lg border border-yellow-600/30"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                </div>
                              )}
                            </motion.div>
                          ))}

                          {categoryItems.length > 4 && (
                            <p className="text-yellow-300 text-sm sm:text-base italic text-center mt-4 break-words">
                              +{categoryItems.length - 4} more items
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                : // Show single category as cards
                  filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 lg:p-12 border border-yellow-600/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 group relative overflow-hidden min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] w-full"
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      {/* Item Image */}
                      {item.images && item.images.length > 0 && (
                        <div className="mb-4 sm:mb-6 relative z-10">
                          <img
                            src={item.images[0]}
                            alt={item.item_name}
                            className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg border border-yellow-600/30"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="relative z-10">
                        <div className="mb-6">
                          <div className="flex flex-col gap-4 mb-4">
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white font-montserrat break-words flex-1">
                                  {item.item_name}
                                </h3>
                                <span className="text-3xl sm:text-4xl font-bold text-yellow-400 whitespace-nowrap">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                              {!item.is_available && (
                                <span className="text-sm bg-red-500/20 text-red-300 px-3 py-1 rounded border border-red-500/30 self-start w-fit">
                                  Not Available
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed italic break-words">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                          {(() => {
                            const CategoryIcon = getCategoryIcon(item.category);
                            return (
                              <CategoryIcon className="w-4 h-4 text-yellow-400" />
                            );
                          })()}
                          <span className="text-xs sm:text-sm text-yellow-300 uppercase tracking-wider break-words">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-yellow-600/30"
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
              Ready to Order?
            </h2>
            <p className="text-gray-300 mb-6">
              Contact us to place your order or make a reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Call to Order
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition-colors">
                Make Reservation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
