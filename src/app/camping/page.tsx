"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { getImagesFromFolder, StorageImage } from "../util/storage";
import { getWhatsAppUrl, PHONE_NUMBER } from "../util/constants";

export default function CampingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    numberOfPeople: "",
    arrivalDate: "",
  });
  const [campingImages, setCampingImages] = useState<StorageImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<StorageImage | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Fetch camping images from Supabase storage
  useEffect(() => {
    const fetchCampingImages = async () => {
      try {
        setIsLoadingImages(true);
        setImageError(null);
        const images = await getImagesFromFolder("images", "camping");
        setCampingImages(images);
      } catch (error) {
        console.error("Error fetching camping images:", error);
        setImageError("Failed to load camping images. Please try again later.");
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchCampingImages();
  }, []);

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
  }, [isImageModalOpen, selectedImage, campingImages]);

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

    const message = `Hi! I'm interested in booking a camping spot in your garden.

Booking Details:
- Name: ${bookingForm.name}
- Number of People: ${bookingForm.numberOfPeople}
- Arrival Date: ${bookingForm.arrivalDate}

Please let me know about availability and the booking process.`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");

    // Close modal and reset form
    setIsBookingModalOpen(false);
    setBookingForm({
      name: "",
      numberOfPeople: "",
      arrivalDate: "",
    });
  };

  // Close booking modal
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingForm({
      name: "",
      numberOfPeople: "",
      arrivalDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
      {/* Navigation */}
      <nav className="w-full bg-slate-900 border-b border-emerald-400/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-16 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/camping"
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
              >
                Camping
              </Link>
              <button
                onClick={() => {
                  const message = `Hi! I'd like to get in touch about your hotel services.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-800 border-t border-emerald-400/30"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <button
                  onClick={() => {
                    const message = `Hi! I'd like to get in touch about your hotel services.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section - New Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Camping Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl border-4 border-emerald-400">
                  🏕️
                </div>
                <div className="absolute -inset-1 bg-emerald-400 rounded-full blur opacity-30"></div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="block">Garden</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Camping
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-200 font-light max-w-3xl mx-auto">
                Experience nature in our beautiful garden setting
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-emerald-300">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌲</span>
                <span className="text-lg">Garden Setting</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-400/50"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏕️</span>
                <span className="text-lg">Tent Camping</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-400/50"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌙</span>
                <span className="text-lg">Night Experience</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 px-4">
              <motion.button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📅 Book Camping
              </motion.button>
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to know more about your garden camping facilities.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-semibold rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-emerald-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Gallery Section - New Design */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Camping Gallery
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover our beautiful garden camping experience through these
              stunning photos
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingImages && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
              <p className="text-slate-600 mt-4 text-lg">
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
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/20">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg capitalize">
                          {image.alt}
                        </h3>
                        <p className="text-emerald-300 text-sm mt-1">
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
              <div className="bg-slate-50 rounded-2xl shadow-lg p-8 border border-slate-200 max-w-md mx-auto">
                <p className="text-slate-600 text-lg">
                  No camping images available at the moment.
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Please check back later or contact us for more information.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - New Design */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Our Garden Camping?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the perfect blend of nature and comfort in our
              beautiful garden setting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🌲",
                title: "Natural Garden Setting",
                description:
                  "Camp surrounded by beautiful trees and natural garden landscape",
              },
              {
                icon: "🏕️",
                title: "Tent Camping",
                description:
                  "Bring your own tent or rent one of our quality camping tents",
              },
              {
                icon: "🌙",
                title: "Peaceful Nights",
                description:
                  "Enjoy quiet nights under the stars in our serene garden environment",
              },
              {
                icon: "🚿",
                title: "Basic Facilities",
                description:
                  "Access to clean restrooms and basic amenities for your comfort",
              },
              {
                icon: "🍽️",
                title: "Restaurant Access",
                description:
                  "Enjoy meals at our garden restaurant just steps away from your tent",
              },
              {
                icon: "📍",
                title: "Prime Location",
                description:
                  "Located in the heart of Dunai with easy access to trekking trails and mountain adventures",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - New Design */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-emerald-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Garden Camping?
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-emerald-100">
              Book your camping spot in our beautiful garden and create
              unforgettable memories in nature
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Book Now
              </h3>
              <p className="text-emerald-100">
                Reserve your camping spot in advance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Contact</h3>
              <p className="text-emerald-100">WhatsApp: {PHONE_NUMBER}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏕️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Camping</h3>
              <p className="text-emerald-100">Garden tent camping experience</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📅 Book Camping
              </motion.button>
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to know more about your garden camping facilities.`;
                  const whatsappUrl = getWhatsAppUrl(message);
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800 rounded-2xl p-8 border border-emerald-400/50 shadow-2xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white font-montserrat">
                Book Camping
              </h2>
              <button
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Booking Notice */}
            <div className="mb-6 p-4 bg-amber-500/20 border border-amber-400/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-amber-300 font-semibold mb-1">
                    Important Notice
                  </h4>
                  <p className="text-amber-200 text-sm">
                    Bookings must be made at least 1 day in advance. This will
                    open WhatsApp with your booking details.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
                  Full Name *
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
                  className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
                  Number of People *
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
                  className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                  placeholder="How many people?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
                  Arrival Date *
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
                  className="w-full md:w-full max-w-[320px] md:max-w-none px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="flex-1 px-6 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-400/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transform hover:scale-105"
                >
                  Send to WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {campingImages.length > 1 && (
              <>
                <button
                  onClick={navigateToPreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold text-xl font-montserrat capitalize mb-2">
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
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
              <p>Use ← → arrow keys to navigate</p>
              <p>Press ESC to close</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
