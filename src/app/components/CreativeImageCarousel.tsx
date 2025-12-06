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
      className="pt-0 pb-10 lg:pb-16 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Hotel Name Background Text - Big Fading Transparent */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2
            className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black select-none"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creative Carousel Container */}
        <div className="relative">
          <div
            className="relative h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Carousel Items - 3D Rotating Effect */}
            {images.map((image, index) => {
              const position =
                (index - currentIndex + images.length) % images.length;
              const isActive = position === 0;
              const isNext = position === 1;
              const isPrev = position === images.length - 1;
              const isVisible = position <= 2 || position >= images.length - 2;

              if (!isVisible) return null;

              // Calculate 3D transform
              const isRight = position > 0 && position <= images.length / 2;
              const isLeft = position > images.length / 2;

              const offsetX = isActive
                ? 0
                : isRight
                ? isMobile
                  ? 80
                  : 120
                : isLeft
                ? isMobile
                  ? -80
                  : -120
                : 0;
              const offsetZ = isActive
                ? 0
                : -Math.abs(position) * (isMobile ? 100 : 150);
              const rotateY = isActive
                ? 0
                : isRight
                ? isMobile
                  ? -25
                  : -35
                : isLeft
                ? isMobile
                  ? 25
                  : 35
                : 0;
              const scale = isActive ? 1 : isNext || isPrev ? 0.75 : 0.5;
              const opacity = isActive ? 1 : isNext || isPrev ? 0.6 : 0.3;

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: offsetX,
                    z: offsetZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 50 : isNext || isPrev ? 40 : 30,
                  }}
                  className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl cursor-pointer"
                  onClick={() => !isActive && setCurrentIndex(index)}
                >
                  {/* Image Card */}
                  <motion.div
                    whileHover={isActive ? { scale: 1.05, y: -10 } : {}}
                    className="relative h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                  >
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content Overlay */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                        >
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                            {image.title}
                          </h3>
                          <p className="text-sm md:text-base lg:text-lg text-white/90">
                            {image.description}
                          </p>
                        </motion.div>
                      )}

                      {/* Shine Effect */}
                      {isActive && (
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
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                        />
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
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
    </section>
  );
}
