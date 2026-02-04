"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    CalendarIcon,
} from "@heroicons/react/24/outline";
import Navigation from "../components/Navigation";
import Link from "next/link";
import { Event } from "./types";

interface EventsClientProps {
    initialEvents: Event[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
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
    const getCurrentEventImage = (images: string[] | null) => {
        if (images && images.length > 0) {
            return images[0];
        }
        return "/hero-bg.jpg";
    };

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
                        <div className="flex flex-wrap justify-center gap-8">
                            {initialEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                                >
                                    <Link href={`/events/${event.id}`}>
                                        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200 h-full">
                                            {/* Image */}
                                            {event.images && event.images.length > 0 ? (
                                                <div className="relative h-56 overflow-hidden">
                                                    <Image
                                                        src={getCurrentEventImage(event.images)}
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
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
