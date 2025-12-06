"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getWhatsAppUrl } from "../util/constants";

export default function AttractionsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
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
                <img
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
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
                href="/rooms"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium border-b-2 border-emerald-50"
              >
                Attractions
              </Link>
              <Link
                href="/contact"
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
                  href="/rooms"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          </motion.div>
        </div>
      </section>

      {/* Phoksundo Lake Section - Creative Design */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/phoksundo.jpg"
                  alt="Phoksundo Lake Dolpa Nepal - Crystal Clear Alpine Lake at 3611m elevation"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-emerald-500">
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    Elevation
                  </div>
                  <div className="text-xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    3,611m
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg border-2 border-white"
                >
                  🏞️
                </motion.div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                    Phoksundo Lake
                  </h2>
                  <p className="text-emerald-600 font-semibold text-lg">
                    Crystal Clear Alpine Paradise
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-light">
                <p>
                  <strong className="text-gray-900 font-semibold">
                    Phoksundo Lake
                  </strong>{" "}
                  is one of Nepal&apos;s most stunning high-altitude lakes,
                  located at an elevation of 3,611 meters (11,849 feet) in the
                  Dolpa district. This pristine alpine lake is renowned for its
                  crystal-clear turquoise waters that change color throughout
                  the day, reflecting the surrounding snow-capped peaks.
                </p>
                <p>
                  The lake is considered sacred by the local people and is part
                  of the Shey Phoksundo National Park. It&apos;s a perfect
                  destination for trekkers and nature enthusiasts seeking
                  breathtaking mountain scenery and peaceful natural beauty.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-5 border-2 border-emerald-200 shadow-lg"
                >
                  <div className="text-3xl mb-2">⛰️</div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Elevation
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    3,611m
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-5 border-2 border-blue-200 shadow-lg"
                >
                  <div className="text-3xl mb-2">💧</div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Water Type
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Freshwater
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about visiting Phoksundo Lake and how Hotel Blue Sheep Inn can help with my trip.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-emerald-500/50 text-lg sm:text-xl"
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
                  <span className="relative z-10">📱 Plan Your Visit</span>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dho Tarap Section - Creative Design */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg border-2 border-white"
                >
                  🏘️
                </motion.div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                    Dho Tarap
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg">
                    Highest Village in Nepal
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-light">
                <p>
                  <strong className="text-gray-900 font-semibold">
                    Dho Tarap
                  </strong>{" "}
                  is recognized as the highest permanently inhabited village in
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
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-200 shadow-lg"
                >
                  <div className="text-3xl mb-2">⛰️</div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Elevation
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    4,200m
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 border-2 border-purple-200 shadow-lg"
                >
                  <div className="text-3xl mb-2">🏛️</div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Culture
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Tibetan
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about visiting Dho Tarap and how Hotel Blue Sheep Inn can help with my trip.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-blue-500/50 text-lg sm:text-xl"
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
                  <span className="relative z-10">📱 Plan Your Visit</span>
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
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl shadow-2xl group"
            >
              <img
                src="/dho.jpg"
                alt="Dho Tarap - Highest Village in Nepal at 4200m elevation - Traditional Tibetan Buddhist culture"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-blue-500">
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  Elevation
                </div>
                <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  4,200m
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Visit Section - Creative Design */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Why Visit These Wonders?
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Experience the natural beauty and cultural richness of Dolpa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                className="group relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/20"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                ></div>

                {/* Icon Container with Gradient */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-20 h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg border-2 border-white group-hover:shadow-xl`}
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
                  <span className="text-4xl relative z-10">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-light">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Phoksundo Lake and Dho Tarap
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room and plan my visit to Phoksundo Lake and Dho Tarap.`;
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
