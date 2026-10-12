"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StorageImage, Review } from "../util/storage";
import { getWhatsAppUrl, getTelUrl, PHONE_NUMBER } from "../util/constants";
import { useIsMobile } from "../util/useIsMobile";
import { useAppDetail } from "./AppDetailProvider";
import HowToReach from "./HowToReach";
import { GalleryImage } from "./CreativeImageCarousel";
import HeroCarousel from "./HeroCarousel";

interface HomeClientProps {
  initialGalleryImages: GalleryImage[];
  initialReviews: Review[];
  initialHotelGalleryImages: StorageImage[];
}

export default function HomeClient({
  initialGalleryImages,
  initialReviews,
  initialHotelGalleryImages,
}: HomeClientProps) {
  const appDetail = useAppDetail();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviews] = useState<Review[]>(initialReviews);
  const [isLoadingReviews] = useState(false);
  const [reviewsError] = useState<string | null>(null);
  const [hotelGalleryImages] = useState<StorageImage[]>(
    initialHotelGalleryImages
  );
  const [isLoadingHotelGallery] = useState(false);
  const [hotelGalleryError] = useState<string | null>(null);
  const [selectedHotelGalleryImage, setSelectedHotelGalleryImage] =
    useState<StorageImage | null>(null);
  const [isHotelGalleryModalOpen, setIsHotelGalleryModalOpen] = useState(false);
  const [galleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [adminPhone, setAdminPhone] = useState(() => {
    const value =
      typeof appDetail.adminPhone === "string" ? appDetail.adminPhone.trim() : "";
    return value || PHONE_NUMBER;
  });

  useEffect(() => {
    const phoneValue =
      typeof appDetail.adminPhone === "string" ? appDetail.adminPhone.trim() : "";
    if (phoneValue) setAdminPhone(phoneValue);
  }, [appDetail.adminPhone]);

  // Intersection Observer for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureIndex = parseInt(
              entry.target.getAttribute("data-feature-index") || "0"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureCards = document.querySelectorAll("[data-feature-index]");
    featureCards.forEach((card) => observer.observe(card));

    return () => {
      featureCards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Navigate to camping page
  const openCampingPage = () => {
    router.push("/camping/");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Hotel gallery modal functions
  const openHotelGalleryModal = (image: StorageImage) => {
    setSelectedHotelGalleryImage(image);
    setIsHotelGalleryModalOpen(true);
    // Prevent body scroll on iOS
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
  };

  const closeHotelGalleryModal = () => {
    setIsHotelGalleryModalOpen(false);
    setSelectedHotelGalleryImage(null);
    // Restore body scroll on iOS
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  };

  const navigateToNextHotelGalleryImage = useCallback(() => {
    if (!selectedHotelGalleryImage) return;
    const currentIndex = hotelGalleryImages.findIndex(
      (img) => img.name === selectedHotelGalleryImage.name
    );
    const nextIndex = (currentIndex + 1) % hotelGalleryImages.length;
    setSelectedHotelGalleryImage(hotelGalleryImages[nextIndex]);
  }, [selectedHotelGalleryImage, hotelGalleryImages]);

  const navigateToPreviousHotelGalleryImage = useCallback(() => {
    if (!selectedHotelGalleryImage) return;
    const currentIndex = hotelGalleryImages.findIndex(
      (img) => img.name === selectedHotelGalleryImage.name
    );
    const prevIndex =
      (currentIndex - 1 + hotelGalleryImages.length) %
      hotelGalleryImages.length;
    setSelectedHotelGalleryImage(hotelGalleryImages[prevIndex]);
  }, [selectedHotelGalleryImage, hotelGalleryImages]);

  // Keyboard navigation for hotel gallery modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHotelGalleryModalOpen) return;

      if (e.key === "ArrowRight") {
        navigateToNextHotelGalleryImage();
      } else if (e.key === "ArrowLeft") {
        navigateToPreviousHotelGalleryImage();
      } else if (e.key === "Escape") {
        closeHotelGalleryModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isHotelGalleryModalOpen,
    navigateToNextHotelGalleryImage,
    navigateToPreviousHotelGalleryImage,
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Skip Navigation Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <div className="sticky top-0 z-50">
        <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto rounded-lg shadow-md"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>
              <div className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-white font-medium transition-colors duration-200 hover:text-emerald-100"
                >
                  Home
                </Link>
                <Link
                  href="/rooms/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Rooms
                </Link>
                <Link
                  href="/menu/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Menu
                </Link>
                <Link
                  href="/camping/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Camping
                </Link>
                <Link
                  href="/attractions/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Attractions
                </Link>
                <Link
                  href="/events/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Events
                </Link>
                <Link
                  href="/travel-guide/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Travel Guide
                </Link>
                <Link
                  href="/contact/"
                  className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                >
                  Contact
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
                  <Link
                    href="/rooms/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Rooms
                  </Link>
                  <Link
                    href="/menu/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Menu
                  </Link>
                  <Link
                    href="/camping/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Camping
                  </Link>
                  <Link
                    href="/attractions/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Attractions
                  </Link>
                  <Link
                    href="/events/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Events
                  </Link>
                  <Link
                    href="/travel-guide/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Travel Guide
                  </Link>
                  <Link
                    href="/contact/"
                    className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </nav>
      </div>

      <section
        id="main-content"
        className="relative min-h-[550px] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden pt-6 lg:pt-0 lg:-mt-3 pb-8 lg:pb-12"
        style={{ minHeight: isMobile ? "100vh" : undefined }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large animated gradient orbs - Simplified for performance */}
          {!isMobile && (
            <>
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-2xl"
              />
            </>
          )}
        </div>

        {/* Geometric shapes - Static for better performance */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-32 w-32 h-32 border-2 border-emerald-300/20 rounded-lg opacity-30" />
            <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-blue-300/20 rounded-full opacity-30" />
          </div>
        )}

        <div className="relative z-10 w-screen mx-auto px-4 sm:px-6 lg:px-24">
          <div
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center min-h-[70vh] py-8 sm:py-8 md:py-4 lg:py-0"
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              minHeight: isMobile ? "calc(100vh - 140px)" : undefined,
            }}
          >
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left space-y-4 sm:space-y-5 w-full"
            >
              {/* Badge - Compact */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200/50 shadow-sm"
              >
                <span className="text-emerald-600 font-medium text-xs sm:text-sm">
                  🏔️ Gateway to Shey Phoksundo & Dolpa Himalayas
                </span>
              </motion.div>

              {/* Main Title - More Compact and Elegant */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-center"
              >
                <span className="block bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent text-center">
                  Hotel Blue Sheep Inn
                </span>
              </motion.h1>

              <div className="max-w-2xl mx-auto lg:mx-0">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed"
                >
                  <span className="font-semibold text-gray-900">
                    Experience luxury
                  </span>{" "}
                  in the heart of{" "}
                  <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                    Dolpa, Nepal
                  </span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-1.5 text-sm sm:text-base md:text-lg text-gray-600 font-medium"
                >
                  Premier hotel in Dunai &amp; basecamp for{" "}
                  <span className="text-gray-900 font-semibold">
                    trekking to Phoksundo Lake
                  </span>
                </motion.p>
              </div>

              {/* Contact Info - Enhanced Button Style for Mobile - Hidden on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="hidden sm:flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start justify-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-3 lg:mb-4 w-full sm:w-auto"
              >
                {/* Phone Button - Full Width on Mobile */}
                <motion.a
                  href={getTelUrl(adminPhone)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold px-4 py-2.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-lg border-0 sm:border sm:bg-gradient-to-r sm:from-emerald-50 sm:to-blue-50 sm:text-gray-600 sm:border-emerald-200/50 sm:shadow-sm md:bg-white/80 md:border-gray-200/50 transition-all duration-300 shadow-md sm:shadow-sm hover:shadow-lg sm:hover:shadow-md"
                >
                  <div className="p-1 bg-white/20 rounded-md flex-shrink-0 sm:hidden">
                    <PhoneIcon className="w-4 h-4 text-white" />
                  </div>
                  <PhoneIcon className="w-5 h-5 text-emerald-600 hidden sm:block flex-shrink-0" />
                  <span className="text-sm sm:text-sm md:text-base font-semibold sm:font-medium">
                    {adminPhone}
                  </span>
                </motion.a>

                {/* Location Button - Full Width on Mobile */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-4 py-2.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-lg border-0 sm:border sm:bg-gradient-to-r sm:from-blue-50 sm:to-emerald-50 sm:text-gray-600 sm:border-blue-200/50 sm:shadow-sm md:bg-white/80 md:border-gray-200/50 transition-all duration-300 shadow-md sm:shadow-sm hover:shadow-lg sm:hover:shadow-md cursor-pointer"
                >
                  <div className="p-1 bg-white/20 rounded-md flex-shrink-0 sm:hidden">
                    <MapPinIcon className="w-4 h-4 text-white" />
                  </div>
                  <MapPinIcon className="w-5 h-5 text-emerald-600 hidden sm:block flex-shrink-0" />
                  <span className="text-sm sm:text-sm md:text-base font-semibold sm:font-medium">
                    Dunai, Dolpa
                  </span>
                </motion.div>
              </motion.div>

              {/* Action Buttons - Ultra Creative Design - Optimized for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start justify-center gap-3 sm:gap-4 md:gap-5 pt-2 sm:pt-2 lg:pt-3 w-full"
              >
                {/* Book Now Button - Primary with Creative Effects */}
                <motion.button
                  onClick={() => router.push("/rooms")}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white font-bold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl shadow-emerald-500/50 text-base sm:text-lg md:text-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated Background Shine */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                  {/* Content */}
                  <span className="relative z-10">Book Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10 text-2xl"
                  >
                    →
                  </motion.span>

                  {/* Decorative Dots */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                </motion.button>

                {/* Explore Camping Button - Secondary with Creative Design */}
                <motion.button
                  onClick={openCampingPage}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 text-gray-900 font-bold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:border-emerald-400 text-base sm:text-lg md:text-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/50 to-emerald-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Content */}
                  <span className="relative z-10">Explore Camping</span>
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 text-2xl"
                  >
                    🏕️
                  </motion.span>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-bl-2xl"></div>
                </motion.button>

                {/* Find Us Button - Secondary with Creative Design */}
                <motion.button
                  onClick={() => {
                    const mapSection = document.getElementById("map-section");
                    if (mapSection) {
                      const navbar = document.querySelector("nav");
                      const navbarHeight = navbar ? navbar.offsetHeight : 80;
                      const elementPosition =
                        mapSection.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition +
                        window.pageYOffset -
                        navbarHeight -
                        20;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 py-3.5 sm:px-10 sm:py-5 bg-white/95 backdrop-blur-sm border-2 border-emerald-300/50 text-gray-900 font-bold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:border-emerald-400 text-base sm:text-lg md:text-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/50 to-emerald-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Content */}
                  <span className="relative z-10">Find Us</span>
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10 text-lg sm:text-2xl"
                  >
                    📍
                  </motion.span>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-bl-2xl"></div>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-full min-h-[400px] lg:min-h-[500px] lg:ml-8 xl:ml-12 mt-11 sm:mt-0"
            >
              <HeroCarousel
                images={galleryImages}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
                nextImage={nextImage}
                prevImage={prevImage}
                isAutoPlay={isAutoPlay}
                setIsAutoPlay={setIsAutoPlay}
                isMobile={isMobile}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Routes Section - How to Reach Hotel Blue Sheep Inn */}
      <HowToReach />

      {/* Features Section - Ultra Creative */}
      <section className="py-0 md:py-14 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Creative Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="text-6xl">✨</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Why Choose Hotel Blue Sheep Inn?
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Experience the perfect blend of luxury, nature, and authentic
              Nepalese hospitality
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Creative Grid Layout - 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: "🏔️",
                title: "Prime Location",
                description:
                  "Located in the heart of Dunai with stunning mountain views and surrounded by the majestic Himalayas",
                gradient: "from-blue-50 via-emerald-50 to-blue-50",
                iconBg: "from-blue-500 to-emerald-500",
                delay: 0.1,
              },
              {
                icon: "🏨",
                title: "Luxury Accommodation",
                description:
                  "Comfortable rooms with modern amenities and breathtaking mountain views",
                gradient: "from-emerald-50 via-blue-50 to-emerald-50",
                iconBg: "from-emerald-500 to-blue-500",
                delay: 0.2,
              },
              {
                icon: "🍽️",
                title: "Garden Restaurant",
                description:
                  "Authentic local cuisine and international dishes in our beautiful garden setting",
                gradient: "from-blue-50 via-purple-50 to-blue-50",
                iconBg: "from-blue-500 to-purple-500",
                delay: 0.3,
              },
              {
                icon: "🏕️",
                title: "Camping Facilities",
                description:
                  "Experience nature with our premium camping facilities in the hotel garden",
                gradient: "from-emerald-50 via-teal-50 to-emerald-50",
                iconBg: "from-emerald-500 to-teal-500",
                delay: 0.4,
              },
              {
                icon: "🚁",
                title: "Easy Access",
                description:
                  "Only 30 minutes drive from Dolpa Airport with convenient transportation",
                gradient: "from-blue-50 via-cyan-50 to-blue-50",
                iconBg: "from-blue-500 to-cyan-500",
                delay: 0.5,
              },
              {
                icon: "🙏",
                title: "Cultural Heritage",
                description:
                  "Walking distance to local monasteries and authentic cultural experiences",
                gradient: "from-purple-50 via-blue-50 to-purple-50",
                iconBg: "from-purple-500 to-blue-500",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={index < 2 ? { opacity: 1, y: 0, scale: 1 } : undefined}
                whileInView={
                  index >= 2 ? { opacity: 1, y: 0, scale: 1 } : undefined
                }
                transition={{
                  duration: 0.6,
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={index >= 2 ? { once: true } : undefined}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-2xl p-4 md:p-8 border border-gray-200/50 hover:border-emerald-300/50 transition-all duration-500 h-full overflow-hidden`}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                  </div>

                  {/* Icon Container with Gradient */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative mb-3 md:mb-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl md:text-3xl relative z-10">
                      {feature.icon}
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-xl md:rounded-2xl blur-sm"></div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-base text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-tr-full"></div>
                </div>

                {/* Floating Shadow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Gallery Section - Masonry Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Hotel Gallery
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Explore our beautiful hotel facilities and stunning surroundings
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingHotelGallery && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              <p className="text-gray-600 mt-4 text-lg">
                Loading gallery images...
              </p>
            </div>
          )}

          {/* Error State */}
          {hotelGalleryError && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 text-lg">{hotelGalleryError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {hotelGalleryImages.map((image) => (
                  <div
                    key={image.name}
                    className="group cursor-pointer"
                    onClick={() => openHotelGalleryModal(image)}
                  >
                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/20 group">
                      <div className="relative w-full aspect-[4/3] bg-gray-100">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <p className="text-white text-sm font-medium">
                            Click to view larger
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* No Images State */}
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200 max-w-md mx-auto">
                  <p className="text-gray-600 text-lg">
                    No gallery images available at the moment.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Please check back later or contact us for more information.
                  </p>
                </div>
              </div>
            )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-white via-emerald-50/40 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-[520px] h-[520px] bg-gradient-to-br from-emerald-300/20 to-blue-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 25, 0], opacity: [0.18, 0.35, 0.18] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-28 -left-28 w-[560px] h-[560px] bg-gradient-to-br from-blue-300/18 to-emerald-300/18 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.08),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.06),transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-100 via-blue-100 to-emerald-100 rounded-full border border-emerald-200/50 shadow-lg">
              <span className="text-3xl">🏔️</span>
              <span className="text-emerald-700 font-bold">Shey Phoksundo & Dolpa Gateway</span>
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Explore Phoksundo & Dolpa&apos;s Wonders
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hotel Blue Sheep Inn is the official basecamp in Dunai for your Himalayan journey.
              From luxury rooms to trekking guides and permits, plan your trip to Nepal&apos;s deepest alpine lake.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Hotel in Phoksundo & Dunai */}
            <Link href="/hotel-in-phoksundo/" className="group block">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform">
                      🏨
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Basecamp Stay</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        Hotel in Phoksundo Gateway
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Deluxe rooms with attached baths, 24/7 hot showers, Wi-Fi, restaurant &amp; secure parking before and after your Phoksundo trek.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm pt-2 border-t border-emerald-100">
                  Explore Hotel Details
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            {/* Card 2: Trekking to Phoksundo */}
            <Link href="/trekking-to-phoksundo/" className="group block">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/60 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform">
                      🥾
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Complete Trek</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        Trekking to Phoksundo Lake
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Verified 7-day day-by-day route, trail distances, Shey Phoksundo National Park permits, Ringmo village, and packing guide.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm pt-2 border-t border-blue-100">
                  View Trekking Guide
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            {/* Card 3: Attractions & Lake Facts */}
            <Link href="/attractions/" className="group block">
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md group-hover:scale-110 transition-transform">
                      💎
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Sightseeing</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                        Dolpa &amp; Phoksundo Attractions
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Discover Nepal&apos;s deepest lake (3,611m), the 167m waterfall, 900-year-old Tshowa Bon Gompa, and Dho Tarap valley.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm pt-2 border-t border-teal-100">
                  Open Attractions
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        id="map-section"
        className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Find Us
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Dunai, Dolpa - your perfect base for
              mountain adventures
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm p-8 border border-gray-200"
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1234567890123!2d82.895524!3d28.9508116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDU3JzAyLjkiTiA4MsKwNTMnNDMuOSJF!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Blue Sheep Inn Location"
              ></iframe>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4 text-lg">
                Hotel Blue Sheep Inn, Dunai, Dolpa, Nepal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps?q=28.9508116,82.895524",
                      "_blank"
                    );
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Open in Google Maps
                </motion.button>
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about your hotel location and services.`;
                    const whatsappUrl = getWhatsAppUrl(message, adminPhone);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Ultra Creative */}
      <section className="py-32 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-2xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Creative Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-yellow-100 via-emerald-100 to-blue-100 rounded-full border border-yellow-200/50 shadow-lg"
            >
              <span className="text-3xl animate-pulse">⭐</span>
              <span className="text-emerald-700 font-bold">Guest Reviews</span>
              <span
                className="text-3xl animate-pulse"
                style={{ animationDelay: "0.2s" }}
              >
                ⭐
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                What Our Guests Say
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Real experiences from travelers who chose Hotel Blue Sheep Inn for
              their Dolpa adventure
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingReviews && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900"></div>
              <p className="text-gray-600 mt-4 text-lg">Loading reviews...</p>
            </div>
          )}

          {/* Error State */}
          {reviewsError && (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-900 text-lg">{reviewsError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Reviews Grid - Ultra Creative */}
          {!isLoadingReviews && !reviewsError && reviews.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02, rotate: 1 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30 rounded-2xl p-8 border-2 border-gray-200/50 hover:border-emerald-300/50 transition-all duration-500 h-full overflow-hidden shadow-lg hover:shadow-2xl">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-blue-100/20"></div>
                    </div>

                    {/* Quote Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="absolute top-4 right-4 text-6xl text-emerald-200/30 font-serif"
                    >
                      &ldquo;
                    </motion.div>

                    {/* Stars */}
                    <div className="relative z-10 flex items-center mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.15 + i * 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 15 }}
                        >
                          <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="relative z-10 text-gray-800 italic mb-8 text-base leading-relaxed font-light">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Author Info */}
                    <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-gray-200/50">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-2xl blur opacity-50"></div>
                      </motion.div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {review.name}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <span>🌍</span>
                          {review.country}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-200/10 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/10 to-transparent rounded-tr-full"></div>
                  </div>

                  {/* Floating Shadow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 via-yellow-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Reviews State */}
          {!isLoadingReviews && !reviewsError && reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 border border-gray-200 max-w-md mx-auto">
                <p className="text-gray-900 text-lg">
                  No reviews available at the moment.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Please check back later for customer reviews.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section - With Gradients */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decorative gradient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-blue-100/40 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-emerald-100/40 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Ready to Experience Dolpa?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your stay at Hotel Blue Sheep Inn and create unforgettable
              memories in the heart of the Himalayas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <MapPinIcon className="w-10 h-10 mx-auto mb-4 text-gray-900" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Location
              </h3>
              <p className="text-gray-600">
                Dunai, Dolpa
                <br />
                Karnali Province, Nepal
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <PhoneIcon className="w-10 h-10 mx-auto mb-4 text-gray-900" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Phone
              </h3>
              <a
                href={getTelUrl(adminPhone)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {adminPhone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <EnvelopeIcon className="w-10 h-10 mx-auto mb-4 text-gray-900" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Email
              </h3>
              <p className="text-gray-600">innbluesheep@gmail.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-900 text-xl">🏕️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Camping
              </h3>
              <p className="text-gray-600">Garden camping available</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room at Hotel Blue Sheep Inn.`;
                  const whatsappUrl = getWhatsAppUrl(message, adminPhone);
                  window.open(whatsappUrl, "_blank");
                }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book via WhatsApp
              </motion.button>
              <motion.button
                onClick={openCampingPage}
                className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Camping
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Ultra Creative */}
      <footer className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-2xl"
          />
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content - Simple & Clean */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-12">
            {/* Hotel Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Hotel Blue Sheep Inn Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl border-2 border-white/30 shadow-lg"
                    style={{
                      WebkitTransform: "translateZ(0)",
                      transform: "translateZ(0)",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white text-center">
                  Hotel Blue Sheep Inn
                </h3>
              </motion.div>
              <p className="text-emerald-50 mb-6 text-base leading-relaxed">
                Experience luxury in the heart of Dolpa, Nepal. Your gateway to
                the majestic Himalayas.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center justify-center md:justify-start gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <PhoneIcon className="w-5 h-5 text-emerald-200" />
                <a
                  href={getTelUrl(adminPhone)}
                  className="text-base font-semibold text-white hover:text-emerald-100 transition-colors"
                >
                  {adminPhone}
                </a>
              </motion.div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h4 className="text-xl font-bold mb-6 text-white flex items-center justify-center md:justify-start gap-2">
                <span>📍</span>
                Location
              </h4>
              <div className="space-y-3">
                {[
                  { text: "Dunai, Dolpa", icon: "🏘️" },
                  { text: "Karnali Province", icon: "🗺️" },
                  { text: "Nepal", icon: "🇳🇵" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center md:justify-start gap-3 text-emerald-50 text-base"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Ultra Creative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t-2 border-white/20 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-emerald-100 text-sm font-medium"
              >
                &copy; {new Date().getFullYear()} Hotel Blue Sheep Inn. All
                rights reserved.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Hotel Gallery Modal - iOS Compatible */}
      {isHotelGalleryModalOpen && selectedHotelGalleryImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            WebkitOverflowScrolling: 'touch',
            touchAction: 'none',
          }}
          onClick={closeHotelGalleryModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeHotelGalleryModal}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors shadow-lg"
              aria-label="Close gallery"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {hotelGalleryImages.length > 1 && (
              <>
                <button
                  onClick={navigateToPreviousHotelGalleryImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateToNextHotelGalleryImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedHotelGalleryImage.url}
                alt={selectedHotelGalleryImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  WebkitTransform: "translateZ(0)",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  imageRendering: "auto",
                }}
                loading="eager"
              />
            </div>



            {/* Keyboard Instructions - Hidden on Mobile */}
            <div className="hidden md:block absolute top-4 left-4 bg-black/70 rounded-lg p-3 text-white text-sm backdrop-blur-sm">
              <p>Use ← → arrow keys to navigate</p>
              <p>Press ESC to close</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
