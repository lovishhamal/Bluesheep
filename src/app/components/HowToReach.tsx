"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

export default function HowToReach() {
  const travelHighlights = [
    { icon: "🚌", title: "Bus Route", detail: "~30 hrs (direct)" },
    { icon: "✈️", title: "Flight", detail: "~45 min to Juphal" },
    { icon: "🚙", title: "Jeep", detail: "6–8 hrs (Radi → Dunai)" },
  ];

  useEffect(() => {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

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

      const existingScript = document.getElementById(
        "how-to-reach-structured-data"
      );
      if (existingScript) {
        existingScript.remove();
      }

      if (!document.head) {
        return;
      }

      document.head.appendChild(script);
    } catch {
    }

    return () => {
      try {
        const scriptToRemove = document.getElementById(
          "how-to-reach-structured-data"
        );
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      } catch {
      }
    };
  }, []);

  return (
    <>
      <section className="py-8 lg:py-16 bg-gradient-to-br from-white via-emerald-50/40 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-[520px] h-[520px] bg-gradient-to-br from-emerald-300/25 to-blue-300/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 25, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-28 -left-28 w-[560px] h-[560px] bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.08),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.06),transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 lg:mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-emerald-200/60 shadow-sm"
              >
                <span className="text-lg">🧭</span>
                <span className="text-gray-900 font-bold">Travel & Access</span>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block text-2xl"
              >
                🗺️
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                How to Reach Hotel Blue Sheep Inn
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              View complete routes from Kathmandu to Dunai (Dolpa), flights,
              jeeps, contacts, hotels/stays, and estimated costs to travel
              Dolpa. Open the Travel Guide.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-emerald-200/60 shadow-xl bg-white/70 backdrop-blur-sm"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10"
                style={{ backgroundSize: "200% 200%" }}
              />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-emerald-400/15 to-blue-400/15 rounded-full blur-2xl" />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-emerald-200/60">
                    <span className="text-base">📌</span>
                    <span className="text-sm font-bold text-gray-900">
                      Kathmandu → Dunai (Dolpa)
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-white/70 border border-emerald-200/60 text-gray-900 font-semibold text-sm">
                      700–750 km
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/70 border border-emerald-200/60 text-gray-900 font-semibold text-sm">
                      30–36 hrs
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                  Travel Guide
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Routes, contacts, stays, and cost guidance to plan bus,
                  flight, and jeep connections without guessing.
                </p>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {travelHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-white/70 border border-emerald-200/60 px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-bold text-gray-900">
                          {item.title}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex"
                  >
                    <Link
                      href="/travel-guide/"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white font-extrabold shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-shadow"
                    >
                      View Travel Guide
                      <span className="text-lg">→</span>
                    </Link>
                  </motion.div>
                  <div className="text-sm text-gray-600">
                    Includes routes, contacts, hotels, and cost tips for travelers.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
