'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ToggleSelect from '../../app/dashboard/reminders/components/ToggleSelect';
import { useRouter } from 'next/navigation';

interface CreateReminderProps {
  onCreateReminder: (reminder: ReminderType) => void;
}

interface ReminderType {
  id: number;
  title: string;
  date: string;
  time: string;
  detail: string;
  repeat: string;
  status: 'active' | 'inactive';
}

const CreateReminder: React.FC<CreateReminderProps> = ({ onCreateReminder }) => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminder, setReminder] = useState('');
  const [showReminderDropdown, setShowReminderDropdown] = useState(false);

  const handleClose = () => {
    router.push('/dashboard/reminders/all');
  };

  const handleCreate = () => {
    if (!title || !date || !time || !reminder) {
      alert('Please fill in all fields');
      return;
    }

    const newReminder: ReminderType = {
      id: Date.now(),
      title,
      date,
      time,
      detail: '',
      repeat: reminder,
      status: 'active',
    };

    onCreateReminder(newReminder);
    console.log('Creating reminder:', newReminder);
    handleClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-heading">
          <h2>
            <Image src="/icons/reminder.png" alt="" width={24} height={24} className="icon" />
            Create Reminder
          </h2>
          <button onClick={handleClose}>╳</button>
        </div>

        <div className="form">
          <label htmlFor="reminder-title">Title</label>
          <input
            id="reminder-title"
            type="text"
            placeholder="Enter reminder title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="notes">Notes</label>
          <textarea name="notes" id="notes" placeholder="Add additional details (optional)" />

          <div className="date-time">
            <div>
              <label htmlFor="reminder-date">Date</label>
              <input
                id="reminder-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reminder-time">Time</label>
              <input
                id="reminder-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <label>Reminder</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-header"
              onClick={() => setShowReminderDropdown((prev) => !prev)}
            >
              {reminder || 'Select reminder'}
              <span className="dropdown-arrow">▾</span>
            </div>

            {showReminderDropdown && (
              <div className="dropdown-options">
                {['daily', 'weekly', 'monthly', 'one-time-only'].map((option) => (
                  <div
                    key={option}
                    className="dropdown-option"
                    onClick={() => {
                      setReminder(option);
                      setShowReminderDropdown(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-span">
          <ToggleSelect />
          <span>Activate reminder</span>
        </div>

        <div className="action-btns">
          <button className="cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={handleCreate}>
            Create Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateReminder