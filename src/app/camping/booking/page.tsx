"use client";

import { useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl, PHONE_NUMBER } from "../../util/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CampingBookingPage() {
  const [bookingForm, setBookingForm] = useState({
    name: "",
    numberOfPeople: "",
    arrivalDate: "",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🏕️ *Hotel Blue Sheep Inn - Camping Booking Request*

*Camping Details:*
• Type: Garden Camping
• Number of People: ${bookingForm.numberOfPeople}
• Arrival Date: ${bookingForm.arrivalDate}

*Customer Information:*
• Name: ${bookingForm.name}

Please confirm this booking.`;

    const whatsappUrl = getWhatsAppUrl(PHONE_NUMBER, message);
    window.open(whatsappUrl, "_blank");

    // Reset form
    setBookingForm({
      name: "",
      numberOfPeople: "",
      arrivalDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">🏕️</span>
            </div>
            <h1 className="text-xl font-bold">Book Camping</h1>
          </div>
          <Link
            href="/camping"
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 pb-8">
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
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name <span className="text-red-500">*</span>
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Number of People <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={bookingForm.numberOfPeople}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  numberOfPeople: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              placeholder="How many people?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Arrival Date <span className="text-red-500">*</span>
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
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/camping"
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white rounded-xl font-bold shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 transition-all"
            >
              Send to WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

