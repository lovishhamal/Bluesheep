"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
} from "@heroicons/react/24/outline";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  const galleryImages = [
    {
      src: "/hero-bg.jpg",
      alt: "Blue Sheep Hotel - Mountain View",
      title: "Stunning Mountain Views",
      description: "Wake up to panoramic views of the Himalayas",
    },
    {
      src: "/hotel-exterior.jpg",
      alt: "Blue Sheep Hotel Exterior",
      title: "Luxury Hotel Exterior",
      description: "Modern architecture in the heart of Dunai",
    },
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
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-400/30 shadow-lg">
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
              {["Home", "Rooms", "Dining", "Activities", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white hover:text-amber-300 transition-colors duration-300 font-medium"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"
        />

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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
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
            className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
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

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="/logo.jpg"
              alt="Hotel Blue Sheep Inn Logo"
              className="h-40 md:h-52 mx-auto mb-6 rounded-xl shadow-2xl"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-4 font-playfair text-white/95"
          >
            Luxury Mountain Retreat in Dunai, Phoksundo
          </motion.p>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {galleryImages[currentImageIndex].title}
            </h3>
            <p className="text-white/90 font-medium">
              {galleryImages[currentImageIndex].description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg">
              Book Your Stay
            </button>
            <button className="border-2 border-amber-500 text-white hover:bg-amber-500 hover:text-slate-900 px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg">
              Explore Rooms
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDownIcon className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-6">
              Why Choose Blue Sheep Hotel?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the pristine beauty of Dunai, Phoksundo, we offer an
              unparalleled hospitality experience with modern amenities and
              breathtaking views.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ViewfinderCircleIcon,
                title: "Stunning Mountain Views",
                description:
                  "Wake up to panoramic views of the Himalayas and pristine Phoksundo Lake",
              },
              {
                icon: WifiIcon,
                title: "Free High-Speed WiFi",
                description:
                  "Stay connected with complimentary high-speed internet throughout the hotel",
              },
              {
                icon: BuildingOfficeIcon,
                title: "Fine Dining Restaurant",
                description:
                  "Experience authentic local cuisine and international dishes in our elegant restaurant",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 bg-white/80 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-6">
              Perfectly Located in Dunai, Phoksundo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our hotel is strategically located to provide easy access to all
              the natural wonders and cultural sites that make this region so
              special.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
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
                    <li key={index} className="flex items-center text-gray-700">
                      <StarIcon className="w-5 h-5 text-amber-500 mr-3" />
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
              className="bg-gray-300 h-96 rounded-lg flex items-center justify-center"
            >
              <p className="text-gray-600">Interactive Map Coming Soon</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why guests love their stay at Hotel Blue Sheep Inn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "United States",
                quote:
                  "The views from our room were absolutely breathtaking. The staff went above and beyond to make our stay memorable.",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Singapore",
                quote:
                  "Perfect location for exploring Phoksundo Lake. The hotel restaurant serves amazing local cuisine with a modern twist.",
                rating: 5,
              },
              {
                name: "Emma Wilson",
                location: "United Kingdom",
                quote:
                  "Incredibly comfortable rooms and the most stunning mountain views I've ever experienced. Will definitely return!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-amber-50/50 p-8 rounded-lg shadow-md border border-amber-200/50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
              Book Your Stay Today
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Ready to experience the best hotel in Dunai, Phoksundo? Contact us
              now to make your reservation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-slate-300">
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
              className="text-center"
            >
              <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-slate-300">+977-XXXX-XXXX</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <EnvelopeIcon className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-slate-300">info@bluesheephotel.com</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-playfair mb-4">
              Blue Sheep Hotel
            </h3>
            <p className="text-gray-400 mb-6">Best Hotel in Dunai, Phoksundo</p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-gray-500 mt-8">
              &copy; 2024 Blue Sheep Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
