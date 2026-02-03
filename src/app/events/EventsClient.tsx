"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    CalendarIcon,
    ArrowLeftIcon,
    MapPinIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Navigation from "../components/Navigation";

interface Event {
    id: number;
    created_at: string;
    title: string | null;
    sub_title: string | null;
    description: string | null;
    start_date: string | null;
    end_date: string | null;
    images: string[] | null;
    is_enabled: boolean | null;
    no_of_participant: number | null;
}

interface EventsClientProps {
    initialEvents: Event[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState<{
        [key: number]: number;
    }>({});
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Format date range
    const formatDateRange = (start: string | null, end: string | null) => {
        if (!start) return "TBA";
        const startDate = new Date(start);
        if (!end) return startDate.toLocaleDateString('en-US', { dateStyle: 'long' });
        const endDate = new Date(end);

        if (startDate.toDateString() === endDate.toDateString()) {
            return startDate.toLocaleDateString('en-US', { dateStyle: 'long' });
        }

        return `${startDate.toLocaleDateString('en-US', { dateStyle: 'long' })} - ${endDate.toLocaleDateString('en-US', { dateStyle: 'long' })}`;
    };

    // Get current image for an event
    const getCurrentEventImage = (eventId: number, images: string[] | null) => {
        const currentIndex = currentImageIndex[eventId] || 0;
        if (images && images.length > 0) {
            return images[currentIndex];
        }
        return "/hero-bg.jpg";
    };

    // Open event detail page
    const openEventPage = (event: Event) => {
        setSelectedEvent(event);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Go back to events list
    const goBackToEvents = () => {
        setSelectedEvent(null);
    };

    // Render event detail page
    if (selectedEvent) {
        return (
            <div className="min-h-screen bg-white">
                <Navigation currentPage="events" />

                {/* Back Button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={goBackToEvents}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8 group"
                    >
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Events</span>
                    </motion.button>
                </div>

                {/* Event Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                            {selectedEvent.title}
                        </h1>
                        {selectedEvent.sub_title && (
                            <p className="text-xl text-emerald-600 font-semibold mb-6">{selectedEvent.sub_title}</p>
                        )}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
                                <CalendarIcon className="w-5 h-5" />
                                <span className="font-medium">{formatDateRange(selectedEvent.start_date, selectedEvent.end_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                                <MapPinIcon className="w-5 h-5" />
                                <span className="font-medium">Dunai, Dolpa</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Image Gallery Grid */}
                {selectedEvent.images && selectedEvent.images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                            {selectedEvent.images.map((img, idx) => (
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
                                            alt={`${selectedEvent.title || 'Event'} - Image ${idx + 1}`}
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
                {selectedEvent.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
                    >
                        <div
                            className="prose prose-lg prose-gray max-w-none text-gray-800 [&_p]:text-gray-700 [&_p]:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                        />
                    </motion.div>
                )}

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {lightboxImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightboxImage(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        >
                            <button
                                onClick={() => setLightboxImage(null)}
                                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                            >
                                <XMarkIcon className="w-8 h-8" />
                            </button>
                            <motion.div
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

    // Render events list
    return (
        <div className="min-h-screen bg-white">
            <Navigation currentPage="events" />

            {/* Events Grid */}
            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {initialEvents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center">
                                <CalendarIcon className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Scheduled</h3>
                            <p className="text-gray-500">Check back soon for upcoming experiences</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {initialEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => openEventPage(event)}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200">
                                        {/* Image */}
                                        {event.images && event.images.length > 0 ? (
                                            <div className="relative h-56 overflow-hidden">
                                                <Image
                                                    src={getCurrentEventImage(event.id, event.images)}
                                                    alt={event.title || "Event"}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>

                                                {/* Date Badge */}
                                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                                                    <div className="text-2xl font-black text-gray-900 leading-none">
                                                        {event.start_date ? new Date(event.start_date).getDate() : "?"}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                                        {event.start_date ? new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' }) : "TBA"}
                                                    </div>
                                                </div>

                                                {/* Image count badge */}
                                                {event.images.length > 1 && (
                                                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                                                        +{event.images.length - 1} more
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                                                <CalendarIcon className="w-12 h-12 text-emerald-300" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                                {event.title}
                                            </h3>
                                            {event.sub_title && (
                                                <p className="text-emerald-600 text-sm font-medium mb-3">{event.sub_title}</p>
                                            )}

                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{formatDateRange(event.start_date, event.end_date)}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <span className="text-emerald-600 text-sm font-semibold group-hover:underline">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
