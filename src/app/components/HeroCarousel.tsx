"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    <div className="w-full h-full flex flex-col items-center">
      <div
        className={`relative w-full flex items-center justify-center ${
          isMobile ? "min-h-[450px] py-0" : "min-h-[500px] lg:min-h-[600px]"
        }`}
        style={{
          minHeight: isMobile ? "450px" : undefined,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Mobile-only Decorative Background Elements */}
        {isMobile && (
          <>
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-2xl"
            />

            {/* Decorative geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-8 w-16 h-16 border-2 border-emerald-300/10 rounded-lg opacity-30 rotate-45" />
              <div className="absolute bottom-20 left-8 w-12 h-12 border-2 border-blue-300/10 rounded-full opacity-30" />
            </div>
          </>
        )}

        {/* Stacked Cards Container */}
        <div
          className="relative w-full max-w-2xl mx-auto"
          style={{
            perspective: "1200px",
            height: isMobile ? "436px" : "calc(100% - 104px)",
            minHeight: isMobile ? "436px" : "484px",
            marginTop: !isMobile ? "30px" : "0px",
          }}
        >
          <AnimatePresence mode="wait">
            {Array.from({ length: Math.min(visibleCards, images.length) }).map(
              (_, stackIndex) => {
                const imageIndex = getCardIndex(stackIndex);
                const isTop = stackIndex === 0;
                const isMiddle = stackIndex === 1;
                const isBottom = stackIndex === 2;

                // Calculate transform for stacked effect - More pronounced stack
                const scale = isTop ? 1 : isMiddle ? 0.92 : 0.84;
                const y = isTop
                  ? 0
                  : isMiddle
                  ? isMobile
                    ? 20
                    : 35
                  : isMobile
                  ? 40
                  : 70;
                const rotate = isTop ? 0 : isMiddle ? -3 : -6;
                const zIndex = isTop ? 30 : isMiddle ? 20 : 10;
                const opacity = isTop ? 1 : isMiddle ? 0.75 : 0.5;
                const x = isTop
                  ? 0
                  : isMiddle
                  ? isMobile
                    ? 4
                    : 8
                  : isMobile
                  ? 8
                  : 16;

                return (
                  <motion.div
                    key={`${imageIndex}-${stackIndex}`}
                    initial={false}
                    animate={{
                      scale,
                      x,
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
                    style={{
                      transformStyle: "preserve-3d",
                    }}
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
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: isTop
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                          : isMiddle
                          ? "0 15px 30px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                          : "0 10px 20px -6px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <Image
                        src={images[imageIndex]?.src}
                        alt={images[imageIndex]?.alt}
                        width={800}
                        height={600}
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

        {/* Stack Indicator Dots */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-40 flex gap-2 ${
            isMobile ? "bottom-4" : "bottom-4"
          }`}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-emerald-500 scale-125 ${
                      isMobile ? "w-6 h-2" : "w-8 h-2"
                    }`
                  : `${
                      isMobile ? "w-2 h-2" : "w-2 h-2"
                    } bg-white/60 hover:bg-white/80`
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

        {/* Mobile-only: Swipe indicator */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-emerald-100"
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="text-emerald-600"
            >
              ←
            </motion.div>
            <span className="text-xs font-semibold text-gray-700">Swipe</span>
            <motion.div
              animate={{ x: [5, -5, 5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="text-emerald-600"
            >
              →
            </motion.div>
          </motion.div>
        )}

        {/* Stack Counter */}
        <div
          className={`absolute z-40 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100 ${
            isMobile
              ? "top-8 right-3 px-2.5 py-1"
              : "top-12 right-4 px-3 py-1.5"
          }`}
        >
          <span
            className={`font-semibold text-emerald-600 ${
              isMobile ? "text-xs" : "text-sm"
            }`}
          >
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Mobile-only: Decorative corner accents */}
        {isMobile && (
          <>
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-br-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-bl-3xl pointer-events-none" />
          </>
        )}
      </div>

      {/* Navigation Arrows - Below Carousel Container */}
      <div
        className={`flex items-center justify-center gap-4 ${
          isMobile ? "mt-6" : "mt-8"
        }`}
        style={{
          marginTop: isMobile ? "calc(1.5rem + 6px)" : "calc(0.5rem)",
        }}
      >
        <button
          onClick={prevImage}
          className={`rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-emerald-100 ${
            isMobile
              ? "w-10 h-10 bg-white/90 backdrop-blur-md"
              : "w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white"
          }`}
          aria-label="Previous image"
        >
          <ChevronLeftIcon
            className={`text-emerald-600 group-hover:scale-110 transition-transform ${
              isMobile ? "w-5 h-5" : "w-6 h-6"
            }`}
          />
        </button>
        <button
          onClick={nextImage}
          className={`rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-emerald-100 ${
            isMobile
              ? "w-10 h-10 bg-white/90 backdrop-blur-md"
              : "w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white"
          }`}
          aria-label="Next image"
        >
          <ChevronRightIcon
            className={`text-emerald-600 group-hover:scale-110 transition-transform ${
              isMobile ? "w-5 h-5" : "w-6 h-6"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
