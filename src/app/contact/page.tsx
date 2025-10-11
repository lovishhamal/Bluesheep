"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen animated-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-slate-900/95 backdrop-blur-sm border-b border-emerald-400/30 shadow-sm">
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
                className="text-emerald-400 font-semibold border-b-2 border-emerald-400 transition-colors duration-300"
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
                  className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium"
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
                <button
                  onClick={() => {
                    const message = `Hi! I'd like to get in touch about your hotel services.`;
                    const whatsappUrl = `https://wa.me/9849961927?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-emerald-400 font-semibold w-full text-left"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="relative py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 inline-block float">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold font-poppins mb-6 text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto text-white/90"
          >
              Ready to experience the best hotel in Dunai, Phoksundo? Get in
              touch with us to book your stay or ask any questions.
          </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-white mb-8 font-poppins">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                    <MapPinIcon className="w-6 h-6 text-sun-yellow mt-1 mr-4" />
                  <div>
                      <h3 className="text-lg font-semibold text-white">
                      Address
                    </h3>
                      <p className="text-white/90">
                      Dunai, Dolpa
                      <br />
                      Karnali Province, Nepal
                      <br />
                      Near Phoksundo Lake
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                    <PhoneIcon className="w-6 h-6 text-sun-yellow mt-1 mr-4" />
                  <div>
                      <h3 className="text-lg font-semibold text-white">
                      Phone
                    </h3>
                      <p className="text-white/90">+977-XXXX-XXXX</p>
                      <p className="text-sm text-white/70">Available 24/7</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <EnvelopeIcon className="w-6 h-6 text-sun-yellow mt-1 mr-4" />
                  <div>
                      <h3 className="text-lg font-semibold text-white">
                      Email
                    </h3>
                      <p className="text-white/90">info@bluesheephotel.com</p>
                      <p className="text-sm text-white/70">
                      We respond within 2 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                    <ClockIcon className="w-6 h-6 text-sun-yellow mt-1 mr-4" />
                  <div>
                      <h3 className="text-lg font-semibold text-white">
                      Reception Hours
                    </h3>
                      <p className="text-white/90">
                      Monday - Sunday: 6:00 AM - 10:00 PM
                      <br />
                      Check-in: 2:00 PM
                      <br />
                      Check-out: 11:00 AM
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-form p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 glass-input rounded-lg"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 glass-input rounded-lg"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 glass-input rounded-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 glass-input rounded-lg"
                    placeholder="+977-XXXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 glass-input rounded-lg">
                    <option>Room Booking</option>
                    <option>General Inquiry</option>
                    <option>Special Requests</option>
                    <option>Group Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 glass-input rounded-lg"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full glass-button py-3 px-6 rounded-lg font-semibold sun-glow text-sheep-blue"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="glass-card p-8 text-center">
              <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              Find Us in Dunai, Phoksundo
            </h2>
              <p className="text-lg text-white/90">
              Located in the heart of Dunai with easy access to Phoksundo Lake
              and surrounding attractions.
            </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card h-96 rounded-lg flex items-center justify-center"
          >
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-sun-yellow mx-auto mb-4" />
              <p className="text-white/90 text-lg">
                Interactive Map Coming Soon
              </p>
              <p className="text-white/70">
                Dunai, Dolpa, Karnali Province, Nepal
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
