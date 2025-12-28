"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { supabase } from "../util/supabase";
import { useState, useEffect } from "react";

// Menu interface matching your database schema
interface MenuItem {
  id: string;
  item_name: string;
  description: string;
  price: number;
  category: string;
  images: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch menu items from database
  useEffect(() => {
    let isMounted = true;

    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from("menu")
          .select("*")
          .order("category", { ascending: true })
          .order("item_name", { ascending: true });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setMenuItems(data || []);
          setError(null);
        }
      } catch (err) {
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

    return () => {
      isMounted = false;
    };
  }, []);

  // Format price for display
  const formatPrice = (price: number) => {
    return "₹" + price;
  };

  // Capitalize item names
  const capitalizeItemName = (itemName: string) => {
    const capitalizedName =
      itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
    return capitalizedName;
  };

  // Get unique categories
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category).filter(Boolean))
  );

  // Group items by category
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category] = menuItems.filter((item) => item.category === category);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a3a52] border-b border-[#1a3a52]/30 shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
                />
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-[#c9a961] font-semibold border-b-2 border-[#c9a961] transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Attractions
              </Link>
              <Link
                href="/travel-guide"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Travel Guide
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#c9a961] transition-colors duration-300"
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
            <div className="md:hidden border-t border-[#1a3a52]/30">
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-[#c9a961] font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/travel-guide"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel Guide
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-[#c9a961] transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-5 pt-0">
        {/* Menu Container */}
        <div className="bg-[#f5f1e8] border-[3px] border-[#1a3a52] max-w-4xl w-full p-10 relative mt-0 mx-auto">
          {/* Corner Decorations */}
          <div className="absolute top-[10px] left-[10px] w-[60px] h-[60px]">
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5 Q5 5 5 15 M5 5 Q5 5 15 5"
                stroke="#1a3a52"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M10 10 Q10 10 10 20 M10 10 Q10 10 20 10"
                stroke="#1a3a52"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M15 15 Q15 15 15 25 M15 15 Q15 15 25 15"
                stroke="#1a3a52"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
          <div className="absolute top-[10px] right-[10px] w-[60px] h-[60px]">
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55 5 Q55 5 55 15 M55 5 Q55 5 45 5"
                stroke="#1a3a52"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M50 10 Q50 10 50 20 M50 10 Q50 10 40 10"
                stroke="#1a3a52"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M45 15 Q45 15 45 25 M45 15 Q45 15 35 15"
                stroke="#1a3a52"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-6xl md:text-7xl text-[#1a3a52] tracking-[0.1em] mb-2 font-normal"
              style={{ fontFamily: "Georgia, serif" }}
            >
              HOTEL BLUE SHEEP INN
            </h1>
            <h2
              className="text-2xl md:text-3xl text-[#1a3a52] tracking-[0.3em] font-normal mb-8"
              style={{ fontFamily: "Georgia, serif" }}
            >
              HOTEL & RESTAURANT
            </h2>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Blue Sheep Hotel Logo"
            width={96}
            height={96}
            className="h-24 w-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Menu Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3a52] mx-auto mb-4"></div>
            <p className="text-[#1a3a52] text-lg">Loading menu...</p>
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
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryItems = itemsByCategory[category];
              if (!categoryItems || categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  {/* Section Title */}
                  <div className="flex items-center justify-center my-12 px-4">
                    <div className="flex-1 h-0.5 bg-[#c9a961] max-w-16"></div>
                    <h3
                      className="text-center text-3xl md:text-4xl text-[#1a3a52] tracking-[0.2em] px-6"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {category.toUpperCase()}
                    </h3>
                    <div className="flex-1 h-0.5 bg-[#c9a961] max-w-16"></div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-6">
                    {categoryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={index === 0 ? { opacity: 1, y: 0 } : undefined}
                        whileInView={index > 0 ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={index > 0 ? { once: true } : undefined}
                        className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 mb-6"
                      >
                        {/* Item Image */}
                        {item.images && (
                          <div className="flex-shrink-0">
                            <Image
                              src={item.images}
                              alt={item.item_name}
                              width={96}
                              height={96}
                              className="w-20 h-20 md:w-24 md:h-24 object-cover shadow-md"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        {/* Item Details */}
                        <div className="flex-1">
                          <div
                            className="text-2xl md:text-3xl text-[#1a3a52] font-semibold"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {capitalizeItemName(item.item_name)}
                          </div>
                          <div className="text-sm md:text-lg text-[#4a4a4a] mt-1 italic break-words">
                            {item.description ||
                              "Delicious and freshly prepared"}
                          </div>
                        </div>

                        {/* Price */}
                        <div
                          className="text-2xl md:text-3xl text-[#1a3a52] font-semibold whitespace-nowrap mt-2 md:mt-0 self-end md:self-auto"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {formatPrice(item.price)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
