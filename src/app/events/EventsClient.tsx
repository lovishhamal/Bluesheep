"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    CalendarIcon,
    UsersIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    MapPinIcon,
    InformationCircleIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useIsMobile } from "../util/useIsMobile";
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
    const isMobile = useIsMobile();
    const [currentImageIndex, setCurrentImageIndex] = useState<{
        [key: number]: number;
    }>({});

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
        return "/hero-bg.jpg"; // Fallback image
    };

    // Navigate images
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
            <Navigation currentPage="events" />

            {/* Header Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {initialEvents.length === 0 ? (
                        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-emerald-200">
                            <div className="text-6xl mb-4">🏜️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No active events</h3>
                            <p className="text-gray-600">We're currently planning some exciting new experiences. Stay tuned!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {initialEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative h-full"
                                >
                                    {/* Card Container */}
                                    <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">

                                        {/* Image Section */}
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={getCurrentEventImage(event.id, event.images)}
                                                alt={event.title || "Event image"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>

                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex flex-col items-center">
                                                <span className="text-emerald-700 font-black text-lg">
                                                    {event.start_date ? new Date(event.start_date).getDate() : "TBA"}
                                                </span>
                                                <span className="text-gray-600 text-xs font-bold uppercase">
                                                    {event.start_date ? new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' }) : ""}
                                                </span>
                                            </div>

                                            {/* Participant Badge */}
                                            {event.no_of_participant && (
                                                <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-white/20">
                                                    <UsersIcon className="w-4 h-4 text-white" />
                                                    <span className="text-white text-xs font-bold">
                                                        {event.no_of_participant} spots
                                                    </span>
                                                </div>
                                            )}

                                            {/* Gallery Controls */}
                                            {event.images && event.images.length > 1 && (
                                                <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); prevImage(event.id, event.images!.length); }}
                                                        className="bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-white transition-all shadow-lg"
                                                    >
                                                        <ChevronLeftIcon className="w-5 h-5" />
                                                    </button>
                                                    <div className="flex gap-1.5 items-center">
                                                        {event.images.map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`h-1.5 rounded-full transition-all duration-300 ${(currentImageIndex[event.id] || 0) === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); nextImage(event.id, event.images!.length); }}
                                                        className="bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-white transition-all shadow-lg"
                                                    >
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
                                                    {event.title}
                                                </h3>
                                                {event.sub_title && (
                                                    <p className="text-emerald-600 font-bold text-sm uppercase tracking-wide">
                                                        {event.sub_title}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                        <CalendarIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {formatDateRange(event.start_date, event.end_date)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                        <MapPinIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-medium">Dunai, Dolpa</span>
                                                </div>
                                            </div>

                                            <div className="relative mb-6">
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">


                                                <Link
                                                    href={`/contact?subject=Event Inquiry: ${event.title}`}
                                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-emerald-200 transition-all hover:-translate-y-0.5"
                                                >
                                                    Join Event
                                                    <CheckBadgeIcon className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Background Element for Hover */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-10 blur transition-opacity duration-300"></div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
