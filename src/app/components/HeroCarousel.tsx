"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { GalleryImage } from "./CreativeImageCarousel";

interface HeroCarouselProps {
  images: GalleryImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
  isAutoPlay: boolean;
  setIsAutoPlay: (play: boolean) => void;
  isMobile: boolean;
}

export default function HeroCarousel({
  images,
  currentIndex,
  setCurrentIndex,
  nextImage,
  prevImage,
  isAutoPlay,
  setIsAutoPlay,
  isMobile,
}: HeroCarouselProps) {
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

  // Show up to 3 stacked cards
  const visibleCards = 3;
  const getCardIndex = (offset: number) => {
    const index = currentIndex + offset;
    if (index < 0) return images.length + index;
    if (index >= images.length) return index - images.length;
    return index;
  };

  return (
    <div
      className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Stacked Cards Container */}
      <div className="relative w-full h-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {Array.from({ length: Math.min(visibleCards, images.length) }).map(
            (_, stackIndex) => {
              const imageIndex = getCardIndex(stackIndex);
              const isTop = stackIndex === 0;
              const isMiddle = stackIndex === 1;
              const isBottom = stackIndex === 2;

              // Calculate transform for stacked effect
              const scale = isTop ? 1 : isMiddle ? 0.95 : 0.9;
              const y = isTop ? 0 : isMiddle ? 20 : 40;
              const rotate = isTop ? 0 : isMiddle ? -2 : -4;
              const zIndex = isTop ? 30 : isMiddle ? 20 : 10;
              const opacity = isTop ? 1 : isMiddle ? 0.8 : 0.6;

              return (
                <motion.div
                  key={`${imageIndex}-${stackIndex}`}
                  initial={false}
                  animate={{
                    scale,
                    y,
                    rotate,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    if (!isTop) {
                      // Click on stacked card to bring it to top
                      const clicksNeeded = stackIndex;
                      for (let i = 0; i < clicksNeeded; i++) {
                        setTimeout(() => nextImage(), i * 100);
                      }
                    }
                  }}
                  whileHover={
                    isTop
                      ? {
                          scale: 1.02,
                          y: -5,
                          transition: { duration: 0.2 },
                        }
                      : {
                          scale: scale + 0.02,
                          y: y - 5,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  {/* Card */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={images[imageIndex]?.src}
                      alt={images[imageIndex]?.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient Overlay - Only on top card */}
                    {isTop && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    )}

                    {/* Shine Effect - Only on top card */}
                    {isTop && (
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
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none"
                      />
                    )}

                    {/* Card Border - Only on top card */}
                    {isTop && (
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            "0 30px 60px -12px rgba(16, 185, 129, 0.3)",
                            "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 pointer-events-none"
                      />
                    )}
                  </div>
                </motion.div>
              );
            }
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl hover:bg-white transition-all duration-300 flex items-center justify-center group border-2 border-emerald-100"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl hover:bg-white transition-all duration-300 flex items-center justify-center group border-2 border-emerald-100"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
      </button>

      {/* Stack Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-500 scale-125 w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                layoutId="activeStackDot"
                className="absolute inset-0 bg-emerald-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Stack Counter */}
      <div className="absolute top-4 right-4 z-40 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-emerald-100">
        <span className="text-sm font-semibold text-emerald-600">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
