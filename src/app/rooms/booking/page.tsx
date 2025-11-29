"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../util/supabase";
import { getWhatsAppUrl, PHONE_NUMBER } from "../../util/constants";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Room {
  id: string;
  room_name: string;
  capacity: number;
  price_per_night: number;
  description: string;
  images: string[];
  amenities: string[];
}

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams?.get("id") || null;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfGuests: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (roomId) {
      fetchRoom();
    } else {
      router.push("/rooms");
    }
  }, [roomId, router]);

  const fetchRoom = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", roomId)
        .single();

      if (error) throw error;
      setRoom(data);
    } catch (err) {
      router.push("/rooms");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;

    const message = `🏨 *Hotel Blue Sheep Inn - Room Booking Request*

*Room Details:*
• Room: ${room.room_name}
• Capacity: ${room.capacity} ${room.capacity === 1 ? "guest" : "guests"}
• Price: ${formatPrice(room.price_per_night)}/night
${bookingForm.numberOfGuests ? `• Number of Guests: ${bookingForm.numberOfGuests}` : ""}

*Customer Information:*
• Name: ${bookingForm.customerName}
• Phone: ${bookingForm.customerPhone}
${bookingForm.customerEmail ? `• Email: ${bookingForm.customerEmail}` : ""}

${bookingForm.specialRequests ? `*Special Requests:*\n${bookingForm.specialRequests}` : ""}

Please confirm this booking.`;

    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");

    // Reset form
    setBookingForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      numberOfGuests: "",
      specialRequests: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Room not found</p>
          <Link
            href="/rooms"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Book Room</h1>
          <Link
            href="/rooms"
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 pb-8">
        {/* Room Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-3 shadow-lg">
                <span className="text-white font-bold text-sm">📅 Book Now</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {room.room_name}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-emerald-600" />
                  <span>
                    {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <span className="text-emerald-600 font-bold">
                    {formatPrice(room.price_per_night)}
                  </span>
                  <span className="text-gray-500">/night</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div className="flex-1">
              <h4 className="text-amber-900 font-bold mb-1 text-sm">
                Important Notice
              </h4>
              <p className="text-amber-800 text-xs leading-relaxed">
                Bookings must be made at least 1 day in advance. This will open
                WhatsApp with your booking details.
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="Enter your email (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="Enter number of guests"
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

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/rooms"
              className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all"
            >
              Send to WhatsApp →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}

