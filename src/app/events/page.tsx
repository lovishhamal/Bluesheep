import { Metadata } from "next";
import EventsClient from "./EventsClient";
import { createClient } from "../util/supabase-server";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
    title: "Events | Hotel Blue Sheep Inn",
    description:
        "Join us for exciting events at Hotel Blue Sheep Inn, Dunai. From cultural festivals to adventure workshops, discover what's happening.",
    alternates: {
        canonical: "/events/",
    },
    openGraph: {
        title: "Events | Hotel Blue Sheep Inn",
        description:
            "Join us for exciting events at Hotel Blue Sheep Inn, Dunai. From cultural festivals to adventure workshops, discover what's happening.",
        images: ["/events-og.jpg"],
    },
};

export default async function EventsPage() {
    const supabase = await createClient();

    const { data: events, error } = await supabase
        .from("event")
        .select("*")
        .eq("is_enabled", true)
        .order("start_date", { ascending: true });

    if (error) {
        console.error("Error fetching events:", error);
    }

    return <EventsClient initialEvents={events || []} />;
}
