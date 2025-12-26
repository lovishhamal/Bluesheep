"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type TravelGuideSidebarProps = {
  videoUrl?: string | null;
  sticky?: boolean;
};

export default function TravelGuideSidebar({
  videoUrl,
  sticky = true,
}: TravelGuideSidebarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const defaultVideoUrl = "https://ik.imagekit.io/yds5g1shj/travel.MP4";
  const finalVideoUrl = videoUrl || defaultVideoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={sticky ? "relative lg:sticky lg:top-8" : "relative"}
    >
      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
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
  );
}
