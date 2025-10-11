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
      currency: "USD",
    }).format(price);
  };

  // Handle booking
  const handleBooking = (room: Room) => {
    // You can implement booking logic here
    alert(
      `Booking ${room.room_name} for ${formatPrice(room.price_per_night)}/night`
    );
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
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
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-gray-900 font-semibold border-b-2 border-gray-900 transition-colors duration-300"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Menu
              </Link>
              <Link
                href="/activities"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Activities
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
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
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="block text-gray-900 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link
                  href="/menu"
                  className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/activities"
                  className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Activities
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium"
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
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-6 text-gray-900">
              Luxury Rooms & Suites
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Experience unparalleled comfort and stunning mountain views in our
              beautifully appointed rooms and suites in Dunai, Phoksundo.
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
            <div className="grid lg:grid-cols-3 gap-8">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
                >
                  {/* Room Image Gallery */}
                  <div className="h-64 relative overflow-hidden group">
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

                  <div className="p-6">
                    {/* Room Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {room.room_name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <UserIcon className="w-4 h-4 mr-1" />
                          <span>Capacity: {room.capacity} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(room.price_per_night)}
                        </span>
                        <p className="text-sm text-gray-600">per night</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {room.description}
                    </p>

                    {/* Facilities */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Facilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {room.facilities
                          .slice(0, 8)
                          .map((facility, facilityIndex) => (
                            <div
                              key={facilityIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                            >
                              <CheckIcon className="w-3 h-3 text-gray-600 mr-1 flex-shrink-0" />
                              <span className="truncate max-w-24">
                                {facility}
                              </span>
                            </div>
                          ))}
                        {room.facilities.length > 8 && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                            +{room.facilities.length - 8} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="mb-4">
                      {room.is_available ? (
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 border border-green-200 text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Available Now
                          </div>
                          {room.start_date && room.end_date && (
                            <div className="text-xs text-gray-600">
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
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 border border-red-200 text-red-700">
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
                          ? "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-4xl font-bold text-gray-900 font-montserrat mb-6">
                Room Amenities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                title: "Scenic Views",
                description: "Stunning Phoksundo Lake views",
              },
            ].map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <amenity.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {amenity.title}
                </h3>
                <p className="text-gray-600">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Book?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact us to make a reservation or book your perfect room.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Book Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
