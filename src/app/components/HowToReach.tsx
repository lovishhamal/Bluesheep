"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface HowToReachProps {
  videoUrl?: string | null;
}

export default function HowToReach({ videoUrl }: HowToReachProps) {
  const componentMountedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Default video URL if not provided (fallback)
  const defaultVideoUrl = "https://ik.imagekit.io/yds5g1shj/travel.MP4";
  const finalVideoUrl = videoUrl || defaultVideoUrl;

  useEffect(() => {
    componentMountedRef.current = true;

    try {
      // Check if we're in browser environment
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      // Add structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "TravelAction",
        name: "How to Reach Hotel Blue Sheep Inn",
        description:
          "Travel route from Kathmandu to Dunai, Dolpa - Journey to Hotel Blue Sheep Inn",
        object: {
          "@type": "LodgingBusiness",
          name: "Hotel Blue Sheep Inn",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dunai",
            addressRegion: "Dolpa",
            addressCountry: "NP",
          },
        },
        fromLocation: {
          "@type": "City",
          name: "Kathmandu",
          addressCountry: "NP",
        },
        toLocation: {
          "@type": "City",
          name: "Dunai",
          addressRegion: "Dolpa",
          addressCountry: "NP",
        },
        distance: {
          "@type": "Distance",
          name: "700-750 km",
        },
        duration: {
          "@type": "Duration",
          name: "30-36 hours",
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "how-to-reach-structured-data";
      script.text = JSON.stringify(structuredData);

      // Remove existing script if present
      const existingScript = document.getElementById(
        "how-to-reach-structured-data"
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Check if document.head exists
      if (!document.head) {
        return;
      }

      document.head.appendChild(script);
    } catch {
      // Silently handle errors
    }

    return () => {
      componentMountedRef.current = false;
      try {
        const scriptToRemove = document.getElementById(
          "how-to-reach-structured-data"
        );
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      } catch {
        // Silently handle cleanup errors
      }
    };
  }, []);

  return (
    <>
      {/* Routes Section - How to Reach Hotel Blue Sheep Inn */}
      <section className="py-4 lg:py-12 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-5xl">🗺️</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                How to Reach Hotel Blue Sheep Inn
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Journey from Kathmandu to Dunai, Dolpa - Your adventure begins
              here
            </p>
          </motion.div>

          {/* Desktop: Video on left, Routes on right */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative lg:sticky lg:top-8"
            >
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  poster="/phoksundo.jpg"
                >
                  <source src={finalVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-2xl -z-10" />

              {/* Ultra Creative Parking Section - Below Video */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="mt-8 relative group"
              >
                {/* Main Card with 3D Effect */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
                  {/* Animated Gradient Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/80 via-blue-500/70 to-emerald-600/80"
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  {/* Animated Particles/Orbs */}
                  <motion.div
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      x: [0, -80, 0],
                      y: [0, 60, 0],
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"
                  />

                  {/* Content Container */}
                  <div className="relative z-10 p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Left Side - Animated Icon with Multiple Layers */}
                      <div className="flex-shrink-0 relative">
                        {/* Rotating Ring 1 */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 w-32 h-32 border-4 border-white/20 border-dashed rounded-full"
                        />
                        
                        {/* Rotating Ring 2 - Opposite Direction */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-2 w-28 h-28 border-4 border-white/15 border-dotted rounded-full"
                        />

                        {/* Center Icon with Pulse */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="relative w-32 h-32 bg-white/70 rounded-2xl flex items-center justify-center shadow-2xl"
                        >
                          <span className="text-6xl">🚗</span>
                          
                          {/* Glow Effect */}
                          <div className="absolute -inset-2 bg-white/15 rounded-2xl blur-xl"></div>
                        </motion.div>

                        {/* Floating Particles Around Icon */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "easeInOut",
                            }}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                              top: `${20 + i * 20}%`,
                              left: `${-10 + i * 30}%`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Right Side - Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-4"
                        >
                          <span className="text-white text-sm font-semibold">🅿️ PARKING FACILITY</span>
                        </motion.div>

                        {/* Title with Gradient Text */}
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          viewport={{ once: true }}
                          className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight"
                        >
                          Ample Parking Space
                          <br />
                          <span className="text-2xl md:text-3xl font-bold text-white/90">
                            Right at Your Doorstep
                          </span>
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          viewport={{ once: true }}
                          className="text-white/90 text-lg mb-6 leading-relaxed"
                        >
                          Our parking area is easily accessible and located right at the hotel premises
                        </motion.p>

                        {/* Feature Pills */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          viewport={{ once: true }}
                          className="flex flex-wrap gap-3 justify-center md:justify-start"
                        >
                          {[
                            { icon: "🚙", text: "Spacious" },
                            { icon: "🔒", text: "Secure" },
                            { icon: "🆓", text: "Free for Guests" },
                            { icon: "✨", text: "Well-Maintained" },
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg"
                            >
                              <span className="text-xl">{feature.icon}</span>
                              <span className="text-white font-semibold text-sm">
                                {feature.text}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Bottom Text */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          viewport={{ once: true }}
                          className="text-white/80 text-sm mt-6 italic"
                        >
                          Whether you&apos;re arriving by car or renting a vehicle to explore Dolpa, we have you covered with our spacious parking facilities
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
                  
                  {/* Shine Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-blue-500/40 to-emerald-600/40 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            </motion.div>

            {/* Routes Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Route Cards */}
              <div className="space-y-4">
                {/* Option 1: Direct Bus */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-400/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Direct Bus Option
                        </h3>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                          NEWEST
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Kathmandu (Gongabu) → Pokhara → Baglung → NepalGunj →
                        JajarKot → Rukum (Radi) → Tallubagar → Dunai
                      </p>
                      <div className="grid sm:grid-cols-1 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <span>⏱️</span>
                          <span>~30 hours (continuous)</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3 italic">
                        Direct journey through scenic mountain routes -
                        experience the authentic beauty of Nepal&apos;s remote
                        landscapes
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Option 2: Standard Bus + Jeep Combo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Standard Bus + Jeep Combo
                      </h3>

                      {/* Leg 1 */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Leg 1:
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Kathmandu → Radi (Rukum)
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Night Bus from Gongabu Bus Park
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-semibold">
                            ⏱️ ~24-25 hours
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Bus usually reaches Radi Bazaar the next afternoon
                        </p>
                      </div>

                      {/* Leg 2 */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Leg 2:
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Radi → Dunai
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Local Jeep (multiple switches: Radi → Tallubagar →
                          Suligad → Dunai)
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-semibold">
                            ⏱️ 6-8 hours
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 font-semibold mt-2">
                          💡 Journey includes scenic bridge crossing at
                          Tallubagar with opportunity to experience local
                          transportation
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Option 3: Flight Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-400/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      ✈️
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">
                          Flight Options
                        </h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                          FASTEST
                        </span>
                      </div>

                      {/* Flight Option 1: Direct */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Option 1:
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Direct Flight
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Kathmandu → Juphal → Walk/Jeep to Dunai
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-semibold">
                            ⏱️ ~45 mins flight + short jeep/walk
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Most convenient flight option - direct to Juphal
                        </p>
                        <p className="text-xs text-amber-600 mt-2 font-medium">
                          * Flight schedules may vary - check with airlines
                        </p>
                      </div>

                      {/* Flight Option 2: Via Nepalgunj */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-gray-700">
                            Option 2:
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Via Nepalgunj
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          Kathmandu → Nepalgunj → Juphal → Walk/Jeep to Dunai
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-semibold">
                            ⏱️ ~1 hour flight + short jeep/walk
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Alternative route with connection in Nepalgunj
                        </p>
                        <p className="text-xs text-amber-600 mt-2 font-medium">
                          * Flight schedules may vary - check with airlines
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Summary & Recommendations Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200/50 shadow-lg"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>Journey Summary</span>
                </h4>
                <div className="grid sm:grid-cols-1 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      30-36 hours
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Can stretch to 2 days
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-4 pt-4 border-t border-emerald-200/50">
                  <h5 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>Recommendations for Guests</span>
                  </h5>
                  <div className="space-y-2">
                    <div className="bg-white/60 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Budget Travelers:</span>{" "}
                        Budget 2 full days for the bus trip to account for
                        delays at Radi or Tallubagar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200/50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">💡 Travel Tip:</span> The
                    travel times and schedules shown here are estimates. Flight
                    schedules depend on weather and availability. We recommend
                    contacting bus companies or airlines directly to confirm
                    current schedules and departure times for the best travel
                    experience.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
