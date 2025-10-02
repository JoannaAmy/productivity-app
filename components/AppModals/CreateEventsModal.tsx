'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CreateMeeting = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [guestList, setGuestList] = useState<string[]>([]);
  const [showMeetingDropdown, setShowMeetingDropdown] = useState(false);

  const handleClose = () => {
    router.push('/dashboard/calendar/events');
  };

  const handleCreateEvent = () => {
    if (!title || !date || !time || !meetingType) {
      alert('Please fill in all required fields');
      return;
    }

    const newEvent = {
      title,
      date,
      time,
      duration: meetingType,
      guests: guestList,
      status: 'Confirmed',
    };

    console.log('Creating event:', newEvent);
    handleClose();
    setTitle('');
    setDate('');
    setTime('');
    setMeetingType('');
    setGuestList([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>Create Meeting</h2>
          <button onClick={handleClose}>╳</button>
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
            <div
              className="dropdown-header"
              onClick={() => setShowMeetingDropdown((prev) => !prev)}
            >
              {meetingType || 'Select type'}
              <span className="dropdown-arrow">▾</span>
            </div>
            {showMeetingDropdown && (
              <div className="dropdown-options">
                {[
                  '45 mins Consultation',
                  '1 hour Deep Dive',
                  '15 mins Quick Chat',
                ].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setMeetingType(option);
                      setShowMeetingDropdown(false);
                    }}
                  >
                    <Image
                      src="/icons/clock2.png"
                      alt=""
                      className="icon"
                      width={20}
                      height={20}
                    />
                    {option}
                  </div>
                ))}
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
          <textarea
            id="notes"
            placeholder="Add meeting agenda, preparation notes or special requirements..."
          />
        </div>

        <div className="action-btns">
          <button className="cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;