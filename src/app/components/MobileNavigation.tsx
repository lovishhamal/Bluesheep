"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/rooms/", label: "Rooms", icon: "🛏️" },
    { href: "/menu/", label: "Menu", icon: "🍽️" },
    { href: "/camping/", label: "Camping", icon: "⛺" },
    { href: "/attractions/", label: "Attractions", icon: "🏔️" },
    { href: "/travel-guide/", label: "Travel Guide", icon: "🗺️" },
    { href: "/contact/", label: "Contact", icon: "📞" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? "✕" : "☰"}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                  <button
                    onClick={toggleMenu}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleMenu}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-emerald-50 transition-colors group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium text-gray-900 group-hover:text-emerald-700">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                    <p className="mb-2">Hotel Blue Sheep Inn</p>
                    <p>Your gateway to Dolpa</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}