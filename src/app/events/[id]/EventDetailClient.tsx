"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    CalendarIcon,
    ArrowLeftIcon,
    MapPinIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";
import { Event } from "../types";

interface EventDetailClientProps {
    event: Event;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Format date range
    const formatDateRange = (start: string | null, end: string | null) => {
        if (!start) return "TBA";
        const startDate = new Date(start);

        const formatDateTime = (date: Date) => {
            const d = date.toLocaleDateString('en-US', { dateStyle: 'long' });
            const t = date.toLocaleTimeString('en-US', { timeStyle: 'short' });
            return `${d}, ${t}`;
        };

        if (!end) return formatDateTime(startDate);
        const endDate = new Date(end);

        if (startDate.toDateString() === endDate.toDateString()) {
            // Same day, show date and then time range
            const timeOptions: Intl.DateTimeFormatOptions = { timeStyle: 'short' };
            return `${startDate.toLocaleDateString('en-US', { dateStyle: 'long' })} | ${startDate.toLocaleTimeString('en-US', timeOptions)} - ${endDate.toLocaleTimeString('en-US', timeOptions)}`;
        }

        return `${formatDateTime(startDate)} - ${formatDateTime(endDate)}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation currentPage="events" />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Link
                    href="/events/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8 group"
                >
                    <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Events</span>
                </Link>
            </div>

            {/* Event Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        {event.title}
                    </h1>
                    {event.sub_title && (
                        <p className="text-xl text-emerald-600 font-semibold mb-6">{event.sub_title}</p>
                    )}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
                            <CalendarIcon className="w-5 h-5" />
                            <span className="font-medium">{formatDateRange(event.start_date, event.end_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                            <MapPinIcon className="w-5 h-5" />
                            <span className="font-medium">Dunai, Dolpa</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Image Gallery Grid */}
            {event.images && event.images.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                        {event.images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 + idx * 0.03 }}
                                onClick={() => setLightboxImage(img)}
                                className="w-full cursor-pointer group"
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                    <Image
                                        src={img}
                                        alt={`${event.title || 'Event'} - Image ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Description */}
            {event.description && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
                >
                    <div
                        className="prose prose-lg prose-gray max-w-none text-gray-800 [&_p]:text-gray-700 [&_p]:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                </motion.div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && event.images && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        {/* Left Arrow */}
                        {event.images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIdx = event.images!.indexOf(lightboxImage);
                                    const prevIdx = (currentIdx - 1 + event.images!.length) % event.images!.length;
                                    setLightboxImage(event.images![prevIdx]);
                                }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all z-10"
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>
                        )}

                        {/* Right Arrow */}
                        {event.images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIdx = event.images!.indexOf(lightboxImage);
                                    const nextIdx = (currentIdx + 1) % event.images!.length;
                                    setLightboxImage(event.images![nextIdx]);
                                }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all z-10"
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        )}

                        <motion.div
                            key={lightboxImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImage}
                                alt="Event image"
                                width={1200}
                                height={800}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
