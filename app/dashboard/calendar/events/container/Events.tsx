"use client"

import '../../Calendar.css';
import EventListClient from '../components/EventList';

// Force dynamic rendering on every request, as per your original code

export default function EventsPage() {

    // Adding this check here because of the useCopyToClipboard hook issue with SSR
    return typeof window !== 'undefined' ? (
        <EventListClient />
    ): <div>
        Page Loading...
    </div>;
}