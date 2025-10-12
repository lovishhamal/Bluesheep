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
      alt: "Phoksundo Lake View",
      title: "Phoksundo Lake",
      description: "Crystal clear alpine lake just minutes away",
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
      "Phoksundo Lake",
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
      <nav className="w-full bg-slate-900/95 backdrop-blur-sm border-b border-emerald-400/30 shadow-sm">
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

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />

        {/* Image Gallery */}
        <div className="absolute inset-0">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${galleryImages[currentImageIndex].src}')`,
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 glass p-3 rounded-full transition-all duration-300 hover:scale-110 glow"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 glass p-3 rounded-full transition-all duration-300 hover:scale-110 glow"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Image Indicators - Hidden */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4 opacity-0">
          <div className="flex space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="glass p-2 rounded-full transition-all duration-300 hover:scale-110 glow"
            aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlay ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative pt-20 pb-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 text-center border border-emerald-400/30 shadow-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-6">
                Best Hotel in Dunai, Phoksundo - Garden Restaurant & Camping
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                Experience the best hotel in Dunai, Phoksundo with our luxury
                accommodation, garden restaurant, and camping facilities.
                Perfectly located for exploring the natural wonders of Dolpa
                region.
              </p>
              <div className="flex items-center justify-center gap-3 text-emerald-400 text-2xl font-bold mb-6">
                <PhoneIcon className="w-8 h-8" />
                <a
                  href="tel:9849961927"
                  className="hover:text-emerald-300 transition-colors duration-300"
                >
                  9849961927
                </a>
              </div>
              <motion.button
                onClick={openCampingPage}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transform hover:scale-105 flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">🏕️</span>
                <span>Explore Camping</span>
              </motion.button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
                  Nearby Attractions
                </h3>
                <ul className="space-y-4">
                  {[
                    "Phoksundo Lake - 5 minutes walk",
                    "Shey Phoksundo National Park - 10 minutes drive",
                    "Dolpa Airport - 15 minutes drive",
                    "Local Monasteries - Walking distance",
                    "Trekking Trails - Direct access",
                  ].map((attraction, index) => (
                    <li key={index} className="flex items-center text-white/90">
                      <StarIcon className="w-5 h-5 text-yellow-300 mr-3" />
                      {attraction}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card h-96 rounded-lg flex items-center justify-center"
            >
              <p className="text-white/90">Interactive Map Coming Soon</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="glass-card p-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-6">
                Best Hotel in Dunai, Phoksundo - Guest Reviews
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Discover why guests choose our hotel in Dunai, Phoksundo for the
                best accommodation experience
              </p>
            </div>
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
                  className="glass-card p-8 rounded-lg float"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-white/90 italic mb-6">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-white font-bold navy-glow">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-sm text-white/70">{review.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Reviews State */}
          {!isLoadingReviews && !reviewsError && reviews.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-400/30 max-w-md mx-auto">
                <p className="text-gray-300 text-lg">
                  No reviews available at the moment.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Please check back later for customer reviews.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="glass-card p-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 text-white">
                Hotel Gallery
              </h2>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Explore our beautiful hotel, stunning views, and amazing
                facilities through our photo gallery.
              </p>
            </div>
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-400/30 max-w-md mx-auto">
                  <p className="text-gray-300 text-lg">
                    No gallery images available at the moment.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please check back later for more photos.
                  </p>
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="glass-card p-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 text-white">
                Book Your Stay Today
              </h2>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Ready to experience the best hotel in Dunai, Phoksundo? Contact
                us now to make your reservation.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center glass-card p-6 float"
            >
              <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Location
              </h3>
              <p className="text-white/90">
                Dunai, Dolpa
                <br />
                Karnali Province, Nepal
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center glass-card p-6 float"
            >
              <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
              <a
                href="tel:9849961927"
                className="text-white/90 hover:text-emerald-400 transition-colors duration-300 text-lg font-semibold"
              >
                9849961927
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center glass-card p-6 float"
            >
              <EnvelopeIcon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
              <p className="text-white/90">info@bluesheephotel.com</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-poppins mb-4">
              Blue Sheep Hotel
            </h3>
            <p className="text-white/70 mb-4">Best Hotel in Dunai, Phoksundo</p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-lg font-semibold mb-6">
              <PhoneIcon className="w-5 h-5" />
              <a
                href="tel:9849961927"
                className="hover:text-emerald-300 transition-colors duration-300"
              >
                9849961927
              </a>
            </div>
            <p className="text-white/60 mt-8">
              &copy; {new Date().getFullYear()} Blue Sheep Hotel. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Hotel Gallery Modal */}
      {isHotelGalleryModalOpen && selectedHotelGalleryImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
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
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
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
