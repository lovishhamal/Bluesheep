"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HowToReachPhoksundo() {
  const componentMountedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    componentMountedRef.current = true;

    try {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "TravelAction",
        name: "How to Travel to Phoksundo Lake, Dolpa",
        description:
          "Complete travel guide from Kathmandu to Phoksundo Lake, Dolpa - Trekking routes, travel times, and costs",
        object: {
          "@type": "TouristAttraction",
          name: "Phoksundo Lake",
          addressRegion: "Dolpa",
          addressCountry: "NP",
        },
        fromLocation: {
          "@type": "City",
          name: "Kathmandu",
          addressCountry: "NP",
        },
        toLocation: {
          "@type": "TouristAttraction",
          name: "Phoksundo Lake",
          addressRegion: "Dolpa",
          addressCountry: "NP",
        },
        distance: {
          "@type": "Distance",
          name: "800-850 km",
        },
        duration: {
          "@type": "Duration",
          name: "5-7 days (including trek)",
        },
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "how-to-travel-phoksundo-structured-data";
      script.text = JSON.stringify(structuredData);

      const existingScript = document.getElementById(
        "how-to-travel-phoksundo-structured-data"
      );
      if (existingScript) {
        existingScript.remove();
      }

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
          "how-to-travel-phoksundo-structured-data"
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
    <div className="min-h-screen bg-white">
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
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
              <span className="text-5xl">🏔️</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                How to Travel to Phoksundo Lake, Dolpa
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete travel guide to Phoksundo Lake - Nepal's deepest and most beautiful alpine lake
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
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
                  <source
                    src="https://drvmkdicefvtuhiqznce.supabase.co/storage/v1/object/public/images/travel.MP4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-2xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-400/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      🚶
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Trekking Route via Dunai
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Kathmandu → Dunai → Phoksundo Lake (Trek)
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <span>⏱️</span>
                          <span>5-7 days total</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                          <span>💰</span>
                          <span>~NPR 8,000-12,000</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3 italic">
                        First reach Dunai (30-36 hours), then trek 2-3 days to Phoksundo Lake
                      </p>
                      <p className="text-xs text-amber-600 mt-2 font-medium">
                        * Price may vary - includes guide, porter, and permits
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-400/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      ✈️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Flight + Trek Option
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Kathmandu → Juphal → Trek to Phoksundo Lake
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-blue-600 font-semibold">
                          ⏱️ ~45 mins flight + 3-4 days trek
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 italic">
                        Fly to Juphal, then trek to Phoksundo Lake (faster but more expensive)
                      </p>
                      <p className="text-xs text-amber-600 mt-2 font-medium">
                        * Flight prices and schedules may vary - check with airlines
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200/50 shadow-lg"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>Journey Summary to Phoksundo Lake</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      5-7 days
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Including trek time
                    </p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                    <p className="text-2xl font-bold text-gray-900">
                      NPR 8,000-12,000
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Including permits & guide
                    </p>
                    <p className="text-xs text-amber-600 mt-1 font-medium">
                      * Prices may vary
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 border border-amber-200/50 rounded-lg">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">⚠️ Important Note:</span>{" "}
                    Phoksundo Lake requires trekking permits and a guide. The prices, travel times, and schedules shown here are estimates and may change. We recommend contacting trekking agencies directly to confirm current prices, permits, and departure times.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

