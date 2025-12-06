"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function HowToReach() {
  useEffect(() => {
    // Add structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "how-to-reach-structured-data";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAction",
      "name": "How to Reach Hotel Blue Sheep Inn",
      "description": "Travel route from Kathmandu to Dunai, Dolpa - Journey to Hotel Blue Sheep Inn",
      "object": {
        "@type": "LodgingBusiness",
        "name": "Hotel Blue Sheep Inn",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dunai",
          "addressRegion": "Dolpa",
          "addressCountry": "NP"
        }
      },
      "fromLocation": {
        "@type": "City",
        "name": "Kathmandu",
        "addressCountry": "NP"
      },
      "toLocation": {
        "@type": "City",
        "name": "Dunai",
        "addressRegion": "Dolpa",
        "addressCountry": "NP"
      },
      "distance": {
        "@type": "Distance",
        "name": "700-750 km"
      },
      "duration": {
        "@type": "Duration",
        "name": "36 hours"
      }
    });

    // Remove existing script if present
    const existingScript = document.getElementById("how-to-reach-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.getElementById("how-to-reach-structured-data");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <>

      {/* Routes Section - How to Reach Hotel Blue Sheep Inn */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
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
              Journey from Kathmandu to Dunai, Dolpa - Your adventure begins here
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <video
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
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-2xl -z-10" />
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
                {/* Route 1: Kathmandu to Nepalgunj */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Kathmandu → Nepalgunj
                      </h3>
                      <p className="text-gray-600 mb-3">
                        By bus or HiAce van
                      </p>
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                        <span>⏱️</span>
                        <span>~12 hours</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Route 2: Nepalgunj to Jajarkot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Nepalgunj → Jajarkot / Western Hill Towns
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Via Surkhet / Musikot / Tallu Bagar / Tripurakot
                      </p>
                      <p className="text-gray-600 mb-3 text-sm">
                        Using bus or shared jeep - rough and often unpaved roads
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Route 3: Jajarkot to Dunai */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Jajarkot/Tripurakot → Dunai
                      </h3>
                      <p className="text-gray-600 mb-3">
                        By local jeep (4-WD) or combination of jeep + walking/trek
                      </p>
                      <p className="text-amber-600 text-sm font-semibold">
                        ⚠️ Last stretch especially rough and slow
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Summary Card */}
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Distance</p>
                    <p className="text-2xl font-bold text-gray-900">700-750 km</p>
                    <p className="text-xs text-gray-500 mt-1">Depending on route</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-2xl font-bold text-gray-900">36 hours</p>
                    <p className="text-xs text-gray-500 mt-1">Often 2-3 days</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  * Travel duration may vary depending on road conditions and weather
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

