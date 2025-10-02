import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/ReminderHeader.css';
import clockIcon from './icons/clock2.png'
import angleDown from './icons/filter-arrow-down.png';
// import ToggleSelect from '../screens/Reminder/components/ToggleSelect';

function ReminderHeader({ onCreateReminder }) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reminder, setReminder] = useState('');
    const [showReminderDropdown, setShowReminderDropdown] = useState(false);

  return (
    <>
      <div className="header">
        <div className="top">
          <div className="topleft">
            <h1 className="header-heading">Reminders</h1>
            <p className="header-text">
              Manage your reminders and alerts.
            </p>
          </div>
          <div className="topright">
            <button className="primary-btn" onClick={() => setShowModal(true)}>
              + Add Reminder
            </button>
          </div>
        </div>

        <div className="bottom">
          <div className="bottomleft">
            <div className="calendar-toggle-links">
              <NavLink
                to="/reminder/all"
                className={({ isActive }) =>
                  `calendar-toggle-link ${isActive ? 'selected-link' : ''}`
                }
              >
                All
              </NavLink>
              <NavLink
                to="/reminder/active"
                className={({ isActive }) =>
                  `calendar-toggle-link ${isActive ? 'selected-link' : ''}`
                }
              >
                Active
              </NavLink>
              <NavLink
                to="/reminder/inactive"
                className={({ isActive }) =>
                  `calendar-toggle-link ${isActive ? 'selected-link' : ''}`
                }
              >
                Inactive
              </NavLink>
            </div>
          </div>

          <div className="bottomright">
            <div className="customize-btns">
              <button className="filter">
                All categories
                <img className="angledown" src={angleDown} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-heading">
              <h2>
                <img src={clockIcon} alt="" className="icon" />
                Create Reminder</h2>
              <button onClick={() => setShowModal(false)}>╳</button>
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
              <textarea name="notes" id="notes" placeholder='Add additional details (optional)'></textarea>

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
                  onClick={() => setShowReminderDropdown(prev => !prev)}
                >
                  {reminder || 'Select reminder'}
                  <span className="dropdown-arrow">▾</span>
                </div>

                {showReminderDropdown && (
                  <div className="dropdown-options">
                    {['daily', 'weekly', 'monthly', 'one-time-only'].map(option => (
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

            <div className='modal-span'>
              <ToggleSelect /> 
              <span>Activate reminder</span>
            </div>

            <div className="action-btns">
              <button className='cancel' onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  if (!title || !date || !time || !reminder) {
                    alert('Please fill in all fields');
                    return;
                  }

                  const newReminder = {
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
                  setShowModal(false);
                  setTitle('');
                  setDate('');
                  setTime('');
                  setReminder('');
                }}
              >
                Create Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReminderHeader;