export const dynamic = "force-dynamic";

// const EventListClient = dynamic(() => import('../components/EventList'), {
//   ssr: false,
//   loading: () => <div>Loading...</div>, // Optional loading fallback
// });

import { eventType } from '@/types';
import '../../Calendar.css'; 
import EventListClient from '../components/EventList';
import { fetchGoogleCalendarEvents } from '@/lib/actions/events';
// Force dynamic rendering on every request, as per your original code

export default async function EventsPage() {
    let events: eventType[] = [];
    let error: string | null = null;
    let initialLoading = true;

    try {
        // SERVER-SIDE DATA FETCHING 
        events = await fetchGoogleCalendarEvents();
        initialLoading = false;
    } catch (e) {
        console.error("Server-side fetching failed:", e);
        error = e instanceof Error 
            ? e.message 
            : "An unknown error occurred while fetching initial data.";
        initialLoading = false;
    }

    // Pass the initial state to the client component
    return (
        <EventListClient 
            initialEvents={events}
            loading={initialLoading}
            error={error}
        />
    );
}

















// 'use client'

// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import '../../Calendar.css';
// import { tasksCategory } from '@/constants';
// import moment from 'moment';
// import { eventType } from '@/types';
// import { useCopyToClipboard, usePermission } from '@reactuses/core';
// import { toast } from 'react-toastify';

// export const dynamic = 'force-dynamic'; // Ensures this page isn't statically cached



// const formatDuration = (startIso: string, endIso: string): string => {
//     if (!startIso || !endIso) return 'N/A';

//     try {
//         const start = moment(startIso);
//         const end = moment(endIso);

//         // 1. Calculate the difference (duration object)
//         const duration = moment.duration(end.diff(start));

//         // 2. Extract hours and minutes
//         const hours = Math.floor(duration.asHours());
//         const minutes = duration.minutes();

//         let durationString = '';

//         if (hours > 0) {
//             durationString += `${hours} hr`;
//         }

//         // Add minutes only if there are minutes or if there are no hours (e.g., "30 min")
//         if (minutes > 0 || (minutes === 0 && hours === 0)) {
//             if (durationString.length > 0) durationString += ' ';
//             durationString += `${minutes} min`;
//         }

//         // Handle cases where start is after end, or both are the same
//         if (duration.asMilliseconds() <= 0) {
//             return '0 min';
//         }

//         return durationString.trim();

//     } catch (e) {
//         console.error("Error calculating duration with Moment:", e);
//         return 'N/A';
//     }
// };


// function Events() {
//     const getWeekDates = () => {
//         const today = new Date();
//         const dayOfWeek = today.getDay();
//         const startOfWeek = new Date(today);
//         startOfWeek.setDate(today.getDate() - dayOfWeek);

//         const week = [];
//         for (let i = 0; i < 7; i++) {
//             const date = new Date(startOfWeek);
//             date.setDate(startOfWeek.getDate() + i);
//             week.push(date);
//         }
//         return week;
//     };

//     //     {
//     //         title: "Team Meeting",
//     //         // status: "Confirmed",
//     //         // duration: "30 mins",
//     //         // type: "In-person",
//     //         time: '1:50',
//     //         date: "2023-10-01T10:00:00Z",
//     //         guestEmail: ["huh@example.com"],
//     //         notes: "Discuss project updates",
//     //         autoConfirmation: true
//     //     },
//     //     {
//     //         title: "Client Call",
//     //         status: "Confirmed",
//     //         // duration: "1 hr",
//     //         // type: "Virtual",
//     //         time: '13:50',
//     //         date: "2023-10-02T14:00:00Z",
//     //         guestEmail: ["client@example.com"],
//     //         notes: "Discuss project requirements",
//     //         autoConfirmation: true
//     //     },
//     //     {
//     //         title: "Project Review",
//     //         status: "In Progress",
//     //         // duration: "45 mins",
//     //         // type: "In-person",
//     //         time: '5:00',
//     //         date: "2023-10-03T09:00:00Z",
//     //         guestEmail: ["project@example.com"],
//     //         notes: "Review project milestones",
//     //         autoConfirmation: true
//     //     },
//     //     {
//     //         title: "Design Workshop",
//     //         status: "Confirmed",
//     //         // duration: "2 hrs",
//     //         // type: "In-person",
//     //         time: '8:50',
//     //         date: "2023-10-04T11:00:00Z",
//     //         guestEmail: ["design@example.com"],
//     //         notes: "Brainstorm design ideas",
//     //         autoConfirmation: true
//     //     },
//     //     {
//     //         title: "Sprint Planning",
//     //         // type: "Virtual",
//     //         // date: "2023-10-05T15:00:00Z",
//     //         status: "Pending",
//     //         time: '8:00',
//     //         date: "2023-10-04T11:00:00Z",
//     //         guestEmail: ["sprint@example.com"],
//     //         notes: "Plan the upcoming sprint",
//     //         autoConfirmation: true
//     //     }
//     // ];

//     const [events, setEvents] = useState<eventType[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // Call the new API route
//                 const response = await fetch('/api/calendar/get-events');

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(`Failed to fetch events: ${errorText}`);
//                 }

//                 const data: eventType[] = await response.json();
//                 console.log({ data })
//                 setEvents(data);
//             } catch (err) {
//                 console.error(err);
//                 setError("Could not load Google Calendar events. Check console for details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, []);

//     const [showDropdown, setShowDropdown] = useState(false);
//     const dropdownRef = useRef<HTMLDivElement>(null);
//     const [categoryValue, setCategoryValue] = useState('All categories');

//     const handleOptionClick = (v: string) => {
//         setCategoryValue(v);
//         setShowDropdown(false);
//         // setTasks(
//         //     v.toLowerCase() === 'all categories'
//         //         ? allTasks
//         //         : allTasks.filter((task) => {
//         //             return task.category.toLowerCase() === v.toLowerCase()
//         //         })
//         // )
//     };


//     const [text, copy] = useCopyToClipboard();
//     const permissionWrite = usePermission("clipboard-write");

//     const handleCopy = (v: string) => {
//         if (permissionWrite === 'granted') {
//             copy(v);
//             toast.success("Event link copied to clipboard!");
//         } else {
//             toast.error("Clipboard permission denied. Please allow clipboard access and try again.");
//         }
//     }

//     // State for optimistic UI update/loading
//     const [isDeleting, setIsDeleting] = useState<string | null>(null); // Stores the ID of the event currently being deleted

//     const handleDeleteEvent = async (eventId: string) => {
//         if (!confirm("Are you sure you want to delete this event from your Google Calendar?")) {
//             return;
//         }

//         setIsDeleting(eventId); // Start loading state for this event

//         try {
//             // Call the DELETE API route, passing the eventId as a query parameter
//             const response = await fetch(`/api/calendar/delete-event?eventId=${eventId}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 const errorBody = await response.json();
//                 throw new Error(errorBody.message || "Failed to delete event.");
//             }

//             // Successfully deleted: Update the local state (UI)
//             setEvents(prevEvents => prevEvents.filter(event => event?.id !== eventId));
//             toast.success("Event successfully deleted!");

//         } catch (error) {
//             console.error("Deletion Failed:", error);
//             toast.error(`Error deleting event: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
//         } finally {
//             setIsDeleting(null); // Clear loading state
//         }
//     };

//     return (
//         <>
//             <div className="filter-wrapper" ref={dropdownRef}>
//                 <button onClick={() => setShowDropdown(prev => !prev)} className="filter-header">
//                     {categoryValue}
//                     <img src='/icons/filter-arrow-down.png' alt="" />
//                 </button>
//                 {showDropdown && (
//                     <div className="filter-dropdown">
//                         {['All categories', ...tasksCategory].map((category) => (
//                             <button key={category} onClick={() => handleOptionClick(category)}>{category}</button>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <div className="events">
//                 <div className="dates-panel">
//                     <h5>
//                         <Image src="/icons/calendar.png" alt="" width={20} height={20} />
//                         This week
//                     </h5>
//                     <div className="dates-container">
//                         {getWeekDates().map((date, index) => {
//                             const isToday = date.toDateString() === new Date().toDateString();
//                             const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
//                             const dayNumber = date.getDate();

//                             const className = isToday
//                                 ? 'today regular'
//                                 : index < new Date().getDay()
//                                     ? 'day-prev regular'
//                                     : 'day-next regular';

//                             return (
//                                 <div className={className} key={index}>
//                                     {dayName} <span>{dayNumber}</span>
//                                     {isToday && <Image src="/icons/clock.png" alt="" width={16} height={16} />}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>


//                 <div className="upcoming-events">
//                     <h5>
//                         <Image src="/icons/calendar.png" alt="" width={20} height={20} />
//                         Upcoming Events
//                     </h5>
//                     <div className="events-container">
//                         {loading ? (
//                             <div className="event-list-loading">Loading calendar events...</div>
//                         ) : error ? (
//                             <div className="event-list-error">Error: {error}</div>
//                         ) : events.length === 0 ? (
//                             <div className="event-list-empty">No upcoming events found in your Google Calendar for the next month.</div>
//                         ) : (
//                             events.length > 0 ? (
//                                 events.map((evt, idx) => {
//                                     const duration = formatDuration(evt.startTime, evt.endTime);

//                                     return <div className="event" key={idx}>
//                                         <div className="event-desc">
//                                             <span className="event-name">{evt.title}</span>
//                                             {/* <span className="status-confirmed">{evt.status}</span> */}
//                                             <span className="duration">{duration}</span>
//                                             <div className="tags">
//                                                 <span className="tag">
//                                                     <Image src="/icons/calendar.png" alt="" width={16} height={16} />
//                                                     {moment(evt.startTime).format("MMMM Do YYYY")}
//                                                 </span>
//                                                 <span className="tag">
//                                                     <Image src="/icons/clock2.png" alt="" width={16} height={16} />
//                                                     {moment(evt.startTime).format("h:mm a")} - {moment(evt.endTime).format("h:mm a")}
//                                                 </span>
//                                                 <span className="tag people">
//                                                     {evt.guestList.length > 0 &&
//                                                         <>
//                                                             <Image src="/icons/people.png" alt="" width={16} height={16} />
//                                                             {evt.guestList.join(', ')}
//                                                         </>
//                                                     }
//                                                     {evt.organizer && (
//                                                         <>
//                                                             <span> | </span>
//                                                             <span>Organizer: </span>
//                                                             {evt.organizer}
//                                                         </>
//                                                     )}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="actions">
//                                             <button onClick={() => handleCopy(evt.htmlLink as string)} className="copy-link">
//                                                 <Image src="/icons/link.png" alt="" width={16} height={16} />
//                                                 Copy Link
//                                             </button>
//                                             <button
//                                                 className="delete"
//                                                 onClick={() => handleDeleteEvent(evt.id as string)}
//                                                 disabled={isDeleting === evt.id}
//                                             >
//                                                 {
//                                                     isDeleting === evt.id
//                                                         ? <span>Deleting...</span>
//                                                         : <Image src="/icons/trash.png" alt="Delete" width={16} height={16} />
//                                                 }

//                                             </button>

//                                         </div>
//                                     </div>
//                                 })
//                             ) : (
//                                 <div className="no-events">
//                                     <img
//                                         src="/icons/no-events.png"
//                                         alt=""
//                                     />
//                                     <p>No events scheduled</p>
//                                 </div>
//                             )
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Events;



// /app/dashboard/calendar/events/page.tsx


