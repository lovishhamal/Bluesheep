"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StorageImage } from "../util/storage";
import { getWhatsAppUrl } from "../util/constants";
import { useIsMobile } from "../util/useIsMobile";

interface CampingPageProps {
  initialCampingImages: StorageImage[];
}

export default function CampingPageClient({ initialCampingImages }: CampingPageProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    numberOfPeople: "",
    arrivalDate: "",
    specialRequests: "",
  });
  const [campingImages] = useState<StorageImage[]>(initialCampingImages);
  const [isLoadingImages] = useState(false);
  const [imageError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<StorageImage | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);


  // Prevent body scroll when modal is open (iOS fix)
  useEffect(() => {
    if (isBookingModalOpen || isImageModalOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore scroll position
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isBookingModalOpen, isImageModalOpen]);

  // Handle image modal functions
  const openImageModal = (image: StorageImage) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const navigateToNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = campingImages.findIndex(
      (img) => img.name === selectedImage.name
    );
    const nextIndex = (currentIndex + 1) % campingImages.length;
    setSelectedImage(campingImages[nextIndex]);
  };

  const navigateToPreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = campingImages.findIndex(
      (img) => img.name === selectedImage.name
    );
    const prevIndex =
      currentIndex === 0 ? campingImages.length - 1 : currentIndex - 1;
    setSelectedImage(campingImages[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImageModalOpen) return;

      if (e.key === "Escape") {
        closeImageModal();
      } else if (e.key === "ArrowRight") {
        navigateToNextImage();
      } else if (e.key === "ArrowLeft") {
        navigateToPreviousImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isImageModalOpen, selectedImage, campingImages, navigateToNextImage, navigateToPreviousImage]);

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!bookingForm.name.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!bookingForm.numberOfPeople.trim()) {
      alert("Please enter the number of people");
      return;
    }
    if (!bookingForm.arrivalDate.trim()) {
      alert("Please select an arrival date");
      return;
    }

    const message = `🏕️ *Hotel Blue Sheep Inn - Camping Booking Request*

*Camping Details:*
• Type: Garden Camping
• Number of Guests: ${bookingForm.numberOfPeople}
• Arrival Date: ${bookingForm.arrivalDate}

*Customer Information:*
• Name: ${bookingForm.name}

${
  bookingForm.specialRequests
    ? `*Special Requests:*\n${bookingForm.specialRequests}`
    : ""
}

Please confirm this booking.`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");

    // Close modal and reset form
    setIsBookingModalOpen(false);
    setBookingForm({
      name: "",
      numberOfPeople: "",
      arrivalDate: "",
      specialRequests: "",
    });
  };

  // Close booking modal
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingForm({
      name: "",
      numberOfPeople: "",
      arrivalDate: "",
      specialRequests: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      {/* Navigation - With Green Gradient */}
      <nav className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 border-b border-emerald-700/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Hotel Blue Sheep Inn Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto rounded-lg shadow-md cursor-pointer"
                />
              </Link>
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
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium border-b-2 border-emerald-50"
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
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
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
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Attractions
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header Section - Creative Design */}
      <section className="relative pt-2 pb-4 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
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
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex mt-6 items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-sm font-semibold mb-8 sm:mb-3 shadow-lg"
            >
              <span>🏕️</span>
              <span>Garden Camping Experience</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Garden Camping
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed mb-4">
              Experience nature in our beautiful garden setting with stunning
              mountain views
            </p>
            <p className="text-lg md:text-xl text-emerald-700 font-medium">
              📍 Dunai, Dolpa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Creative Design */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Camping Gallery
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Discover our beautiful garden camping experience through these
              stunning photos
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingImages && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              <p className="text-gray-600 mt-4 text-lg">
                Loading camping images...
              </p>
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 text-lg">{imageError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Masonry Layout */}
          {!isLoadingImages && !imageError && campingImages.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {campingImages.map((image, index) => (
                <motion.div
                  key={image.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={index === 0 ? { opacity: 1, y: 0 } : undefined}
                  whileInView={index > 0 ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={index > 0 ? { once: true } : undefined}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/20 group">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg capitalize mb-1">
                          {image.alt}
                        </h3>
                        <p className="text-emerald-300 text-sm font-medium">
                          Click to view larger
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Images State */}
          {!isLoadingImages && !imageError && campingImages.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">
                  No camping images available at the moment.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Please check back later or contact us for more information.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Creative Design */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Why Choose Our Garden Camping?
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
              Experience the perfect blend of nature and comfort in our
              beautiful garden setting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🌲",
                title: "Natural Garden Setting",
                description:
                  "Camp surrounded by beautiful trees and natural garden landscape with stunning mountain views",
                gradient: "from-emerald-50 to-blue-50",
                iconBg: "from-emerald-500 to-blue-500",
              },
              {
                icon: "🏕️",
                title: "Tent Camping",
                description:
                  "Bring your own tent or rent one of our quality camping tents for a comfortable experience",
                gradient: "from-blue-50 to-emerald-50",
                iconBg: "from-blue-500 to-emerald-500",
              },
              {
                icon: "🌙",
                title: "Peaceful Nights",
                description:
                  "Enjoy quiet nights under the stars in our serene garden environment away from city noise",
                gradient: "from-purple-50 to-emerald-50",
                iconBg: "from-purple-500 to-emerald-500",
              },
              {
                icon: "🚿",
                title: "Basic Facilities",
                description:
                  "Access to clean restrooms and basic amenities for your comfort during your stay",
                gradient: "from-emerald-50 to-teal-50",
                iconBg: "from-emerald-500 to-teal-500",
              },
              {
                icon: "🍽️",
                title: "Restaurant Access",
                description:
                  "Enjoy meals at our garden restaurant just steps away from your tent",
                gradient: "from-orange-50 to-emerald-50",
                iconBg: "from-orange-500 to-emerald-500",
              },
              {
                icon: "📍",
                title: "Prime Location",
                description:
                  "Located in Dunai, Dolpa with easy access to trekking trails and mountain adventures",
                gradient: "from-emerald-50 to-blue-50",
                iconBg: "from-emerald-500 to-blue-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/20"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                ></div>

                {/* Icon Container with Gradient */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative w-20 h-20 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg border-2 border-white group-hover:shadow-xl`}
                >
                  {/* Animated Shine Effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
                  />
                  <span className="text-4xl relative z-10">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Creative Design */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 relative overflow-hidden">
        {/* Animated Background Orbs */}
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
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
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
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Experience Garden Camping?
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-emerald-100 mb-10 font-light">
              Book your camping spot in our beautiful garden and create
              unforgettable memories in nature
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  if (isMobile) {
                    router.push("/camping/booking");
                  } else {
                    setIsBookingModalOpen(true);
                  }
                }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-600 font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl text-lg sm:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine Effect */}
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
                <span className="relative z-10">📅 Book Camping</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to know more about your garden camping facilities.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/20 text-lg sm:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">📱 Contact Us</span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 text-2xl"
                >
                  📱
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal - Creative Design - Desktop Only */}
      {!isMobile && isBookingModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overscroll-contain"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            maxHeight: "100vh",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            paddingTop: "env(safe-area-inset-top, 0)",
            paddingBottom: "env(safe-area-inset-bottom, 0)",
            paddingLeft: "env(safe-area-inset-left, 0)",
            paddingRight: "env(safe-area-inset-right, 0)",
          }}
          onClick={closeBookingModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border-4 border-emerald-500 shadow-2xl w-full max-w-md my-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
            style={{
              maxHeight: "min(85vh, calc(100vh - 2rem))",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              position: "relative",
              margin: "auto",
              paddingBottom: "env(safe-area-inset-bottom, 1rem)",
            }}
          >
            {/* Header with Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 rounded-t-3xl"></div>

            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  🏕️
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Book Camping
                </h2>
              </div>
              <button
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Booking Notice */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-amber-900 font-semibold mb-1 text-xs sm:text-sm">
                    Important Notice
                  </h4>
                  <p className="text-amber-800 text-xs sm:text-sm">
                    Bookings must be made at least 1 day in advance. This will
                    open WhatsApp with your booking details.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form
              onSubmit={handleBookingSubmit}
              className="space-y-4 sm:space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={bookingForm.numberOfPeople}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      numberOfPeople: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="How many people?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Arrival Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={bookingForm.arrivalDate}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      arrivalDate: e.target.value,
                    })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={bookingForm.specialRequests}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      specialRequests: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none transition-all"
                  placeholder="Any special requests or notes..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105"
                >
                  Send to WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Image Modal - Creative Design */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors border-2 border-white/20"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {campingImages.length > 1 && (
              <>
                <button
                  onClick={navigateToPreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors border-2 border-white/20"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors border-2 border-white/20"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-bold text-xl capitalize mb-2">
                {selectedImage.alt}
              </h3>
              {campingImages.length > 1 && (
                <p className="text-gray-300 text-sm">
                  {campingImages.findIndex(
                    (img) => img.name === selectedImage.name
                  ) + 1}{" "}
                  of {campingImages.length}
                </p>
              )}
            </div>

            {/* Keyboard Instructions */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-3 text-white text-sm border border-white/20">
              <p>Use ← → arrow keys to navigate</p>
              <p>Press ESC to close</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
