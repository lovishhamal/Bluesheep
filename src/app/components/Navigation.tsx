"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto rounded-lg shadow-md cursor-pointer"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`font-medium transition-colors duration-200 hover:text-emerald-100 ${currentPage === "home" ? "text-white" : "text-emerald-50 hover:text-white"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/rooms/"
                className={`font-medium transition-colors duration-200 ${currentPage === "rooms"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Rooms
              </Link>
              <Link
                href="/menu/"
                className={`font-medium transition-colors duration-200 ${currentPage === "menu"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Menu
              </Link>
              <Link
                href="/camping/"
                className={`font-medium transition-colors duration-200 ${currentPage === "camping"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Camping
              </Link>
              <Link
                href="/attractions/"
                className={`font-medium transition-colors duration-200 ${currentPage === "attractions"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Attractions
              </Link>
              <Link
                href="/itineraries/"
                className={`font-medium transition-colors duration-200 ${currentPage === "itineraries"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Itineraries
              </Link>
              <Link
                href="/travel-guide/"
                className={`font-medium transition-colors duration-200 ${currentPage === "travel-guide"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Travel Guide
              </Link>
              <Link
                href="/contact/"
                className={`font-medium transition-colors duration-200 ${currentPage === "contact"
                  ? "text-white border-b-2 border-emerald-50"
                  : "text-emerald-50 hover:text-white"
                  }`}
              >
                Contact
              </Link>
            </div>

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
                  className={`block font-medium transition-colors duration-200 ${currentPage === "home" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "rooms" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "menu" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "camping" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "attractions" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/itineraries/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "itineraries" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Itineraries
                </Link>
                <Link
                  href="/travel-guide/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "travel-guide" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel Guide
                </Link>
                <Link
                  href="/contact/"
                  className={`block font-medium transition-colors duration-200 ${currentPage === "contact" ? "text-white" : "text-emerald-50 hover:text-white"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </div>
  );
}