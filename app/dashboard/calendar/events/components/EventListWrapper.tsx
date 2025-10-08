'use client';

import { eventType } from '@/types';
import EventListClient from './EventList'; // Your main client component
import { CalendarEventsProvider } from '@/context/CalendarEventsContext';
import AppModals from '@/components/AppModals/AppModals';

interface CalendarWrapperProps {
    initialEvents: eventType[];
    initialLoading: boolean;
    error: string | null;
}

export default function CalendarWrapper({ initialEvents, initialLoading, error }: CalendarWrapperProps) {
    return (
        <CalendarEventsProvider initialEvents={initialEvents}>
            {typeof window !== 'undefined' && (
                <EventListClient />
            )}
        </CalendarEventsProvider>
    );
}