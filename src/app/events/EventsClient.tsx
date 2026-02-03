"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
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
    const [modalImageIndex, setModalImageIndex] = useState(0);

    // Format date range
    const formatDateRange = (start: string | null, end: string | null) => {
        if (!start) return "TBA";
        const startDate = new Date(start);
        if (!end) return startDate.toLocaleDateString('en-US', { dateStyle: 'long' });
        const endDate = new Date(end);

        if (startDate.toDateString() === endDate.toDateString()) {
            return startDate.toLocaleDateString('en-US', { dateStyle: 'long' });
        }

        return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { dateStyle: 'long' })}`;
    };

    // Get current image for an event
    const getCurrentEventImage = (eventId: number, images: string[] | null) => {
        const currentIndex = currentImageIndex[eventId] || 0;
        if (images && images.length > 0) {
            return images[currentIndex];
        }
        return "/hero-bg.jpg";
    };

    // Navigate images in grid
    const nextImage = (eventId: number, totalImages: number) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [eventId]: ((prev[eventId] || 0) + 1) % totalImages,
        }));
    };

    const prevImage = (eventId: number, totalImages: number) => {
        setCurrentImageIndex((prev) => ({
            ...prev,
            [eventId]: ((prev[eventId] || 0) - 1 + totalImages) % totalImages,
        }));
    };

    // Open modal
    const openEventModal = (event: Event) => {
        setSelectedEvent(event);
        setModalImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeEventModal = () => {
        setSelectedEvent(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
            <Navigation currentPage="events" />

            {/* Hero Header */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-emerald-700 text-sm font-semibold">Upcoming Events</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
                            Experience <span className="text-emerald-600">Dolpa</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join us for cultural celebrations and unforgettable moments at Hotel Blue Sheep Inn
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="pb-24">
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
                                    onClick={() => openEventModal(event)}
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

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={closeEventModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Image Gallery */}
                            {selectedEvent.images && selectedEvent.images.length > 0 && (
                                <div className="relative h-72 md:h-96">
                                    <Image
                                        src={selectedEvent.images[modalImageIndex]}
                                        alt={selectedEvent.title || "Event"}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                                    {/* Navigation arrows */}
                                    {selectedEvent.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setModalImageIndex((prev) => (prev - 1 + selectedEvent.images!.length) % selectedEvent.images!.length)}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all"
                                            >
                                                <ChevronLeftIcon className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={() => setModalImageIndex((prev) => (prev + 1) % selectedEvent.images!.length)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all"
                                            >
                                                <ChevronRightIcon className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image indicators */}
                                    {selectedEvent.images.length > 1 && (
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedEvent.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setModalImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === modalImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Close button */}
                                    <button
                                        onClick={closeEventModal}
                                        className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full text-white transition-all"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            )}

                            {/* Modal Content */}
                            <div className="p-8 max-h-[50vh] overflow-y-auto">
                                {!selectedEvent.images?.length && (
                                    <button
                                        onClick={closeEventModal}
                                        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition-all"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                )}

                                <div className="mb-6">
                                    <h2 className="text-3xl font-black text-gray-900 mb-2">{selectedEvent.title}</h2>
                                    {selectedEvent.sub_title && (
                                        <p className="text-emerald-600 font-semibold text-lg">{selectedEvent.sub_title}</p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
                                        <CalendarIcon className="w-5 h-5" />
                                        <span className="font-medium">{formatDateRange(selectedEvent.start_date, selectedEvent.end_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                                        <MapPinIcon className="w-5 h-5" />
                                        <span className="font-medium">Dunai, Dolpa</span>
                                    </div>
                                </div>

                                <div
                                    className="prose prose-emerald max-w-none ProseMirror"
                                    dangerouslySetInnerHTML={{ __html: selectedEvent.description || "<p>No description available.</p>" }}
                                />

                                {/* Thumbnail gallery */}
                                {selectedEvent.images && selectedEvent.images.length > 1 && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Gallery</h4>
                                        <div className="flex gap-3 overflow-x-auto pb-2">
                                            {selectedEvent.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setModalImageIndex(idx)}
                                                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${idx === modalImageIndex ? 'ring-2 ring-emerald-500 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                                                >
                                                    <Image src={img} alt="" fill className="object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
