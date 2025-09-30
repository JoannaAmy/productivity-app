"use client";
import { useState } from "react";

type Event = {
  summary: string;
  description: string;
};

export default function Page() {
  const [events, setEvents] = useState<Event[] | null>(null);

  const fetchEvents = async () => {
    const response = await fetch("/api/calendar");
    const data: { events: Event[] } = await response.json();
    console.log(data);
    setEvents(data.events);
  };

  return (
    <>
      <button onClick={fetchEvents}>Fetch Events</button>
      {events && (
        <ul>
          {events.map((event, index) => {
            return (
              <li key={index}>
                <h2>{event.summary}</h2>
                <p>{event.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
