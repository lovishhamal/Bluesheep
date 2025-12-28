"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  WifiIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  CheckIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../util/supabase";
import { getWhatsAppUrl } from "../util/constants";
import { useState, useEffect } from "react";
import { useIsMobile } from "../util/useIsMobile";
import { useRouter } from "next/navigation";
import { useAppDetail } from "../components/AppDetailProvider";

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
  status?: string; // Room status: 'available', 'checked_in', etc.
  created_at: string;
  updated_at: string;
}

export default function RoomsPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { adminPhone } = useAppDetail();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfGuests: "",
    specialRequests: "",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);

  // Intersection Observer for room cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Room is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    const roomCards = document.querySelectorAll("[data-room-id]");
    roomCards.forEach((card) => observer.observe(card));

    return () => {
      roomCards.forEach((card) => observer.unobserve(card));
    };
  }, [rooms]);

  // Fetch rooms from database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .order("price_per_night", { ascending: true });

        if (error) {
          throw error;
        }

        setRooms(data || []);
      } catch (err) {
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

  // Format price for display
  const formatPrice = (price: number) => {
    return (
      "Rs. " +
      new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
    );
  };

  // Handle booking
  const handleBooking = (room: Room) => {
    if (isMobile) {
      // On mobile, navigate to booking page
      router.push(`/rooms/booking?id=${room.id}`);
    } else {
      // On desktop, show modal
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
    const message = `🏨 *Hotel Blue Sheep Inn - Room Booking Request*

*Room Details:*
• Room: ${selectedRoom.room_name}
• Capacity: ${selectedRoom.capacity} ${
      selectedRoom.capacity === 1 ? "guest" : "guests"
    }
• Price: ${formatPrice(selectedRoom.price_per_night)}/night
${
  bookingForm.numberOfGuests
    ? `• Number of Guests: ${bookingForm.numberOfGuests}`
    : ""
}

*Customer Information:*
• Name: ${bookingForm.customerName}
• Phone: ${bookingForm.customerPhone}
${bookingForm.customerEmail ? `• Email: ${bookingForm.customerEmail}` : ""}

${
  bookingForm.specialRequests
    ? `*Special Requests:*\n${bookingForm.specialRequests}`
    : ""
}

Please confirm this booking.`;

    const whatsappUrl = getWhatsAppUrl(message, adminPhone ?? undefined);
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
      numberOfGuests: "",
      specialRequests: "",
    });
  };

  const openImageModal = (room: Room, imageIndex: number) => {
    setSelectedRoom(room);
    setSelectedImageIndex(imageIndex);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedRoom(null);
    setSelectedImageIndex(0);
  };

  const nextImageModal = () => {
    if (selectedRoom && selectedRoom.images) {
      setSelectedImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
    }
  };

  const prevImageModal = () => {
    if (selectedRoom && selectedRoom.images) {
      setSelectedImageIndex(
        (prev) =>
          (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length
      );
    }
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
                  style={{
                    WebkitTransform: "translateZ(0)",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
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
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium border-b-2 border-emerald-50"
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
                href="/travel-guide"
                className="text-emerald-50 hover:text-white transition-colors duration-200 font-medium"
              >
                Travel Guide
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
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  href="/camping"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
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
                  href="/travel-guide"
                  className="block text-white hover:text-emerald-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Travel Guide
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

      {/* Header - Ultra Creative */}
      <section className="relative pt-2 pb-4 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center mt-6 gap-3 mb-8 sm:mb-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200/50 shadow-md"
            >
              <span className="text-2xl">🏨</span>
              <span className="text-emerald-700 font-semibold">
                Luxury Accommodations
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                Our Rooms
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Experience comfort and luxury in the heart of the Himalayas
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid - Ultra Creative */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/15 to-blue-200/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/15 to-emerald-200/15 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-xl p-8 inline-block border border-gray-200/50">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-700 text-lg">Loading rooms...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-xl p-8 inline-block border border-gray-200/50">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/30"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-xl p-8 inline-block border border-gray-200/50">
                <p className="text-gray-700 text-lg mb-4">
                  No rooms available at the moment.
                </p>
                <p className="text-gray-500">
                  Please check back later or contact us for availability.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  data-room-id={room.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={
                    index === 0 ? { opacity: 1, y: 0, scale: 1 } : undefined
                  }
                  whileInView={
                    index > 0 ? { opacity: 1, y: 0, scale: 1 } : undefined
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={index > 0 ? { once: true } : undefined}
                  className="group relative"
                >
                  {/* Card Container */}
                  <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/30 rounded-2xl p-6 lg:p-8 border-2 border-gray-200/50 hover:border-emerald-300/50 transition-all duration-500 h-full flex flex-col overflow-visible shadow-lg hover:shadow-2xl">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-blue-100/20"></div>
                    </div>

                    {/* Room Image Gallery - Creative Design */}
                    <div
                      className="h-56 sm:h-64 relative overflow-hidden rounded-xl border-2 border-gray-200/50 mb-6 relative z-10 cursor-pointer bg-gray-100 group/image"
                      onClick={() =>
                        openImageModal(room, currentImageIndex[room.id] || 0)
                      }
                    >
                      <motion.img
                        src={getCurrentRoomImage(room.id, room.images)}
                        alt={room.room_name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                        style={{
                          WebkitTransform: "translateZ(0)",
                          transform: "translateZ(0)",
                          WebkitBackfaceVisibility: "hidden",
                          backfaceVisibility: "hidden",
                          imageRendering: "auto",
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/hotel-room.jpg";
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>

                      {/* Navigation Arrows (only show if multiple images) */}
                      {room.images && room.images.length > 1 && (
                        <>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              prevImage(room.id, room.images.length);
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 shadow-xl border border-gray-200 z-20"
                          >
                            <ChevronLeftIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              nextImage(room.id, room.images.length);
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 shadow-xl border border-gray-200 z-20"
                          >
                            <ChevronRightIcon className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}

                      {/* Image Counter - Creative */}
                      {room.images && room.images.length > 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute bottom-4 left-4 bg-gradient-to-br from-emerald-500/90 to-blue-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-xl border border-white/20 z-20"
                        >
                          {(currentImageIndex[room.id] || 0) + 1} /{" "}
                          {room.images.length}
                        </motion.div>
                      )}

                      {/* Image Indicators - Creative */}
                      {room.images && room.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                          {room.images.map((_, imgIndex) => (
                            <motion.button
                              key={imgIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex((prev) => ({
                                  ...prev,
                                  [room.id]: imgIndex,
                                }));
                              }}
                              whileTap={{ scale: 0.9 }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                (currentImageIndex[room.id] || 0) === imgIndex
                                  ? "bg-white w-6"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Creative Price Chip - Floating (Outside Image Container) */}
                    <div className="absolute top-2 -right-4 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-500 rounded-xl p-3 shadow-2xl border-2 border-white z-30">
                      <div className="text-center">
                        <div
                          className="text-xs mb-1 font-bold text-white"
                          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                        >
                          From
                        </div>
                        <div
                          className="text-xl font-black text-white"
                          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                        >
                          {formatPrice(room.price_per_night)}
                        </div>
                        <div
                          className="text-xs mt-1 font-bold text-white"
                          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                        >
                          /night
                        </div>
                      </div>
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl blur opacity-50"></div>
                    </div>

                    <div className="relative z-10 flex flex-col flex-1">
                      {/* Room Header - Creative */}
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">
                              {room.room_name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <UserIcon className="w-4 h-4 text-emerald-600" />
                              <span className="font-medium">
                                {room.capacity}{" "}
                                {room.capacity === 1 ? "guest" : "guests"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Decorative Dots */}
                        <div className="flex justify-center py-3 mb-4">
                          <div className="flex space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Description - Creative */}
                      {room.description && (
                        <div className="relative mb-6">
                          {/* Mobile: Show full description */}
                          <p className="block sm:hidden text-gray-700 text-sm leading-relaxed break-words">
                            {room.description}
                          </p>
                          {/* Desktop: Show truncated with hover tooltip */}
                          <div
                            className="hidden sm:block relative"
                            onMouseEnter={() => setHoveredRoomId(room.id)}
                            onMouseLeave={() => setHoveredRoomId(null)}
                          >
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words line-clamp-2 h-12 cursor-pointer select-none overflow-hidden">
                              {room.description}
                            </p>
                            {/* Desktop: Hover tooltip - Solid Design */}
                            {hoveredRoomId === room.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-50 bottom-full left-0 mb-3 p-5 bg-white rounded-2xl border-2 border-emerald-300 shadow-2xl w-full max-w-sm backdrop-blur-sm"
                              >
                                {/* Decorative Header */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-t-2xl"></div>

                                {/* Content */}
                                <div className="relative">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                                      Full Description
                                    </span>
                                  </div>
                                  <p className="text-gray-800 text-sm leading-relaxed font-medium">
                                    {room.description}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <div className="absolute bottom-0 left-6 transform translate-y-full">
                                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                                  <div className="absolute top-0 left-[-2px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-emerald-300"></div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Facilities - Creative Design */}
                      <div className="mb-6 flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                          <span>Facilities</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {room.facilities
                            .slice(0, 6)
                            .map((facility, facilityIndex) => (
                              <motion.div
                                key={facilityIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: facilityIndex * 0.05 }}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                              >
                                <CheckIcon className="w-3 h-3 text-emerald-600 mr-1.5 flex-shrink-0" />
                                <span>{facility}</span>
                              </motion.div>
                            ))}
                          {room.facilities.length > 6 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border border-gray-200"
                            >
                              +{room.facilities.length - 6} more
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Book Now Button - Ultra Creative */}
                      <div className="mt-auto pt-4">
                        <motion.button
                          onClick={() => handleBooking(room)}
                          whileTap={{ scale: 0.98 }}
                          className="group relative w-full py-4 rounded-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50 overflow-hidden"
                        >
                          {/* Glow Effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>

                          {/* Content */}
                          <span className="relative z-10 text-base sm:text-lg flex items-center justify-center gap-2">
                            Book Now
                            <span className="text-xl">→</span>
                          </span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section - Ultra Creative */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              {/* Decorative Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full shadow-lg">
                <span className="text-white text-xs font-bold">
                  ✨ Premium Features
                </span>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border-2 border-gray-200 relative overflow-hidden">
                {/* Top Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="inline-block mb-4">
                    <span className="text-5xl">🏨</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                      Room Amenities
                    </span>
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                    Every room is equipped with modern amenities to ensure your
                    comfort and convenience.
                  </p>

                  {/* Decorative Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: WifiIcon,
                title: "Free WiFi",
                description: "High-speed internet access",
                gradient: "from-emerald-500 to-emerald-600",
                iconBg: "from-emerald-100 to-emerald-200",
                iconColor: "text-emerald-600",
                emoji: "📶",
              },
              {
                icon: ViewfinderCircleIcon,
                title: "Mountain Views",
                description: "Panoramic Himalayan views",
                gradient: "from-blue-500 to-blue-600",
                iconBg: "from-blue-100 to-blue-200",
                iconColor: "text-blue-600",
                emoji: "🏔️",
              },
              {
                icon: HomeIcon,
                title: "Premium Beds",
                description: "Luxury bedding and mattresses",
                gradient: "from-emerald-500 to-emerald-600",
                iconBg: "from-emerald-100 to-emerald-200",
                iconColor: "text-emerald-600",
                emoji: "🛏️",
              },
              {
                icon: EyeIcon,
                title: "Garden Restaurant",
                description: "On-site restaurant with garden views",
                gradient: "from-blue-500 to-blue-600",
                iconBg: "from-blue-100 to-blue-200",
                iconColor: "text-blue-600",
                emoji: "🍽️",
              },
            ].map((amenity, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: isMobile ? 20 : 50,
                  scale: isMobile ? 1 : 0.9,
                }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: isMobile ? 0.3 : 0.6,
                  delay: isMobile ? 0 : index * 0.1,
                  type: isMobile ? "tween" : "spring",
                  stiffness: isMobile ? undefined : 100,
                }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-2 border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background Gradient - Static for performance */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${amenity.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                {/* Glow Effect on Hover - Simplified on mobile */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${
                    amenity.gradient
                  } rounded-2xl ${
                    isMobile ? "" : "blur"
                  } opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                ></div>

                <div className="relative z-10">
                  {/* Icon Container with Creative Design */}
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${amenity.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg border-2 border-white group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    {/* Icon */}
                    <amenity.icon
                      className={`w-10 h-10 ${amenity.iconColor} relative z-10`}
                    />

                    {/* Emoji Badge - Static for performance */}
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {amenity.emoji}
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="text-xl font-bold mb-2.5">
                    <span
                      className={`bg-gradient-to-r ${amenity.gradient} bg-clip-text text-transparent`}
                    >
                      {amenity.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                {/* Decorative Corner Elements */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${amenity.gradient} opacity-0 group-hover:opacity-10 rounded-bl-2xl transition-opacity duration-500`}
                ></div>
                <div
                  className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${amenity.gradient} opacity-0 group-hover:opacity-10 rounded-tr-2xl transition-opacity duration-500`}
                ></div>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{
                    duration: isMobile ? 0.3 : 0.8,
                    delay: isMobile ? 0 : index * 0.1 + 0.3,
                  }}
                  viewport={{ once: true }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${amenity.gradient} rounded-b-2xl`}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA - Ultra Creative */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white via-emerald-50/50 to-blue-50/50 rounded-3xl shadow-2xl p-8 lg:p-12 border-2 border-gray-200/50 relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <span className="text-5xl">🌟</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 bg-clip-text text-transparent">
                  Ready to Book?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 font-light max-w-2xl mx-auto">
                Contact us to make a reservation or book your perfect room.
              </p>
              <motion.div whileTap={{ scale: 0.95 }}>
                <motion.button
                  onClick={() => {
                    const message = `Hi! I'd like to get in touch about your hotel services.`;
                    const whatsappUrl = getWhatsAppUrl(message);
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50"
                >
                  {/* Animated Background Shine */}
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

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>

                  <span className="relative z-10 text-lg">Contact Us</span>
                  <span className="relative z-10 text-xl">→</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal - Ultra Creative Design - Desktop Only */}
      {!isMobile && isBookingModalOpen && selectedRoom && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4 overscroll-contain"
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
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-2xl"
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
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-2xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white p-4 sm:p-6 lg:p-10 border-2 border-gray-200 shadow-2xl rounded-3xl w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto my-auto"
            style={{
              maxHeight: "min(85vh, calc(100vh - 2rem))",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              position: "relative",
              margin: "auto",
              paddingBottom: "env(safe-area-inset-bottom, 1rem)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Decorative Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-t-3xl"></div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-4 shadow-lg"
                  >
                    <span className="text-white font-bold text-sm">
                      📅 Book Now
                    </span>
                  </motion.div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {selectedRoom.room_name}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4 text-emerald-600" />
                      <span>
                        {selectedRoom.capacity}{" "}
                        {selectedRoom.capacity === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">
                        {formatPrice(selectedRoom.price_per_night)}
                      </span>
                      <span className="text-gray-500">/night</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={closeBookingModal}
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    backgroundColor: "#f3f4f6",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-900 transition-colors p-2.5 hover:bg-gray-100 rounded-xl border border-gray-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Booking Notice - Modern Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 sm:mb-6 p-3 sm:p-5 bg-amber-50 border-l-4 border-amber-500 rounded-xl shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white text-lg font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-amber-900 font-bold mb-1.5 text-base">
                      Important Notice
                    </h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Bookings must be made at least 1 day in advance. This will
                      open WhatsApp with your booking details.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Booking Form - Creative */}
              <form
                onSubmit={handleBookingSubmit}
                className="space-y-4 sm:space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">
                      Full Name <span className="text-red-500">*</span>
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
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                      placeholder="Enter your full name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2.5">
                      Email{" "}
                      <span className="text-gray-400 text-xs font-normal">
                        (Optional)
                      </span>
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
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                      placeholder="Enter your email (optional)"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-gray-900 mb-2.5">
                    Phone Number <span className="text-red-500">*</span>
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
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                    placeholder="Enter your phone number"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-bold text-gray-900 mb-2.5">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={bookingForm.numberOfGuests}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        numberOfGuests: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                    placeholder="Enter number of guests"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-900 mb-2.5">
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
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white resize-none transition-all"
                    placeholder="Any special requests or notes..."
                  />
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="button"
                    onClick={closeBookingModal}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white rounded-xl font-bold overflow-hidden shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all"
                  >
                    {/* Animated Background Shine */}
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
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send to WhatsApp
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Full-Screen Image Modal - Creative Design */}
      {isImageModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <motion.button
              onClick={closeImageModal}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 shadow-xl border-2 border-gray-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>

            {/* Navigation Arrows */}
            {selectedRoom.images && selectedRoom.images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImageModal}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 shadow-xl border-2 border-gray-200"
                >
                  <ChevronLeftIcon className="w-8 h-8" />
                </motion.button>
                <motion.button
                  onClick={nextImageModal}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-300 shadow-xl border-2 border-gray-200"
                >
                  <ChevronRightIcon className="w-8 h-8" />
                </motion.button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedRoom.images[selectedImageIndex]}
                alt={`${selectedRoom.room_name} - Image ${
                  selectedImageIndex + 1
                }`}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/hotel-room.jpg";
                }}
              />
            </div>

            {/* Image Counter - Creative */}
            {selectedRoom.images && selectedRoom.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500/95 to-blue-500/95 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-bold shadow-xl border-2 border-white/20"
              >
                {selectedImageIndex + 1} / {selectedRoom.images.length}
              </motion.div>
            )}

            {/* Room Name - Creative */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-6 left-6 bg-gradient-to-r from-emerald-500/95 to-blue-500/95 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-bold shadow-xl border-2 border-white/20"
            >
              {selectedRoom.room_name}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
