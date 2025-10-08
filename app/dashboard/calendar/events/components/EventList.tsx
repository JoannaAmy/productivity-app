// /app/dashboard/calendar/events/EventList.tsx

'use client'

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import Image from 'next/image';
import { tasksCategory } from '@/constants';
import moment from 'moment';
import { eventType } from '@/types';
import { useCopyToClipboard, usePermission } from '@reactuses/core';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useCalendarEvents } from '@/context/CalendarEventsContext';




const formatDuration = (startIso: string, endIso: string): string => {
    if (!startIso || !endIso) return 'N/A';

    try {
        const start = moment(startIso);
        const end = moment(endIso);

        const duration = moment.duration(end.diff(start));
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();

        let durationString = '';

        if (hours > 0) {
            durationString += `${hours} hr`;
        }

        if (minutes > 0 || (minutes === 0 && hours === 0)) {
            if (durationString.length > 0) durationString += ' ';
            durationString += `${minutes} min`;
        }

        if (duration.asMilliseconds() <= 0) {
            return '0 min';
        }

        return durationString.trim();

    } catch (e) {
        console.error("Error calculating duration with Moment:", e);
        return 'N/A';
    }
};


export default function EventListClient() {
    const { events: allEvents, error, loading } = useCalendarEvents();

    // State is initialized with props from the server
    const [events, setEvents] = useState<eventType[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (allEvents && allEvents.length > 0) {
            setEvents(allEvents as eventType[]);
        }
    }, [allEvents]);

    const getWeekDates = useCallback(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            week.push(date);
        }
        return week;
    }, []);

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [categoryValue, setCategoryValue] = useState('All categories');

    const handleOptionClick = (v: string) => {
        setCategoryValue(v);
        setShowDropdown(false);
        // Note: Task filtering logic is commented out in your original code, so it remains out.
    };

    // 2. State to track if we've mounted on the client
    const [isMounted, setIsMounted] = useState(false);

    // 3. Set mounted state on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [text, copy] = useCopyToClipboard();
    const permissionWrite = usePermission("clipboard-write");

    const handleCopy = (v: string) => {
        if (permissionWrite === 'granted') {
            copy(v);
            toast.success("Event link copied to clipboard!");
        } else {
            toast.error("Clipboard permission denied. Please allow clipboard access and try again.");
        }
    }

    // State for optimistic UI update/loading
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm("Are you sure you want to delete this event from your Google Calendar?")) {
            return;
        }

        setIsDeleting(eventId);

        try {
            // Using the client-side fetch to call the DELETE API route
            const response = await fetch(`/api/calendar/delete-event?eventId=${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.message || "Failed to delete event.");
            }

            // Successfully deleted: Update the local state (UI)
            setEvents(prevEvents => prevEvents.filter(event => event?.id !== eventId));
            toast.success("Event successfully deleted!");

        } catch (error) {
            console.error("Deletion Failed:", error);
            toast.error(`Error deleting event: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
        } finally {
            setIsDeleting(null);
        }
    };

    const handleEdit = (evt: eventType) => {
        sessionStorage.setItem("editData", JSON.stringify(evt));
        router.push("?modal=edit_events");
    };


    // During SSR (isMounted is false), render a safe version.
    if (!isMounted) {
        // You can return a simplified loading state here that doesn't rely on the hooks
        return (
            <div className="events">
                <div className="event-list-loading">Loading events interface...</div>
            </div>
        );
    }

    return (
        <>
            {/* <div className="filter-wrapper" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(prev => !prev)} className="filter-header">
                    {categoryValue}
                    <img src='/icons/filter-arrow-down.png' alt="" />
                </button>
                {showDropdown && (
                    <div className="filter-dropdown">
                        {['All categories', ...tasksCategory].map((category) => (
                            <button key={category} onClick={() => handleOptionClick(category)}>{category}</button>
                        ))}
                    </div>
                )}
            </div> */}

            <div className="events">
                <div className="dates-panel">
                    <h5>
                        <Image src="/icons/calendar.png" alt="" width={20} height={20} />
                        This week
                    </h5>
                    <div className="dates-container">
                        {getWeekDates().map((date, index) => {
                            const isToday = date.toDateString() === new Date().toDateString();
                            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                            const dayNumber = date.getDate();

                            const className = isToday
                                ? 'today regular'
                                : index < new Date().getDay()
                                    ? 'day-prev regular'
                                    : 'day-next regular';

                            return (
                                <div className={className} key={index}>
                                    {dayName} <span>{dayNumber}</span>
                                    {isToday && <Image src="/icons/clock.png" alt="" width={16} height={16} />}
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className="upcoming-events">
                    <h5>
                        <Image src="/icons/calendar.png" alt="" width={20} height={20} />
                        Upcoming Events
                    </h5>
                    <div className="events-container">
                        {loading ? (
                            <div className="event-list-loading">Loading calendar events...</div>
                        ) : error ? (
                            <div className="event-list-error">Error: {error}</div>
                        ) : events.length === 0 ? (
                            <div className="event-list-empty">No upcoming events found in your Google Calendar for the next month.</div>
                        ) : (
                            events.length > 0 ? (
                                events.map((evt, idx) => {
                                    const duration = formatDuration(evt.startTime, evt.endTime);

                                    return <div className="event" key={idx}>
                                        <div className="event-desc" style={{width: '75%'}}>
                                            <span className="event-name">{evt.title}</span>
                                            <span className="duration">{duration}</span>
                                            <div className="tags">
                                                <span className="tag">
                                                    <Image src="/icons/calendar.png" alt="" width={16} height={16} />
                                                    {moment(evt.startTime).format("MMMM Do YYYY")}
                                                </span>
                                                <span className="tag">
                                                    <Image src="/icons/clock2.png" alt="" width={16} height={16} />
                                                    {moment.utc(evt.startTime).format("hh:mm a")} - {moment.utc(evt.endTime).format("hh:mm a")}
                                                </span>
                                                <span className="tag people">
                                                    {evt.guestList.length > 0 &&
                                                        <>
                                                            <Image src="/icons/people.png" alt="" width={16} height={16} />
                                                            {evt.guestList.join(', ')}
                                                        </>
                                                    }
                                                    {evt.organizer && (
                                                        <>
                                                            <span> | </span>
                                                            <span>Organizer: </span>
                                                            {evt.organizer}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <button onClick={() => handleCopy(evt.htmlLink as string)} className="copy-link">
                                                <Image src="/icons/link.png" alt="" width={16} height={16} />
                                                Copy Link
                                            </button>
                                            <button onClick={() => handleEdit(evt)} className="copy-link">
                                                <Image src="/icons/link.png" alt="" width={16} height={16} />
                                                Edit
                                            </button>
                                            <button
                                                className="delete"
                                                onClick={() => handleDeleteEvent(evt.id as string)}
                                                disabled={isDeleting === evt.id}
                                            >
                                                {
                                                    isDeleting === evt.id
                                                        ? <span>Deleting...</span>
                                                        : <Image src="/icons/trash.png" alt="Delete" width={16} height={16} />
                                                }

                                            </button>

                                        </div>
                                    </div>
                                })
                            ) : (
                                <div className="no-events">
                                    <img
                                        src="/icons/no-events.png"
                                        alt=""
                                    />
                                    <p>No events scheduled</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}