"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  MountainIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { getWhatsAppUrl, PHONE_NUMBER } from "../util/constants";

export default function AttractionsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section-id");
            if (sectionId) {
              setVisibleSections((prev) => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-section-id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
      {/* Navigation */}
      <nav className="w-full bg-slate-900 border-b border-emerald-400/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-16 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
              >
                Attractions
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
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
              className="md:hidden bg-slate-800 border-t border-emerald-400/30"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl border-4 border-emerald-400">
                  🏔️
                </div>
                <div className="absolute -inset-1 bg-emerald-400 rounded-full blur opacity-30"></div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="block">Discover</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Dolpa's Wonders
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-200 font-light max-w-3xl mx-auto">
                Explore the breathtaking beauty of Phoksundo Lake and the
                highest village in Nepal
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-emerald-300">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏞️</span>
                <span className="text-lg">Phoksundo Lake</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-400/50"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏘️</span>
                <span className="text-lg">Dho Tarap</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-400/50"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⛰️</span>
                <span className="text-lg">Highest Village</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Phoksundo Lake Section */}
      <section
        data-section-id="phoksundo"
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.has("phoksundo")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/phoksundo.jpg"
                  alt="Phoksundo Lake Dolpa Nepal - Crystal Clear Alpine Lake at 3611m elevation - Best high altitude lake in Nepal"
                  className="w-full h-auto object-cover"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  🏞️
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Phoksundo Lake
                  </h2>
                  <p className="text-emerald-600 font-semibold text-lg">
                    Crystal Clear Alpine Paradise
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  <strong className="text-slate-900">Phoksundo Lake</strong> is
                  one of Nepal's most stunning high-altitude lakes, located at
                  an elevation of 3,611 meters (11,849 feet) in the Dolpa
                  district. This pristine alpine lake is renowned for its
                  crystal-clear turquoise waters that change color throughout the
                  day, reflecting the surrounding snow-capped peaks.
                </p>
                <p>
                  The lake is considered sacred by the local people and is part
                  of the Shey Phoksundo National Park. It's a perfect
                  destination for trekkers and nature enthusiasts seeking
                  breathtaking mountain scenery and peaceful natural beauty.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl mb-2">⛰️</div>
                  <div className="text-sm font-semibold text-slate-900">
                    Elevation
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    3,611 m
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl mb-2">💧</div>
                  <div className="text-sm font-semibold text-slate-900">
                    Water Type
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    Freshwater
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about visiting Phoksundo Lake and how Hotel Blue Sheep Inn can help with my trip.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📱 Plan Your Visit
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dho Tarap Section */}
      <section
        data-section-id="dho-tarap"
        className={`py-20 bg-gradient-to-br from-emerald-50 to-slate-50 transition-all duration-1000 ${
          visibleSections.has("dho-tarap")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  🏘️
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                    Dho Tarap
                  </h2>
                  <p className="text-emerald-600 font-semibold text-lg">
                    Highest Village in Nepal
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                <p>
                  <strong className="text-slate-900">Dho Tarap</strong> is
                  recognized as the highest permanently inhabited village in
                  Nepal, situated at an impressive elevation of approximately
                  4,200 meters (13,780 feet) above sea level. This remote and
                  culturally rich village is located in the Upper Dolpa region
                  and offers visitors a unique glimpse into traditional Tibetan
                  Buddhist culture.
                </p>
                <p>
                  The village is home to ancient monasteries, traditional stone
                  houses, and a community that has preserved its unique way of
                  life for centuries. Dho Tarap is a must-visit destination for
                  those seeking authentic cultural experiences and stunning
                  high-altitude landscapes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
                  <div className="text-2xl mb-2">⛰️</div>
                  <div className="text-sm font-semibold text-slate-900">
                    Elevation
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    4,200 m
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
                  <div className="text-2xl mb-2">🏛️</div>
                  <div className="text-sm font-semibold text-slate-900">
                    Culture
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    Tibetan
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about visiting Dho Tarap and how Hotel Blue Sheep Inn can help with my trip.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📱 Plan Your Visit
                </motion.button>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/dho.jpg"
                alt="Dho Tarap - Highest Village in Nepal at 4200m elevation - Traditional Tibetan Buddhist culture"
                className="w-full h-auto object-cover"
                style={{
                  WebkitTransform: "translateZ(0)",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section
        data-section-id="why-visit"
        className={`py-20 bg-slate-900 transition-all duration-1000 ${
          visibleSections.has("why-visit")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Visit These Wonders?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the natural beauty and cultural richness of Dolpa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏔️",
                title: "Breathtaking Scenery",
                description:
                  "Witness some of the most stunning mountain landscapes and pristine natural beauty in Nepal",
              },
              {
                icon: "🙏",
                title: "Cultural Heritage",
                description:
                  "Explore ancient monasteries and experience traditional Tibetan Buddhist culture",
              },
              {
                icon: "🚶",
                title: "Trekking Paradise",
                description:
                  "Perfect base for trekking adventures in the remote and beautiful Dolpa region",
              },
              {
                icon: "📸",
                title: "Photography",
                description:
                  "Capture incredible photos of crystal-clear lakes, snow-capped peaks, and traditional villages",
              },
              {
                icon: "🌌",
                title: "Stargazing",
                description:
                  "Enjoy clear night skies perfect for stargazing at high altitudes",
              },
              {
                icon: "🏨",
                title: "Comfortable Base",
                description:
                  "Hotel Blue Sheep Inn provides the perfect comfortable base for your Dolpa adventures",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-8 border border-emerald-400/30 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-400/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Explore Dolpa?
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-emerald-100">
              Book your stay at Hotel Blue Sheep Inn and start your adventure
              to Phoksundo Lake and Dho Tarap
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room and plan my visit to Phoksundo Lake and Dho Tarap.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Book Your Stay
              </motion.button>
              <motion.button
                onClick={() => {
                  window.location.href = "/rooms";
                }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏨 View Rooms
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Hotel Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-12 w-12 rounded-full mr-3"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
                <h3 className="text-2xl font-bold">Hotel Blue Sheep Inn</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Your gateway to exploring the wonders of Dolpa, Nepal
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/rooms"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Rooms & Suites
                </Link>
                <Link
                  href="/menu"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Restaurant Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Garden Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Attractions
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">Location</h4>
              <div className="text-slate-300 space-y-2">
                <p>Dunai, Dolpa</p>
                <p>Karnali Province</p>
                <p>Nepal</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} Hotel Blue Sheep Inn. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

