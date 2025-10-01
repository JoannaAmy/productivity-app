'use client'

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import '../public/assets/styles/CalendarHeader.css';
import filter from './icons/bars-filter.png';
import angleDown from './icons/filter-arrow-down.png';
import exportIcon from './icons/export.png';
import calendarIcon from './icons/calendar.png';
import settingsIcon from './icons/settings.png'
import clockIcon from './icons/clock2.png'
import { usePathname } from 'next/navigation';
// import { useNavigate } from 'react-router-dom';

function CalendarHeader({ onCreateEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [showMeetingDropdown, setShowMeetingDropdown] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const pathname = usePathname();

  const handleEventClick = () => {
    setShowEventDropdown(prev => !prev);
  };

  const handleAddGuest = () => {
    if (guestEmail.trim() !== '') {
      setGuestList(prev => [...prev, guestEmail.trim()]);
      setGuestEmail('');
    }
  };


  const handleEventOptionClick = (type) => {
    setActiveModal(type);
    setShowEventDropdown(false);
  };

  const links = [
    {
      href: `events`,
      title: 'Events'
    },
    {
      href: `booking-lists`,
      title: 'Booking Lists'
    },
    {
      href: `availability`,
      title: 'Availability'
    },
  ]


  const linkActive = (href: string) => {
    if (pathname.includes(href)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="header">
        <div className="top">
          <div className="topleft">
            <h1 className="header-heading">Calendar & Events</h1>
            <p className="header-text">
              Manage your schedule and booking availability.
            </p>
          </div>
          <div className="topright">
            <div className="event-wrapper">
              <button className='primary-btn' onClick={handleEventClick}>+ Add Event</button>
              {showEventDropdown && (
                <div className="event-dropdown">
                  <div className="event-option" onClick={() => handleEventOptionClick('modal-two')}>
                    <h3>One-on-one</h3>
                    <p>1 host ⇒ 1 invitee</p>
                    <span>Good for interviews , chat, etc.</span>
                  </div>
                  <div className="event-option" onClick={() => handleEventOptionClick('modal-one')}>
                    <h3>Group</h3>
                    <p>1 host ⇒ Multiple invitees</p>
                    <span>Online classes, webinars, etc.</span>
                  </div>
                  <div className="event-option" onClick={() => handleEventOptionClick('modal-two')}>
                    <h3>Round robin</h3>
                    <p>Multiple hosts ⇒ 1 invitee</p>
                    <span>Distributes meetings with team</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="bottomleft">
            <div className="calendar-toggle-links">
              {
                links.map(({ href, title }) => {
                  return <Link
                    key={href}
                    href={`/dashboard/calendar/${href}`}
                    className={`calendar-toggle-link ${linkActive(href) ? 'selected-link' : ''}`}
                  >
                    {title}
                  </Link>
                })
              }
             
            </div>
          </div>

          <div className="bottomright">
            <div className="customize-btns">
              <button className="export">
                <img src={exportIcon} alt="" /> Export
              </button>
              <button className="filter">
                <img src={filter} alt="" />
                Filter
                <img className="angledown" src={angleDown} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeModal === 'modal-one' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-heading">
              <h2>Create Meeting</h2>
              <button onClick={() => setActiveModal(null)}>╳</button>
            </div>
            <div className="form">
              <label htmlFor="title">Event Title</label>
              <input
                required
                type="text"
                placeholder="Enter event title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="custom-dropdown">
                <label>Meeting Type</label>
                <div className="dropdown-header" onClick={() => setShowMeetingDropdown(prev => !prev)}>
                  {meetingType || 'Select type'}
                  <span className="dropdown-arrow">▾</span>
                </div>
                {showMeetingDropdown && (
                  <div className="dropdown-options">
                    <div onClick={() => { setMeetingType('45 mins Consultation'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      45 mins Consultation
                    </div>
                    <div onClick={() => { setMeetingType('1 hour Deep Dive'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      1 hour Deep Dive
                    </div>
                    <div onClick={() => { setMeetingType('15 mins Quick Chat'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      15 mins Quick Chat
                    </div>
                  </div>
                )}
              </div>
              <div className="date-time">
                <div className="date">
                  <label htmlFor="date">Date</label>
                  <input
                    required
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input
                    required
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea name="" id="notes" placeholder='Add meeting agenda, preparation notes or special requirements...'></textarea>
            </div>
            <div className="action-btns">
              <button className='cancel' onClick={() => setActiveModal(null)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  onCreateEvent({
                    title,
                    date,
                    time,
                    duration: meetingType,
                    guests: guestList,
                    status: 'Confirmed',
                  });
                  // Clear modal and form
                  setActiveModal(null);
                  setTitle('');
                  setDate('');
                  setTime('');
                  setMeetingType('');
                  setGuestList([]);
                }}
              >
                Create Event
              </button>
            </div>

          </div>
        </div>
      )}

      {activeModal === 'modal-two' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-heading">
              <h2> <img src={calendarIcon} alt="" className="icon" />Create Event</h2>
              <button onClick={() => setActiveModal(null)}>╳</button>
            </div>
            <div className="form">
              <label htmlFor="title">Event Title</label>
              <input
                required
                type="text"
                placeholder="Enter event title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="custom-dropdown">
                <label>Meeting Type</label>
                <div className="dropdown-header" onClick={() => setShowMeetingDropdown(prev => !prev)}>
                  {meetingType || 'Select type'}
                  <span className="dropdown-arrow">▾</span>
                </div>
                {showMeetingDropdown && (
                  <div className="dropdown-options">
                    <div onClick={() => { setMeetingType('45 mins Consultation'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      45 mins Consultation
                    </div>
                    <div onClick={() => { setMeetingType('1 hour Deep Dive'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      1 hour Deep Dive
                    </div>
                    <div onClick={() => { setMeetingType('15 mins Quick Chat'); setShowMeetingDropdown(false); }}>
                      <img src={clockIcon} alt="" className="icon" />
                      15 mins Quick Chat
                    </div>
                  </div>
                )}
              </div>
              <div className="date-time">
                <div className="date">
                  <label htmlFor="date">Date</label>
                  <input
                    required
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input
                    required
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="people">Guest Email</label>
              <div className="guest-input-group">
                <input
                  type="email"
                  placeholder="guest@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
                <button type="button" onClick={handleAddGuest}>Add</button>
              </div>
              <div className="guest-list">
                {guestList.map((email, index) => (
                  <p
                    key={index}
                    className="guests"
                    onClick={() => {
                      setGuestList(prev => prev.filter((_, i) => i !== index));
                    }}
                  >
                    {email}
                  </p>
                ))}
              </div>
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea name="" id="notes" placeholder='Add meeting agenda, preparation notes or special requirements...'></textarea>
            </div>
            <div className="confirmation">
              <img className='icon' src={settingsIcon} alt="" />
              <span>
                <h4>Auto-confirmation</h4>
                <p>
                  A confirmation email will be automatically sent to both parties when this event is created
                </p>
              </span>
            </div>
            <div className="action-btns">
              <button className='cancel' onClick={() => setActiveModal(null)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  onCreateEvent({
                    title,
                    date,
                    time,
                    duration: meetingType,
                    guests: guestList,
                    status: 'Confirmed',
                  });
                  // Clear modal and form
                  setActiveModal(null);
                  setTitle('');
                  setDate('');
                  setTime('');
                  setMeetingType('');
                  setGuestList([]);
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CalendarHeader;