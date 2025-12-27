"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Navigation from "../components/Navigation";

type TravelGuideVariant = "dunai-dolpa" | "dho" | "phoksundo";

type HowToTravelGuideProps = {
  videoUrl?: string | null;
};

function getGuideContent(variant: TravelGuideVariant) {
  switch (variant) {
    case "dunai-dolpa":
      return {
        icon: "🗺️",
        title: "How to Reach Dunai, Dolpa (How to Travel)",
        description:
          "Complete guide on how to travel/reach Dunai, Dolpa from Kathmandu\nwith bus and flight options",
        summaryTitle: "Journey Summary to Dunai",
        summaryDuration: "30-36 hours",
        summarySubtext: "Can stretch to 2 days",
        summaryTip:
          "The travel times and schedules shown here are estimates. Flight schedules depend on weather and availability. We recommend contacting bus companies or airlines directly to confirm current schedules and departure times for the best travel experience.",
      };
    case "dho":
      return {
        icon: "🗺️",
        title: "How to Reach Dho, Dolpa (How to Travel)",
        description:
          "Complete guide on how to travel/reach Dho, Dolpa from Kathmandu\nwith route options and tips",
        summaryTitle: "Journey Summary to Dho",
        summaryDuration: "32-38 hours",
        summarySubtext: "Plus additional time to Dho",
        summaryTip:
          "Dho is located in Upper Dolpa, offering an extended adventure through the stunning Dolpa region. The travel times and schedules shown here are estimates. We recommend contacting local operators directly to confirm current schedules and departure times for a smooth journey.",
      };
    case "phoksundo":
      return {
        icon: "🏔️",
        title: "How to Reach Phoksundo Lake, Dolpa (How to Travel)",
        description:
          "Complete guide on how to travel/reach Phoksundo Lake in Dolpa with\nroutes, tips, and timing",
        summaryTitle: "Journey Summary to Phoksundo Lake",
        summaryDuration: "5-7 days",
        summarySubtext: "Including trek time",
        summaryTip:
          "Phoksundo Lake requires trekking permits for this incredible adventure. The travel times and schedules shown here are estimates. We recommend contacting trekking agencies directly to secure permits and confirm current schedules for an unforgettable journey.",
      };
  }
}

function Routes({ variant }: { variant: TravelGuideVariant }) {
  if (variant === "dunai-dolpa") {
    return (
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
                Kathmandu (Gongabu) → Pokhara → Baglung → NepalGunj → JajarKot →
                Rukum (Radi) → Tallubagar → Dunai
              </p>
              <div className="grid sm:grid-cols-1 gap-3 mt-4">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>⏱️</span>
                  <span>~30 hours (continuous)</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">
                Direct journey through scenic mountain routes - experience the
                authentic beauty of Nepal&apos;s remote landscapes
              </p>
            </div>
          </div>
        </motion.div>

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
                  Local Jeep (multiple switches: Radi → Tallubagar → Suligad →
                  Dunai)
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600 font-semibold">
                    ⏱️ 6-8 hours
                  </span>
                </div>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  💡 Journey includes scenic bridge crossing at Tallubagar with
                  opportunity to experience local transportation
                </p>
              </div>
            </div>
          </div>
        </motion.div>

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
    );
  }

  if (variant === "dho") {
    return (
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
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Via Dunai Route
              </h3>
              <p className="text-gray-600 mb-3">
                Kathmandu (Gongabu) → Pokhara → Baglung → Rukum (Radi) →
                Tallubagar → Dunai → Dho (Upper Dolpa)
              </p>
              <div className="grid sm:grid-cols-1 gap-3 mt-4">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <span>⏱️</span>
                  <span>~32-38 hours</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">
                First reach Dunai, then continue to Dho via local jeep or
                trekking
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
                Flight Option
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Kathmandu → Juphal → Trek/Jeep to Dho
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-blue-600 font-semibold">
                  ⏱️ ~45 mins flight + 2-3 days trek or jeep
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 italic">
                Fly to Juphal, then trek or take jeep to Dho (Upper Dolpa)
              </p>
              <p className="text-xs text-amber-600 mt-2 font-medium">
                * Flight schedules may vary - check with airlines
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
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
              First reach Dunai (30-36 hours), then trek 2-3 days to Phoksundo
              Lake
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
              Fly to Juphal, then trek to Phoksundo Lake (faster but more
              expensive)
            </p>
            <p className="text-xs text-amber-600 mt-2 font-medium">
              * Flight schedules may vary - check with airlines
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowToTravelGuide({
  videoUrl,
}: HowToTravelGuideProps) {
  const pathname = usePathname();
  const variant = useMemo<TravelGuideVariant>(() => {
    const path = (pathname || "").toLowerCase();
    if (path.includes("how-to-travel-dho")) return "dho";
    if (path.includes("how-to-travel-phoksundo")) return "phoksundo";
    return "dunai-dolpa";
  }, [pathname]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const defaultVideoUrl = "https://ik.imagekit.io/yds5g1shj/travel.MP4";
  const finalVideoUrl = videoUrl || defaultVideoUrl;
  const guide = getGuideContent(variant);

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="travel-guide" />

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
              <span className="text-5xl">{guide.icon}</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                {guide.title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
              {guide.description}
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
                  <source src={finalVideoUrl} type="video/mp4" />
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
              <Routes variant={variant} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200/50 shadow-lg"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>{guide.summaryTitle}</span>
                </h4>
                <div className="grid sm:grid-cols-1 gap-4 mb-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {guide.summaryDuration}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {guide.summarySubtext}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200/50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">💡 Travel Tip:</span>{" "}
                    {guide.summaryTip}
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
