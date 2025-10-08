// /context/calendarEventsContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { eventType } from '@/types';
import { fetchGoogleCalendarEvents } from '@/lib/actions/events'; // ⭐️ Import your Server Action here ⭐️

// Define the type for the context value
interface CalendarContextType {
    events: eventType[];
    loading: boolean;
    error: string | null;
    fetchEvents: () => Promise<void>; // Function to re-fetch and update events
}

// 1. Create the Context with a default (null or undefined) value
export const CalendarEventsContext = createContext<CalendarContextType | undefined>(undefined);

// 2. Define the Provider component
interface CalendarProviderProps {
    initialEvents: eventType[];
    children: ReactNode;
}

export function CalendarEventsProvider({ initialEvents, children }: CalendarProviderProps) {
    const [events, setEvents] = useState<eventType[]>(initialEvents);
    const [loading, setLoading] = useState(false); // Only used for client-side re-fetches
    const [error, setError] = useState<string | null>(null);

    // The core function to re-fetch and update state 
    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Call the same Server Action (which should handle revalidatePath if needed)
            const newEvents = await fetchGoogleCalendarEvents();
            setEvents(newEvents);
            console.log("Context updated with new events.");
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Failed to re-fetch events.";
            setError(errorMessage);
            console.error("Error re-fetching events:", e);
        } finally {
            setLoading(false);
        }
    }, []); // Dependency array is empty as it depends only on imports

    // 3. The value provided to consumers
    const contextValue: CalendarContextType = {
        events,
        loading,
        error,
        fetchEvents,
    };

    return (
        <CalendarEventsContext.Provider value={contextValue}>
            {children}
        </CalendarEventsContext.Provider>
    );
}

// 4. Custom hook for easy consumption
export function useCalendarEvents() {
    const context = useContext(CalendarEventsContext);
    if (context === undefined) {
        throw new Error('useCalendarEvents must be used within a CalendarEventsProvider');
    }
    return context;
}