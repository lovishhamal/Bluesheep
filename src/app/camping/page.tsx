"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CampingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    numberOfPeople: "",
    arrivalDate: "",
  });

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

    const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
      message
    )}`;
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
      <nav className="w-full bg-slate-900/95 backdrop-blur-sm border-b border-emerald-400/30 shadow-sm">
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
                href="/camping"
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
              >
                Camping
              </Link>
              <Link
                href="/menu"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/activities"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Activities
              </Link>
              <button
                onClick={() => {
                  const message = `Hi! I'd like to get in touch about your hotel services.`;
                  const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                    message
                  )}`;
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
              className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-emerald-400/30"
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
                  href="/camping"
                  className="block text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/menu"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/activities"
                  className="block text-white hover:text-yellow-200 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Activities
                </Link>
                <button
                  onClick={() => {
                    const message = `Hi! I'd like to get in touch about your hotel services.`;
                    const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                      message
                    )}`;
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

      {/* Header Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest mb-4 font-montserrat bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              GARDEN CAMPING - OUTDOOR
            </h1>
            <p className="text-lg sm:text-xl text-emerald-300 italic tracking-widest font-montserrat">
              Experience Nature in Our Beautiful Garden
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Image Layout */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-400/30">
              <h2 className="text-4xl font-bold text-white font-montserrat mb-6">
                Garden Camping Experience
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience nature in our beautiful garden with tent camping
                options. Perfect for adventure seekers and nature lovers.
              </p>
            </div>
          </motion.div>

          {/* Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {[
              {
                src: "https://picsum.photos/400/600?random=1",
                alt: "Camping View 1",
                title: "Lake Views",
              },
              {
                src: "https://picsum.photos/400/500?random=2",
                alt: "Camping View 2",
                title: "Garden Setting",
              },
              {
                src: "https://picsum.photos/400/700?random=3",
                alt: "Camping View 3",
                title: "Camping Spots",
              },
              {
                src: "https://picsum.photos/400/450?random=4",
                alt: "Camping View 4",
                title: "Mountain Views",
              },
              {
                src: "https://picsum.photos/400/650?random=5",
                alt: "Camping View 5",
                title: "Natural Beauty",
              },
              {
                src: "https://picsum.photos/400/550?random=6",
                alt: "Camping View 6",
                title: "Outdoor Experience",
              },
              {
                src: "https://picsum.photos/400/600?random=7",
                alt: "Camping View 7",
                title: "Peaceful Setting",
              },
              {
                src: "https://picsum.photos/400/500?random=8",
                alt: "Camping View 8",
                title: "Scenic Beauty",
              },
              {
                src: "https://picsum.photos/400/750?random=9",
                alt: "Camping View 9",
                title: "Nature Trail",
              },
              {
                src: "https://picsum.photos/400/480?random=10",
                alt: "Camping View 10",
                title: "Forest Views",
              },
              {
                src: "https://picsum.photos/400/620?random=11",
                alt: "Camping View 11",
                title: "Sunset Views",
              },
              {
                src: "https://picsum.photos/400/580?random=12",
                alt: "Camping View 12",
                title: "Wildlife Spotting",
              },
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid mb-6 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl border border-emerald-400/30 hover:border-emerald-300/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/30">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg font-montserrat">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Book Camping Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-emerald-500 text-white px-12 py-4 rounded-lg font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/30 hover:scale-105 transform duration-300 text-lg"
            >
              🏕️ Book Camping
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-400/30"
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
              Ready to Camp?
            </h2>
            <p className="text-gray-300 mb-6">
              Contact us to make a reservation for your perfect camping spot.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const message = `Hi! I'd like to get in touch about your camping services.`;
                  const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="border border-emerald-400 text-emerald-400 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-400/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/50 shadow-2xl w-full max-w-md"
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
                  className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
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
    </div>
  );
}
