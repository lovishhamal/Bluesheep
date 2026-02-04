import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../util/supabase-server";
import EventDetailClient from "./EventDetailClient";
import { Event } from "../types";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createClient();

    const { data: event } = await supabase
        .from("event")
        .select("*")
        .eq("id", id)
        .single();

    if (!event) {
        return {
            title: "Event Not Found | Hotel Blue Sheep Inn",
        };
    }

    return {
        title: `${event.title} | Hotel Blue Sheep Inn`,
        description: event.description?.replace(/<[^>]*>/g, '').substring(0, 160) || "Join us for this exciting event at Hotel Blue Sheep Inn.",
        openGraph: {
            title: `${event.title} | Hotel Blue Sheep Inn`,
            description: event.description?.replace(/<[^>]*>/g, '').substring(0, 160) || "Join us for this exciting event at Hotel Blue Sheep Inn.",
            images: event.images?.[0] ? [event.images[0]] : ["/events-og.jpg"],
        },
    };
}

export default async function EventPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: event, error } = await supabase
        .from("event")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !event) {
        notFound();
    }

    return <EventDetailClient event={event as Event} />;
}
