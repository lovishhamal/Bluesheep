"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  WifiIcon,
  BuildingOfficeIcon,
  ViewfinderCircleIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  getImagesFromFolder,
  StorageImage,
  getReviews,
  Review,
} from "./util/storage";
import { getWhatsAppUrl, getTelUrl, PHONE_NUMBER } from "./util/constants";

// Type definitions

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [hotelGalleryImages, setHotelGalleryImages] = useState<StorageImage[]>(
    []
  );
  const [isLoadingHotelGallery, setIsLoadingHotelGallery] = useState(true);
  const [hotelGalleryError, setHotelGalleryError] = useState<string | null>(
    null
  );
  const [selectedHotelGalleryImage, setSelectedHotelGalleryImage] =
    useState<StorageImage | null>(null);
  const [isHotelGalleryModalOpen, setIsHotelGalleryModalOpen] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(
    new Set()
  );

  // Intersection Observer for feature cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureIndex = parseInt(
              entry.target.getAttribute("data-feature-index") || "0"
            );
            setVisibleFeatures((prev) => new Set([...prev, featureIndex]));
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
    router.push("/camping");
  };
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      src: "/phoksundo.jpg",
      alt: "Mountain View",
      title: "Mountain Views",
      description: "Stunning Himalayan mountain views from our hotel",
    },
    {
      src: "/hotel-room.jpg",
      alt: "Luxury Hotel Room",
      title: "Luxury Accommodation",
      description: "Comfortable rooms with modern amenities",
    },
    {
      src: "/dining-area.jpg",
      alt: "Hotel Restaurant",
      title: "Fine Dining Restaurant",
      description: "Authentic local cuisine and international dishes",
    },
  ]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImagesFromFolder("images", "banners");

        if (images.length > 0) {
          // Transform Supabase images to match our gallery format
          const transformedImages: GalleryImage[] = images.map(
            (image: StorageImage, index: number) => ({
              src: image.url,
              alt: image.alt,
              title: getImageTitle(image.name, index),
              description: getImageDescription(image.name, index),
            })
          );
          setGalleryImages(transformedImages);
        }
      } catch (error) {
        console.error("Error fetching images from Supabase:", error);
        // Keep fallback images if Supabase fails
      }
    };

    fetchImages();
  }, []);

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        setReviewsError(null);
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewsError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  // Fetch hotel gallery images from Supabase
  useEffect(() => {
    const fetchHotelGalleryImages = async () => {
      try {
        setIsLoadingHotelGallery(true);
        setHotelGalleryError(null);
        const images = await getImagesFromFolder("images", "gallery");
        setHotelGalleryImages(images);
      } catch (error) {
        console.error("Error fetching hotel gallery images:", error);
        setHotelGalleryError(
          "Failed to load gallery images. Please try again later."
        );
      } finally {
        setIsLoadingHotelGallery(false);
      }
    };

    fetchHotelGalleryImages();
  }, []);

  // Hotel gallery modal functions
  const openHotelGalleryModal = (image: StorageImage) => {
    setSelectedHotelGalleryImage(image);
    setIsHotelGalleryModalOpen(true);
  };

  const closeHotelGalleryModal = () => {
    setIsHotelGalleryModalOpen(false);
    setSelectedHotelGalleryImage(null);
  };

  const navigateToNextHotelGalleryImage = () => {
    if (!selectedHotelGalleryImage) return;
    const currentIndex = hotelGalleryImages.findIndex(
      (img) => img.name === selectedHotelGalleryImage.name
    );
    const nextIndex = (currentIndex + 1) % hotelGalleryImages.length;
    setSelectedHotelGalleryImage(hotelGalleryImages[nextIndex]);
  };

  const navigateToPreviousHotelGalleryImage = () => {
    if (!selectedHotelGalleryImage) return;
    const currentIndex = hotelGalleryImages.findIndex(
      (img) => img.name === selectedHotelGalleryImage.name
    );
    const prevIndex =
      currentIndex === 0 ? hotelGalleryImages.length - 1 : currentIndex - 1;
    setSelectedHotelGalleryImage(hotelGalleryImages[prevIndex]);
  };

  // Helper functions to generate titles and descriptions based on image names
  const getImageTitle = (fileName: string, index: number) => {
    const titles = [
      "Mountain Views",
      "Luxury Accommodation",
      "Fine Dining Restaurant",
      "Mountain Adventure",
      "Scenic Landscapes",
      "Hotel Amenities",
    ];
    return titles[index] || titles[0];
  };

  const getImageDescription = (fileName: string, index: number) => {
    const descriptions = [
      "Crystal clear alpine lake just minutes away",
      "Comfortable rooms with modern amenities",
      "Authentic local cuisine and international dishes",
      "Experience the beauty of the mountains",
      "Breathtaking natural scenery",
      "World-class facilities and services",
    ];
    return descriptions[index] || descriptions[0];
  };

  // Auto-advance gallery
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [galleryImages.length, isAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Hotel gallery modal keyboard navigation
  useEffect(() => {
    const handleHotelGalleryKeyDown = (e: KeyboardEvent) => {
      if (!isHotelGalleryModalOpen) return;

      if (e.key === "Escape") {
        closeHotelGalleryModal();
      } else if (e.key === "ArrowRight") {
        navigateToNextHotelGalleryImage();
      } else if (e.key === "ArrowLeft") {
        navigateToPreviousHotelGalleryImage();
      }
    };

    document.addEventListener("keydown", handleHotelGalleryKeyDown);
    return () =>
      document.removeEventListener("keydown", handleHotelGalleryKeyDown);
  }, [isHotelGalleryModalOpen, selectedHotelGalleryImage, hotelGalleryImages]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - With Green Gradient */}
      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img
                src="/logo.jpg"
                alt="Hotel Blue Sheep Inn Logo"
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
                href="/rooms"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/attractions"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Attractions
              </Link>
              <Link
                href="/contact"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
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

          {/* Mobile menu */}
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
                  href="/rooms"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/contact"
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

      {/* Hero Section - Creative & Dynamic */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large animated gradient orbs */}
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
            className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-emerald-200/20 rounded-full blur-3xl"
          />
        </div>

        {/* Geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-32 w-32 h-32 border-2 border-emerald-300/20 rounded-lg"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 left-32 w-24 h-24 border-2 border-blue-300/20 rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200/50 shadow-sm"
              >
                <span className="text-emerald-600 font-semibold text-sm">
                  🏔️ Luxury in the Himalayas
                </span>
              </motion.div>

              {/* Main Title with Creative Typography */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  <span className="block bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                    Hotel Blue
                  </span>
                  <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Sheep Inn
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-700 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Experience luxury in the heart of Dolpa, Nepal. Your gateway
                  to the majestic Himalayas.
                </motion.p>
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="grid grid-cols-3 gap-4 pt-4"
              >
                {[
                  { label: "Rooms", value: "20+" },
                  { label: "Guests", value: "500+" },
                  { label: "Rating", value: "4.8★" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-gray-600"
              >
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50">
                  <PhoneIcon className="w-5 h-5 text-emerald-600" />
                  <a
                    href={getTelUrl()}
                    className="hover:text-gray-900 transition-colors font-medium"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50">
                  <MapPinIcon className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">Dunai, Dolpa</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.button
                  onClick={() => router.push("/rooms")}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Book Now</span>
                  <span className="text-xl">→</span>
                </motion.button>
                <motion.button
                  onClick={openCampingPage}
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:border-emerald-400 hover:bg-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Camping</span>
                  <span>🏕️</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Main Image Container */}
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/phoksundo.jpg"
                      alt="Hotel Blue Sheep Inn - Dolpa Nepal"
                      className="w-full h-[500px] object-cover"
                      style={{
                        WebkitTransform: "translateZ(0)",
                        transform: "translateZ(0)",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -right-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 shadow-xl border-2 border-white z-20"
                >
                  <div className="text-white">
                    <div className="text-2xl font-bold">4.8★</div>
                    <div className="text-xs opacity-90">Guest Rating</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 shadow-xl border-2 border-white z-20"
                >
                  <div className="text-white">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-xs opacity-90">Happy Guests</div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 rounded-2xl blur-2xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-400 text-sm">Scroll</span>
            <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-emerald-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Ultra Creative */}
      <section className="py-32 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50 relative overflow-hidden">
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
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Creative Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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

          {/* Creative Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${feature.gradient} rounded-2xl p-8 border border-gray-200/50 hover:border-emerald-300/50 transition-all duration-500 h-full overflow-hidden`}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                  </div>

                  {/* Icon Container with Gradient */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl relative z-10">
                      {feature.icon}
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
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

      {/* Gallery Section - Ultra Creative */}
      <section className="py-32 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/15 to-blue-200/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/15 to-emerald-200/15 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200/50"
            >
              <span className="text-2xl">📸</span>
              <span className="text-emerald-700 font-semibold">
                Visual Journey
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Hotel Gallery
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Discover the beauty of our hotel, stunning mountain views, and
              world-class facilities through our visual collection
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingHotelGallery && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900"></div>
              <p className="text-gray-600 mt-4 text-lg">Loading gallery...</p>
            </div>
          )}

          {/* Error State */}
          {hotelGalleryError && (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-900 text-lg">{hotelGalleryError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Creative Masonry Gallery Layout */}
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length > 0 && (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {hotelGalleryImages.map((image, index) => (
                  <motion.div
                    key={image.name}
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -5 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="break-inside-avoid mb-4 md:mb-6 group cursor-pointer relative"
                    onClick={() => openHotelGalleryModal(image)}
                  >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200/50 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110"
                          style={{
                            WebkitTransform: "translateZ(0)",
                            transform: "translateZ(0)",
                            WebkitBackfaceVisibility: "hidden",
                            backfaceVisibility: "hidden",
                            imageRendering: "auto",
                          }}
                        />
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="text-white"
                            >
                              <h3 className="font-bold text-lg mb-1 capitalize">
                                {image.alt}
                              </h3>
                              <p className="text-sm text-emerald-200">
                                Click to view larger
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Corner Badge */}
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm">👁️</span>
                      </div>

                      {/* Animated Border Glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-400/50 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10"></div>
                    </div>

                    {/* Floating Shadow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20"></div>
                  </motion.div>
                ))}
              </div>
            )}

          {/* No Images State */}
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-lg shadow-sm p-8 border border-gray-200 max-w-md mx-auto">
                  <p className="text-gray-900 text-lg">
                    No gallery images available at the moment.
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Please check back later for more photos.
                  </p>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Discover Dolpa's Wonders Section - Ultra Creative */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/25 to-blue-200/25 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -80, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/25 to-emerald-200/25 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-100 via-blue-100 to-emerald-100 rounded-full border border-emerald-200/50 shadow-lg"
            >
              <span className="text-3xl animate-bounce">🏔️</span>
              <span className="text-emerald-700 font-bold">
                Natural Wonders
              </span>
              <span
                className="text-3xl animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ✨
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Discover Dolpa&apos;s Natural Wonders
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Experience the breathtaking beauty of Phoksundo Lake and Dho Tarap
              - the highest village in Nepal
            </p>
          </motion.div>

          {/* Phoksundo Lake - Ultra Creative Design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Side with Creative Effects */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-emerald-500/30 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img
                    src="/phoksundo.jpg"
                    alt="Phoksundo Lake Dolpa Nepal - Crystal Clear Alpine Lake at 3611m elevation - Best attraction in Dolpa"
                    className="w-full h-[450px] object-cover relative z-0 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      WebkitTransform: "translateZ(0)",
                      transform: "translateZ(0)",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  />
                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-6 right-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl p-3 shadow-xl border-2 border-white z-20"
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">3,611m</div>
                      <div className="text-xs opacity-90">Elevation</div>
                    </div>
                  </motion.div>
                </motion.div>
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 rounded-2xl p-10 border border-gray-200/50 shadow-xl relative overflow-hidden"
              >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-tr-full"></div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full border border-blue-200/50"
                  >
                    <span className="text-emerald-700 font-semibold text-sm">
                      🏞️ Alpine Lake
                    </span>
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                      Phoksundo Lake
                    </span>
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    One of Nepal&apos;s most stunning high-altitude lakes at
                    3,611m, renowned for its crystal-clear turquoise waters that
                    reflect the surrounding snow-capped peaks. A sacred
                    destination in the heart of Dolpa.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-4 border border-gray-200/50 shadow-sm"
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-2">
                        Elevation
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                        3,611m
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-4 border border-gray-200/50 shadow-sm"
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-2">
                        Type
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        Freshwater
                      </div>
                    </motion.div>
                  </div>
                  <Link
                    href="/attractions"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl shadow-emerald-500/40 hover:scale-105"
                  >
                    <span>Explore Phoksundo</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Dho Tarap - Ultra Creative Design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-2 md:order-1 bg-gradient-to-br from-white via-emerald-50/30 to-purple-50/30 rounded-2xl p-10 border border-gray-200/50 shadow-xl relative overflow-hidden"
              >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-200/20 to-transparent rounded-tl-full"></div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-100 to-purple-100 rounded-full border border-emerald-200/50"
                  >
                    <span className="text-emerald-700 font-semibold text-sm">
                      🏘️ Highest Village
                    </span>
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                      Dho Tarap
                    </span>
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                    The highest permanently inhabited village in Nepal at
                    4,200m, offering a unique glimpse into traditional Tibetan
                    Buddhist culture and stunning high-altitude landscapes
                    preserved for centuries.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-emerald-50 to-purple-50 rounded-xl p-4 border border-gray-200/50 shadow-sm"
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-2">
                        Elevation
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                        4,200m
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-purple-50 to-emerald-50 rounded-xl p-4 border border-gray-200/50 shadow-sm"
                    >
                      <div className="text-xs font-semibold text-gray-600 mb-2">
                        Culture
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                        Tibetan
                      </div>
                    </motion.div>
                  </div>
                  <Link
                    href="/attractions"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl shadow-emerald-500/40 hover:scale-105"
                  >
                    <span>Discover Dho Tarap</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>

              {/* Image Side with Creative Effects */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group order-1 md:order-2"
              >
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-purple-500/30 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img
                    src="/dho.jpg"
                    alt="Dho Tarap - Highest Village in Nepal at 4200m elevation - Traditional Tibetan Buddhist culture"
                    className="w-full h-[450px] object-cover relative z-0 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      WebkitTransform: "translateZ(0)",
                      transform: "translateZ(0)",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  />
                  {/* Floating Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-6 left-6 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-xl p-3 shadow-xl border-2 border-white z-20"
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">4,200m</div>
                      <div className="text-xs opacity-90">Highest Village</div>
                    </div>
                  </motion.div>
                </motion.div>
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section - Ultra Creative */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="relative text-center overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-3xl"></div>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
            />

            <div className="relative z-10 p-12 md:p-16 border-2 border-emerald-200/50 rounded-3xl shadow-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <span className="text-5xl">🌟</span>
              </motion.div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                  Ready to Explore Dolpa?
                </span>
              </h3>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-light">
                Plan your adventure to Phoksundo Lake and Dho Tarap from the
                comfort of Hotel Blue Sheep Inn
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/attractions"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl shadow-emerald-500/40 text-lg"
                  >
                    <span>Explore All Attractions</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/rooms"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-emerald-400 hover:bg-white transition-all duration-300 shadow-lg text-lg"
                  >
                    <span>Book Your Stay</span>
                    <span className="text-xl">🏨</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
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
                    const whatsappUrl = getWhatsAppUrl(message);
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
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"
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
              <span className="text-3xl animate-pulse" style={{ animationDelay: "0.2s" }}>⭐</span>
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-emerald-100/40 rounded-full blur-3xl"></div>

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
                href={getTelUrl()}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {PHONE_NUMBER}
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
                  const whatsappUrl = getWhatsAppUrl(message);
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

      {/* Footer - Clean & Minimal */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Hotel Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-10 w-10 rounded-full mr-3"
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
                <h3 className="text-xl font-bold text-gray-900">
                  Hotel Blue Sheep Inn
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Experience luxury in the heart of Dolpa, Nepal. Your gateway to
                the Himalayas.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <a
                  href={getTelUrl()}
                  className="text-sm font-medium hover:text-gray-900 transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-base font-semibold mb-4 text-gray-900">
                Quick Links
              </h4>
              <div className="space-y-2">
                <Link
                  href="/rooms"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Rooms & Suites
                </Link>
                <Link
                  href="/menu"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Restaurant Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Garden Camping
                </Link>
                <Link
                  href="/attractions"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Attractions
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="text-center md:text-right">
              <h4 className="text-base font-semibold mb-4 text-gray-900">
                Location
              </h4>
              <div className="text-gray-600 space-y-1 text-sm">
                <p>Dunai, Dolpa</p>
                <p>Karnali Province</p>
                <p>Nepal</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Hotel Blue Sheep Inn. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Hotel Gallery Modal */}
      {isHotelGalleryModalOpen && selectedHotelGalleryImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeHotelGalleryModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {hotelGalleryImages.length > 1 && (
              <>
                <button
                  onClick={navigateToPreviousHotelGalleryImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateToNextHotelGalleryImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
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
                  WebkitTransform: "translateZ(0)",
                  transform: "translateZ(0)",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  imageRendering: "auto",
                }}
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-4">
              <h3 className="text-white font-semibold text-xl font-montserrat capitalize mb-2">
                {selectedHotelGalleryImage.alt}
              </h3>
              {hotelGalleryImages.length > 1 && (
                <p className="text-gray-300 text-sm">
                  {hotelGalleryImages.findIndex(
                    (img) => img.name === selectedHotelGalleryImage.name
                  ) + 1}{" "}
                  of {hotelGalleryImages.length}
                </p>
              )}
            </div>

            {/* Keyboard Instructions */}
            <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-3 text-white text-sm">
              <p>Use ← → arrow keys to navigate</p>
              <p>Press ESC to close</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
