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
        <div className="min-h-screen bg-white">
            <Navigation currentPage="events" />

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {initialEvents.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                            <h3 className="text-2xl font-bold text-gray-900">No active events</h3>
                            <p className="text-gray-500 mt-2">Check back later for new updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {initialEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col"
                                >
                                    {/* Image Section */}
                                    {event.images && event.images.length > 0 ? (
                                        <div className="relative h-72 rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                            <Image
                                                src={getCurrentEventImage(event.id, event.images)}
                                                alt={event.title || "Event Image"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {event.images.length > 1 && (
                                                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); prevImage(event.id, event.images!.length); }}
                                                        className="bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-white transition-all shadow-lg"
                                                    >
                                                        <ChevronLeftIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); nextImage(event.id, event.images!.length); }}
                                                        className="bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-white transition-all shadow-lg"
                                                    >
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}

                                            <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-2xl shadow-sm text-center">
                                                <span className="block text-xl font-black text-gray-900 leading-none">
                                                    {event.start_date ? new Date(event.start_date).getDate() : "TBA"}
                                                </span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                                                    {event.start_date ? new Date(event.start_date).toLocaleDateString('en-US', { month: 'short' }) : ""}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-6 rounded-3xl mb-6 flex items-center gap-2">
                                            <div className="h-px flex-grow bg-emerald-100"></div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                                {event.start_date ? formatDateRange(event.start_date, event.end_date) : "Upcoming"}
                                            </div>
                                            <div className="h-px flex-grow bg-emerald-100"></div>
                                        </div>
                                    )}

                                    {/* Content Section */}
                                    <div className="px-2 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors mb-2 leading-tight">
                                                {event.title}
                                            </h3>
                                            {event.sub_title && (
                                                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {event.sub_title}
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            className="text-gray-600 text-sm mb-6 leading-relaxed ProseMirror line-clamp-4"
                                            dangerouslySetInnerHTML={{ __html: event.description || "" }}
                                        />

                                        <div className="mt-auto flex items-center gap-6 pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <CalendarIcon className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-bold uppercase tracking-wider">{formatDateRange(event.start_date, event.end_date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPinIcon className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Dunai, Dolpa</span>
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
