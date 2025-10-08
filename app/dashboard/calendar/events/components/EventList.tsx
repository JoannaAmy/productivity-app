// /app/dashboard/calendar/events/EventList.tsx

"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { tasksCategory } from "@/constants";
import moment from "moment";
import { eventType } from "@/types";
import { useCopyToClipboard, usePermission } from "@reactuses/core";
import { toast } from "react-toastify";
import { deleteCalendarEvent } from "@/lib/actions/events";

interface EventListClientProps {
  initialEvents: eventType[];
  loading: boolean;
  error: string | null;
}

// ----------------------
// ⭐️ UTILITY FUNCTION ⭐️ (Remains client-side for usage in mapping)
// ----------------------
const formatDuration = (startIso: string, endIso: string): string => {
  if (!startIso || !endIso) return "N/A";

  try {
    const start = moment(startIso);
    const end = moment(endIso);

    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    let durationString = "";

    if (hours > 0) {
      durationString += `${hours} hr`;
    }

    if (minutes > 0 || (minutes === 0 && hours === 0)) {
      if (durationString.length > 0) durationString += " ";
      durationString += `${minutes} min`;
    }

    if (duration.asMilliseconds() <= 0) {
      return "0 min";
    }

    return durationString.trim();
  } catch (e) {
    console.error("Error calculating duration with Moment:", e);
    return "N/A";
  }
};

// ----------------------
// ⭐️ MAIN CLIENT COMPONENT ⭐️
// ----------------------
export default function EventListClient({
  initialEvents,
  loading,
  error,
}: EventListClientProps) {
  // State is initialized with props from the server
  const [events, setEvents] = useState<eventType[]>(initialEvents);
  // const [loading, setLoading] = useState(initialLoading);
  // const [error, setError] = useState<string | null>(initialError);

  // Note: The useEffect to fetch data is REMOVED as the Server Component did the initial fetch.
  // If you need a refresh mechanism later, you can re-implement a fetch here, but call a Server Action
  // to bypass the API route and benefit from revalidation.

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
  const [categoryValue, setCategoryValue] = useState("All categories");

  const handleOptionClick = (v: string) => {
    setCategoryValue(v);
    setShowDropdown(false);
    // Note: Task filtering logic is commented out in your original code, so it remains out.
  };

  const [text, copy] = useCopyToClipboard();
  const permissionWrite = usePermission("clipboard-write");

  const handleCopy = (v: string) => {
    if (permissionWrite === "granted") {
      copy(v);
      toast.success("Event link copied to clipboard!");
    } else {
      toast.error(
        "Clipboard permission denied. Please allow clipboard access and try again."
      );
    }
  };

  // State for optimistic UI update/loading
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteEvent = async (eventId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this event from your Google Calendar?"
      )
    ) {
      return;
    }

    setIsDeleting(eventId);

    try {
      const result = await deleteCalendarEvent(eventId);

      if (!result.success) {
        throw new Error(result.message);
      }

      // Successfully deleted: Update the local state (UI)
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event?.id !== eventId)
      );
      toast.success("Event successfully deleted!");
    } catch (error) {
      console.error("Deletion Failed:", error);
      toast.error(
        `Error deleting event: ${error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
 <div style={{display: 'none'}}>
       <div className="filter-wrapper" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="filter-header"
        >
          {categoryValue}
          <img src="/icons/filter-arrow-down.png" alt="" />
        </button>
        {showDropdown && (
          <div className="filter-dropdown">
            {["All categories", ...tasksCategory].map((category) => (
              <button
                key={category}
                onClick={() => handleOptionClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
 </div>

      <div className="events">
        <div className="dates-panel">
          <h5>
            <Image src="/icons/calendar.png" alt="" width={20} height={20} />
            This week
          </h5>
          <div className="dates-container">
            {getWeekDates().map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dayNumber = date.getDate();

              const className = isToday
                ? "today regular"
                : index < new Date().getDay()
                  ? "day-prev regular"
                  : "day-next regular";

              return (
                <div className={className} key={index}>
                  {dayName} <span>{dayNumber}</span>
                  {isToday && (
                    <Image
                      src="/icons/clock.png"
                      alt=""
                      width={16}
                      height={16}
                    />
                  )}
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
              <div className="event-list-loading">
                Loading calendar events...
              </div>
            ) : error ? (
              <div className="event-list-error">Error: {error}</div>
            ) : events.length === 0 ? (
              <div className="event-list-empty">
                No upcoming events found in your Google Calendar for the next
                month.
              </div>
            ) : events.length > 0 ? (
              events.map((evt, idx) => {
                const duration = formatDuration(evt.startTime, evt.endTime);

                return (
                  <div className="event" key={idx} >
                    <div className="event-desc"  style={{ width: '85%' }}>
                      <span className="event-name">{evt.title}</span>
                      <span className="duration">{duration}</span>
                      <div className="tags">
                        <span className="tag">
                          <Image
                            src="/icons/calendar.png"
                            alt=""
                            width={16}
                            height={16}
                          />
                          {moment(evt.startTime).format("MMMM Do YYYY")}
                        </span>
                        <span className="tag">
                          <Image
                            src="/icons/clock2.png"
                            alt=""
                            width={16}
                            height={16}
                          />
                          {moment(evt.startTime).format("h:mm a")} -{" "}
                          {moment(evt.endTime).format("h:mm a")}
                        </span>
                        <span className="tag people" style={{ width: '85%' }} >
                          {evt.guestList.length > 0 && (
                            <>
                              <Image
                                src="/icons/people.png"
                                alt=""
                                width={16}
                                height={16}
                              />
                              {evt.guestList.join(", ")}
                            </>
                          )}
                          {evt.organizer && (
                            <span >
                              <span> | </span>
                              <span>Organizer: </span>
                              <span> {evt.organizer}</span>
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        onClick={() => handleCopy(evt.htmlLink as string)}
                        className="copy-link"
                      >
                        <Image
                          src="/icons/link.png"
                          alt=""
                          width={16}
                          height={16}
                        />
                        Copy Link
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteEvent(evt.id as string)}
                        disabled={isDeleting === evt.id}
                      >
                        {isDeleting === evt.id ? (
                          <span>Deleting...</span>
                        ) : (
                          <Image
                            src="/icons/trash.png"
                            alt="Delete"
                            width={16}
                            height={16}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-events">
                <img src="/icons/no-events.png" alt="" />
                <p>No events scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
