"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HomeIcon,
  WifiIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  CheckIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../util/supabase";
import { useState, useEffect } from "react";

// Room interface matching your database schema
interface Room {
  id: string;
  room_name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  facilities: string[]; // JSONB array from database
  images: string[]; // Array of Supabase Storage URLs
  start_date?: string; // timestamptz
  end_date?: string; // timestamptz
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingType, setBookingType] = useState<"book" | "reserve">("book");
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    specialRequests: "",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch rooms from database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        console.log("Fetching rooms from database...");

        // Check if Supabase is configured
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ) {
          throw new Error("Supabase environment variables not configured");
        }

        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .order("price_per_night", { ascending: true });

        console.log("Supabase response:", { data, error });

        if (error) {
          throw error;
        }

        setRooms(data || []);
        console.log("Rooms loaded successfully:", data?.length || 0, "rooms");
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(
          `Failed to load rooms: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
    }).format(price);
  };

  // Handle booking
  const handleBooking = (room: Room) => {
    if (room.is_available) {
      setSelectedRoom(room);
      setIsBookingModalOpen(true);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    // Validate required fields
    if (!bookingForm.customerName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!bookingForm.customerPhone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    // Create WhatsApp message with form data
    const message = `Hi! I'm interested in ${
      bookingType === "book" ? "booking" : "reserving"
    } the ${selectedRoom.room_name} room.

Room Details:
- Room: ${selectedRoom.room_name}
- Price: ${formatPrice(selectedRoom.price_per_night)} per night
- Capacity: ${selectedRoom.capacity} guests
- Facilities: ${selectedRoom.facilities.join(", ")}

Customer Details:
- Name: ${bookingForm.customerName}
- Phone: ${bookingForm.customerPhone}
- Email: ${bookingForm.customerEmail || "Not provided"}
- Booking Type: ${bookingType === "book" ? "Book Now" : "Reserve"}
${
  bookingForm.specialRequests
    ? `- Special Requests: ${bookingForm.specialRequests}`
    : ""
}

Please let me know about availability and booking process.`;

    const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Close modal after opening WhatsApp
    closeBookingModal();
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
    setBookingForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      specialRequests: "",
    });
  };

  // Get current image for a room
  const getCurrentRoomImage = (roomId: string, images: string[]) => {
    const currentIndex = currentImageIndex[roomId] || 0;
    if (images && images.length > 0) {
      return images[currentIndex];
    }
    return "/hotel-room.jpg"; // Fallback image
  };

  // Navigate to next image
  const nextImage = (roomId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % totalImages,
    }));
  };

  // Navigate to previous image
  const prevImage = (roomId: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

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
              <Link href="/">
                <img
                  src="/logo.jpg"
                  alt="Hotel Blue Sheep Inn Logo"
                  className="h-16 w-auto mr-3 rounded-lg shadow-md cursor-pointer"
                />
              </Link>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
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

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-emerald-400/30"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-emerald-400 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Camping
                </Link>
                <Link
                  href="/activities"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Activities
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest mb-4 font-montserrat bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              ROOMS
            </h1>
            <p className="text-lg sm:text-xl text-emerald-300 italic tracking-widest font-montserrat">
              Garden Hotel
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-8 inline-block border border-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-700 text-lg">Loading rooms...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-8 inline-block border border-gray-200">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-8 inline-block border border-gray-200">
                <p className="text-gray-700 text-lg mb-4">
                  No rooms available at the moment.
                </p>
                <p className="text-gray-500">
                  Please check back later or contact us for availability.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rooms.map((room, index) => (
              <motion.div
                  key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-emerald-400/40 hover:border-emerald-300/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/30 group relative overflow-hidden min-h-[450px] sm:min-h-[500px] w-full"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  {/* Room Image Gallery */}
                  <div className="h-40 sm:h-48 relative overflow-hidden rounded-lg border border-emerald-400/40 mb-4 relative z-10">
                    <img
                      src={getCurrentRoomImage(room.id, room.images)}
                      alt={room.room_name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/hotel-room.jpg";
                      }}
                    />

                    {/* Navigation Arrows (only show if multiple images) */}
                    {room.images && room.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(room.id, room.images.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
                        >
                          <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => nextImage(room.id, room.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
                        >
                          <ChevronRightIcon className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {room.images && room.images.length > 1 && (
                      <div className="absolute top-2 right-2 glass px-2 py-1 rounded-full text-xs text-white">
                        {(currentImageIndex[room.id] || 0) + 1} /{" "}
                        {room.images.length}
                      </div>
                    )}

                    {/* Image Indicators */}
                    {room.images && room.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {room.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [room.id]: index,
                              }))
                            }
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              (currentImageIndex[room.id] || 0) === index
                                ? "bg-white"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                          />
                        ))}
                </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    {/* Room Header */}
                    <div className="mb-6">
                      <div className="flex flex-col gap-4 mb-4">
                        <div className="flex flex-col gap-3">
                          <h3 className="text-lg sm:text-xl font-bold text-white font-montserrat break-words">
                            {room.room_name}
                          </h3>
                          <div className="flex items-center text-xs text-emerald-300">
                            <UserIcon className="w-3 h-3 mr-2" />
                            <span>Capacity: {room.capacity} guests</span>
                          </div>
                        </div>

                        {/* Yellow dots separator */}
                        <div className="flex justify-center py-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className="text-center">
                            <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                              {formatPrice(room.price_per_night)}
                            </span>
                            <p className="text-xs text-emerald-300 mt-1">
                              per night
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {room.description && (
                      <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 break-words">
                        {room.description}
                      </p>
                    )}

                    {/* Facilities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-emerald-300 mb-3 flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Facilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {room.facilities
                          .slice(0, 8)
                          .map((facility, facilityIndex) => (
                            <div
                              key={facilityIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30 transition-colors duration-200"
                            >
                              <CheckIcon className="w-3 h-3 text-emerald-400 mr-1 flex-shrink-0" />
                              <span className="truncate max-w-24">
                                {facility}
                              </span>
                            </div>
                          ))}
                        {room.facilities.length > 8 && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-400/20">
                            +{room.facilities.length - 8} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="mb-4">
                      {room.is_available ? (
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 border border-green-400/30 text-green-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Available Now
                          </div>
                          {room.start_date && room.end_date && (
                            <div className="text-xs text-gray-300">
                              Until{" "}
                              {new Date(room.end_date).toLocaleString("en-US", {
                                timeZone: "Asia/Kathmandu",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}{" "}
                              NPT
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 border border-red-200 text-red-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            Not Available
                          </div>
                          {room.start_date && room.end_date && (
                            <div className="flex flex-wrap gap-2">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 border border-green-200 text-green-700">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                From:{" "}
                                {new Date(room.start_date).toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "Asia/Kathmandu",
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}{" "}
                                NPT
                              </div>
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 border border-red-400/30 text-red-300">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                Until:{" "}
                                {new Date(room.end_date).toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "Asia/Kathmandu",
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}{" "}
                                NPT
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={() => handleBooking(room)}
                      disabled={!room.is_available}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        room.is_available
                          ? "bg-emerald-500 text-white hover:bg-emerald-400 hover:scale-105 shadow-lg shadow-emerald-500/30"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {room.is_available ? "Book Now" : "Not Available"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20">
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
              Room Amenities
            </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every room is equipped with modern amenities to ensure your
              comfort and convenience.
            </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: WifiIcon,
                title: "Free WiFi",
                description: "High-speed internet access",
              },
              {
                icon: ViewfinderCircleIcon,
                title: "Mountain Views",
                description: "Panoramic Himalayan views",
              },
              {
                icon: HomeIcon,
                title: "Premium Beds",
                description: "Luxury bedding and mattresses",
              },
              {
                icon: EyeIcon,
                title: "Garden Restaurant",
                description: "On-site restaurant with garden views",
              },
            ].map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-emerald-400/30 hover:border-emerald-300/50 hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                    <amenity.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-300">{amenity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Book?
            </h2>
            <p className="text-gray-300 mb-6">
              Contact us to make a reservation or book your perfect room.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const message = `Hi! I'd like to get in touch about your hotel services.`;
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
      {isBookingModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/50 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white font-montserrat">
                {bookingType === "book" ? "Book" : "Reserve"}{" "}
                {selectedRoom.room_name}
              </h2>
              <button
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Booking Type Selection */}
            <div className="mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setBookingType("book")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    bookingType === "book"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-slate-700/50 text-gray-300 border border-emerald-400/50 hover:bg-emerald-500/20"
                  }`}
                >
                  Book Now
                </button>
                <button
                  onClick={() => setBookingType("reserve")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    bookingType === "reserve"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-slate-700/50 text-gray-300 border border-emerald-400/50 hover:bg-emerald-500/20"
                  }`}
                >
                  Reserve
                </button>
              </div>
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

            {/* Room Info */}
            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-emerald-400/30">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedRoom.room_name}
                  </h3>
                  <p className="text-emerald-300">
                    Capacity: {selectedRoom.capacity} guests
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400">
                    {formatPrice(selectedRoom.price_per_night)}
                  </p>
                  <p className="text-sm text-gray-300">per night</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.customerName}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        customerName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={bookingForm.customerEmail}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        customerEmail: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                    placeholder="Enter your email (optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingForm.customerPhone}
                  onChange={(e) =>
                    setBookingForm({
                      ...bookingForm,
                      customerPhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
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
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-emerald-400/50 rounded-lg text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none resize-none"
                  placeholder="Any special requests or notes..."
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
