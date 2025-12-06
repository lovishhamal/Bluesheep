"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CreativeImageCarouselProps {
  images: GalleryImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
  isAutoPlay: boolean;
  setIsAutoPlay: (play: boolean) => void;
  isMobile: boolean;
}

export default function CreativeImageCarousel({
  images,
  currentIndex,
  setCurrentIndex,
  nextImage,
  prevImage,
  isAutoPlay,
  setIsAutoPlay,
  isMobile,
}: CreativeImageCarouselProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  if (images.length === 0) return null;

  return (
    <section
      id="carousel-section"
      className="w-full h-[50vh] bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Hotel Name Background Text - Big Fading Transparent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black select-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(59, 130, 246, 0.04) 50%, rgba(16, 185, 129, 0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.01em",
              lineHeight: "1",
              maxWidth: "100%",
              padding: "0 1rem",
              wordBreak: "break-word",
            }}
          >
            Hotel Blue Sheep Inn
          </h2>
        </div>
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full h-full relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl h-full flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Side Tags/Thumbnails - Left Side */}
          <div className="hidden md:flex flex-col gap-3 h-full items-center justify-center flex-shrink-0">
            <div
              className="flex flex-col gap-3 max-h-full overflow-y-auto scrollbar-hide"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {images.map((image, index) => {
                const isActive = index === currentIndex;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "ring-4 ring-emerald-500 ring-offset-2 scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeTag"
                        className="absolute inset-0 border-2 border-emerald-500"
                        style={{ borderRadius: "8px" }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Main Image Container */}
          <div
            className="flex-1 h-full flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full max-w-4xl"
            >
              <img
                src={images[currentIndex]?.src}
                alt={images[currentIndex]?.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              />
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Side Tags/Thumbnails - Right Side (Mobile: Bottom) */}
          <div className="md:hidden flex flex-row gap-3 w-full justify-center overflow-x-auto pb-4 scrollbar-hide">
            {images.map((image, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-16 h-16 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "ring-4 ring-emerald-500 ring-offset-2 scale-110"
                      : "opacity-60"
                  }`}
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeTagMobile"
                      className="absolute inset-0 border-2 border-emerald-500"
                      style={{ borderRadius: "8px" }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots - Desktop Bottom */}
        <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-50 justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-emerald-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  layoutId="activeCarouselDot"
                  className="absolute inset-0 bg-emerald-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
