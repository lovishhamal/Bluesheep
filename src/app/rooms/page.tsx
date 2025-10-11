"use client";

import { motion } from "framer-motion";
import {
  HomeIcon,
  WifiIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  CheckIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
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

  // Get first image or fallback
  const getRoomImage = (images: string[]) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return "/hotel-room.jpg"; // Fallback image
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Header */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 inline-block float">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold font-poppins mb-6 text-white"
            >
              Luxury Rooms & Suites
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto text-white/90"
            >
              Experience unparalleled comfort and stunning mountain views in our
              beautifully appointed rooms and suites in Dunai, Phoksundo.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="glass-card p-8 inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading rooms...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="glass-card p-8 inline-block">
                <p className="text-red-300 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 glass-button px-6 py-2 rounded-lg text-white"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="glass-card p-8 inline-block">
                <p className="text-white text-lg mb-4">
                  No rooms available at the moment.
                </p>
                <p className="text-white/70">
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
                  className="glass-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 float"
                >
                  {/* Room Image */}
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={getRoomImage(room.images)}
                      alt={room.room_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/hotel-room.jpg";
                      }}
                    />
                  </div>

                  <div className="p-6">
                    {/* Room Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {room.room_name}
                        </h3>
                        <div className="flex items-center text-sm text-white/70">
                          <UserIcon className="w-4 h-4 mr-1" />
                          <span>Capacity: {room.capacity} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(room.price_per_night)}
                        </span>
                        <p className="text-sm text-white/70">per night</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 mb-4 line-clamp-3">
                      {room.description}
                    </p>

                    {/* Facilities */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        Facilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {room.facilities
                          .slice(0, 8)
                          .map((facility, facilityIndex) => (
                            <div
                              key={facilityIndex}
                              className="facility-chip inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white/90"
                            >
                              <CheckIcon className="w-3 h-3 text-white mr-1 flex-shrink-0" />
                              <span className="truncate max-w-24">
                                {facility}
                              </span>
                            </div>
                          ))}
                        {room.facilities.length > 8 && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 text-white/70">
                            +{room.facilities.length - 8} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="mb-4">
                      {room.is_available ? (
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Available Now
                          </div>
                          {room.start_date && room.end_date && (
                            <div className="text-xs text-white/70">
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
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                            Not Available
                          </div>
                          {room.start_date && room.end_date && (
                            <div className="flex flex-wrap gap-2">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300">
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
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300">
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
                          ? "glass-button sun-glow text-white hover:scale-105"
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
              <h2 className="text-4xl font-bold text-white font-poppins mb-6">
                Room Amenities
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
                className="text-center glass-card p-6 float"
              >
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-4 sun-glow">
                  <amenity.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {amenity.title}
                </h3>
                <p className="text-white/90">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
