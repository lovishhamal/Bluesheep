"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

// Type definitions

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function Home() {
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

  // Open camping page function
  const openCampingPage = () => {
    window.open("/camping", "_blank");
  };
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([
    {
      src: "/phoksundo-lake.jpg",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="w-full bg-slate-900 border-b border-emerald-400/30 shadow-sm">
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
                className="h-16 w-auto mr-3 rounded-lg shadow-md"
              />
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
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
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Camping
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-yellow-200 transition-colors duration-300"
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
              className="md:hidden border-t border-gray-700/50"
            >
              <div className="py-4 space-y-4">
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
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-24 w-24 rounded-full shadow-2xl border-4 border-emerald-400"
                />
                <div className="absolute -inset-1 bg-emerald-400 rounded-full blur opacity-30"></div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="block">Blue Sheep</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                  Hotel
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-200 font-light max-w-3xl mx-auto">
                Experience luxury in the heart of Dolpa, Nepal
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-emerald-300">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                <a
                  href="tel:9849961927"
                  className="text-lg font-semibold hover:text-emerald-200 transition-colors"
                >
                  9849961927
                </a>
              </div>
              <div className="hidden sm:block w-px h-6 bg-emerald-400/50"></div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-lg">Dunai, Dolpa</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-20 sm:pb-2 w-full max-w-md mx-auto sm:max-w-none">
              <motion.button
                onClick={openCampingPage}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏕️ Explore Camping
              </motion.button>
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room at Blue Sheep Hotel.`;
                  const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Book Now
              </motion.button>
              <motion.button
                onClick={() => {
                  window.open(
                    "https://www.google.com/maps?q=28.9508116,82.895524",
                    "_blank"
                  );
                }}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🗺️ Find Us
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
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

      {/* Features Section - New Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Blue Sheep Hotel?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the perfect blend of luxury, nature, and authentic
              Nepalese hospitality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏔️",
                title: "Prime Location",
                description:
                  "Located in the heart of Dunai with stunning mountain views and surrounded by the majestic Himalayas",
              },
              {
                icon: "🏨",
                title: "Luxury Accommodation",
                description:
                  "Comfortable rooms with modern amenities and breathtaking mountain views",
              },
              {
                icon: "🍽️",
                title: "Garden Restaurant",
                description:
                  "Authentic local cuisine and international dishes in our beautiful garden setting",
              },
              {
                icon: "🏕️",
                title: "Camping Facilities",
                description:
                  "Experience nature with our premium camping facilities in the hotel garden",
              },
              {
                icon: "🚁",
                title: "Easy Access",
                description:
                  "Only 30 minutes drive from Dolpa Airport with convenient transportation",
              },
              {
                icon: "🙏",
                title: "Cultural Heritage",
                description:
                  "Walking distance to local monasteries and authentic cultural experiences",
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

      {/* Gallery Section - New Design */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hotel Gallery
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-slate-300">
              Discover the beauty of our hotel, stunning mountain views, and
              world-class facilities
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingHotelGallery && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
              <p className="text-emerald-300 mt-4 text-lg">
                Loading gallery...
              </p>
            </div>
          )}

          {/* Error State */}
          {hotelGalleryError && (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-300 text-lg">{hotelGalleryError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Masonry Gallery Layout */}
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length > 0 && (
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {hotelGalleryImages.map((image, index) => (
                  <motion.div
                    key={image.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="break-inside-avoid mb-6 group cursor-pointer"
                    onClick={() => openHotelGalleryModal(image)}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/30 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/30">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold text-lg font-montserrat capitalize">
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
          {!isLoadingHotelGallery &&
            !hotelGalleryError &&
            hotelGalleryImages.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-emerald-400/30 max-w-md mx-auto">
                  <p className="text-slate-300 text-lg">
                    No gallery images available at the moment.
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Please check back later for more photos.
                  </p>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Testimonials Section - New Design */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real experiences from travelers who chose Blue Sheep Hotel for
              their Dolpa adventure
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoadingReviews && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
              <p className="text-emerald-300 mt-4 text-lg">
                Loading reviews...
              </p>
            </div>
          )}

          {/* Error State */}
          {reviewsError && (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-300 text-lg">{reviewsError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Reviews Grid */}
          {!isLoadingReviews && !reviewsError && reviews.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-6 text-lg leading-relaxed">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900 text-lg">
                        {review.name}
                      </p>
                      <p className="text-sm text-slate-500">{review.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Reviews State */}
          {!isLoadingReviews && !reviewsError && reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 max-w-md mx-auto">
                <p className="text-slate-600 text-lg">
                  No reviews available at the moment.
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Please check back later for customer reviews.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section - New Design */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Dolpa?
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-emerald-100">
              Book your stay at Blue Sheep Hotel and create unforgettable
              memories in the heart of the Himalayas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Location
              </h3>
              <p className="text-emerald-100">
                Dunai, Dolpa
                <br />
                Karnali Province, Nepal
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
              <a
                href="tel:9849961927"
                className="text-emerald-100 hover:text-white transition-colors duration-300 text-lg font-semibold"
              >
                9849961927
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <EnvelopeIcon className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
              <p className="text-emerald-100">innbluesheep@gmail.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏕️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Camping</h3>
              <p className="text-emerald-100">Garden camping available</p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const message = `Hi! I'd like to book a room at Blue Sheep Hotel.`;
                  const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Book via WhatsApp
              </motion.button>
              <motion.button
                onClick={openCampingPage}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏕️ Explore Camping
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section
        id="map-section"
        className="py-20 bg-gradient-to-br from-emerald-50 to-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Find Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Located in the heart of Dunai, Dolpa - your perfect base for
              mountain adventures
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
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
                title="Blue Sheep Inn Location"
              ></iframe>
            </div>

            <div className="mt-6 text-center">
              <p className="text-slate-600 mb-4 text-lg">
                📍 Blue Sheep Inn, Dunai, Dolpa, Nepal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps?q=28.9508116,82.895524",
                      "_blank"
                    );
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open in Google Maps
                </motion.button>
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to know more about your hotel location and services.`;
                    const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - New Design */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Hotel Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img
                  src="/logo.jpg"
                  alt="Blue Sheep Hotel Logo"
                  className="h-12 w-12 rounded-full mr-3"
                />
                <h3 className="text-2xl font-bold">Blue Sheep Hotel</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Experience luxury in the heart of Dolpa, Nepal. Your gateway to
                the Himalayas.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400">
                <PhoneIcon className="w-5 h-5" />
                <a
                  href="tel:9849961927"
                  className="text-lg font-semibold hover:text-emerald-300 transition-colors"
                >
                  9849961927
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/rooms"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Rooms & Suites
                </Link>
                <Link
                  href="/menu"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Restaurant Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Garden Camping
                </Link>
                <Link
                  href="/contact"
                  className="block text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4">Location</h4>
              <div className="text-slate-300 space-y-2">
                <p>Dunai, Dolpa</p>
                <p>Karnali Province</p>
                <p>Nepal</p>
                <p className="text-sm text-slate-400 mt-4">Heart of Dunai</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} Blue Sheep Hotel. All rights
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
