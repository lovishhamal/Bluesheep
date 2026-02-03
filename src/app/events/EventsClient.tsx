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

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {initialEvents.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-medium text-gray-900">No active events</h3>
                            <p className="text-gray-500 mt-2">Check back later for new updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {initialEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col"
                                >
                                    {/* Image Section - Only shown if images exist */}
                                    {event.images && event.images.length > 0 && (
                                        <div className="relative h-64">
                                            <Image
                                                src={getCurrentEventImage(event.id, event.images)}
                                                alt={event.title || "Event Image"}
                                                fill
                                                className="object-cover"
                                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                                            />

                                            {event.images.length > 1 && (
                                                <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); prevImage(event.id, event.images!.length); }}
                                                        className="bg-black/50 p-2 rounded-full text-white"
                                                    >
                                                        <ChevronLeftIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); nextImage(event.id, event.images!.length); }}
                                                        className="bg-black/50 p-2 rounded-full text-white"
                                                    >
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Content Section */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {event.title}
                                            </h3>
                                            {event.sub_title && (
                                                <p className="text-emerald-600 font-medium text-sm">
                                                    {event.sub_title}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2 mb-4 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{formatDateRange(event.start_date, event.end_date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon className="w-4 h-4" />
                                                <span>Dunai, Dolpa</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                            {event.description}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                href={`/contact?subject=Event Inquiry: ${event.title}`}
                                                className="block text-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                                            >
                                                Join Event
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
