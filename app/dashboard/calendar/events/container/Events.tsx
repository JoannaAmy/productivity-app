import React from 'react';
import Image from 'next/image';
import '../../Calendar.css';

function Events({ events, onDeleteEvent }) {
  const getWeekDates = () => {
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
  };

  return (
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
          {/* {events.length > 0 ? (
            events.map((event, index) => (
              <div className="event" key={index}>
                <div className="event-desc">
                  <span className="event-name">{event.title}</span>
                  <span className="status-confirmed">{event.status}</span>
                  <span className="duration">{event.duration}</span>
                  <div className="tags">
                    <span className="tag">
                      <Image src="/icons/calendar.png" alt="" width={16} height={16} />
                      {event.date}
                    </span>
                    <span className="tag">
                      <Image src="/icons/clock2.png" alt="" width={16} height={16} />
                      {event.time}
                    </span>
                    <span className="tag people">
                      <Image src="/icons/people.png" alt="" width={16} height={16} />
                      {event.guests.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="actions">
                  <button className="copy-link">
                    <Image src="/icons/link.png" alt="" width={16} height={16} />
                    Copy Link
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDeleteEvent(index)}
                  >
                    <Image src="/icons/trash.png" alt="Delete" width={16} height={16} />
                  </button>
                </div>
              </div>
            ))
          ) : ( */}
            <div className="no-events">
              <img
                src="/icons/no-events.png"
                alt=""
              />
              <p>No events scheduled</p>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Events;