import React from 'react';
import './Calendar.css';
import noEvents from './no-events.png';
import calendarIcon from './icons/calendar.png';
import peopleIcon from './icons/people.png';
import clockIcon from './icons/clock.png';
import clockIcon2 from './icons/clock2.png';
import trashIcon from './icons/trash.png';
import linkIcon from './icons/link.png';

function Events({ events, onDeleteEvent }) {
  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
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
          <img src={calendarIcon} alt="" />
          This week
        </h5>
        <div className="dates-container">
          {getWeekDates().map((date, index) => {
            const isToday =
              date.toDateString() === new Date().toDateString();

            const dayName = date.toLocaleDateString('en-US', {
              weekday: 'short',
            });
            const dayNumber = date.getDate();

            const className = isToday
              ? 'today regular'
              : index < new Date().getDay()
              ? 'day-prev regular'
              : 'day-next regular';

            return (
              <div className={className} key={index}>
                {dayName} <span>{dayNumber}</span>
                {isToday && <img src={clockIcon} alt="" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="upcoming-events">
        <h5>
          <img src={calendarIcon} alt="" />
          Upcoming Events
        </h5>
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div className="event" key={index}>
                <div className="event-desc">
                  <span className="event-name">{event.title}</span>
                  <span className="status-confirmed">{event.status}</span>
                  <span className="duration">{event.duration}</span>
                  <div className="tags">
                    <span className="tag">
                      <img src={calendarIcon} alt="" />
                      {event.date}
                    </span>
                    <span className="tag">
                      <img src={clockIcon2} alt="" />
                      {event.time}
                    </span>
                    <span className="tag people">
                      <img src={peopleIcon} alt="" />
                      {event.guests.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="actions">
                  <button className="copy-link">
                    <img src={linkIcon} alt="" />
                    Copy Link
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDeleteEvent(index)}
                  >
                    <img src={trashIcon} alt="" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <img src={noEvents} alt="" />
              <p>No events scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;