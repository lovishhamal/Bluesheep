"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface HowToReachPhoksundoProps {
  videoUrl?: string | null;
}

export default function HowToReachPhoksundo({ videoUrl }: HowToReachPhoksundoProps) {
  const componentMountedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Default video URL if not provided (fallback)
  const defaultVideoUrl = "https://ik.imagekit.io/yds5g1shj/travel.MP4";
  const finalVideoUrl = videoUrl || defaultVideoUrl;

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
          "Complete travel guide from Kathmandu to Phoksundo Lake, Dolpa - Trekking routes and travel times",
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

      // FAQ Structured Data
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I reach Phoksundo Lake?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To reach Phoksundo Lake, fly from Kathmandu to Nepalgunj, then to Juphal. From Juphal, trek for 2-3 days passing through Dunai, Chhepka, and Jharana Waterfall to reach the lake.",
            },
          },
          {
            "@type": "Question",
            name: "How long is the trek to Phoksundo Lake?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The trek usually takes 2-3 days from Juphal Airport. The return trip takes a similar amount of time.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a permit for Phoksundo Lake?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you need a Shey Phoksundo National Park entry permit and a Lower Dolpo Restricted Area Permit (if applicable based on route).",
            },
          },
        ],
      };

      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.id = "how-to-travel-phoksundo-faq-data";
      faqScript.text = JSON.stringify(faqData);

      const existingScript = document.getElementById(
        "how-to-travel-phoksundo-structured-data"
      );
      if (existingScript) {
        existingScript.remove();
      }

      const existingFaqScript = document.getElementById(
        "how-to-travel-phoksundo-faq-data"
      );
      if (existingFaqScript) {
        existingFaqScript.remove();
      }

      if (!document.head) {
        return;
      }

      document.head.appendChild(script);
      document.head.appendChild(faqScript);
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
        const faqScriptToRemove = document.getElementById(
          "how-to-travel-phoksundo-faq-data"
        );
        if (faqScriptToRemove) {
          faqScriptToRemove.remove();
        }
      } catch {
        // Silently handle cleanup errors
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Hotel Blue Sheep Inn Logo"
                width={48}
                height={48}
                className="h-12 w-auto rounded-lg shadow-md"
              />
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-white font-medium transition-colors duration-200 hover:text-emerald-100"
              >
                Home
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
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

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
                How to Reach Phoksundo Lake, Dolpa
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete guide on how to reach Phoksundo Lake - Nepal&apos;s deepest and most beautiful alpine lake
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
                    src={finalVideoUrl}
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
                      <div className="grid sm:grid-cols-1 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <span>⏱️</span>
                          <span>5-7 days total</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3 italic">
                        First reach Dunai (30-36 hours), then trek 2-3 days to Phoksundo Lake
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
                        * Flight schedules may vary - check with airlines
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
                <div className="grid sm:grid-cols-1 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      5-7 days
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Including trek time
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200/50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">💡 Travel Tip:</span>{" "}
                    Phoksundo Lake requires trekking permits for this incredible adventure. The travel times and schedules shown here are estimates. We recommend contacting trekking agencies directly to secure permits and confirm current schedules for an unforgettable journey.
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

