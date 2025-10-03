import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SideBar.css';
import calendarIcon from './icons/calendar-gray.png';
import tasksIcon from './icons/tasks.png';
import reminderIcon from './icons/reminder.png';
import settingsIcons from './icons/settings.png';
import logoutIcon from './icons/logout.png';
import caretDown from './icons/arrow-down-filled.png';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom'; // invalid in nextjs 
// - import usePathname;

function SideBar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  // const location = useLocation(); - replace location with pathname
  // const pathname = usePathname();
  // so instead of location.pathname - it will pathname

  const handleCreateClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleOptionClick = (path) => {
    navigate(path);
    setShowDropdown(false);
  };


  return (
    <div className="sidebar">
      <div className="top-sidebar">
        <h1 className="logo">
          Zen<span className="logo-purple">Plan</span>
        </h1>
        <div className="create-wrapper">
          <button className="create-btn" onClick={handleCreateClick}>+ Create</button>
          {showDropdown && (
            <div className="create-dropdown">
              <button onClick={() => handleOptionClick('/task/all')}>Add Task</button>
              <button onClick={() => handleOptionClick('/reminder/all')}>Add Reminder</button>
              <button onClick={() => handleOptionClick('/calendar/event')}>Add Event</button>
            </div>
          )}
        </div>
        <div className="sidebar-options">
          <button
            className={`sidebar-option-btn ${pathname.startsWith('/calendar') ? 'selected-btn' : ''}`}
            onClick={() => navigate('/calendar/events')}
          >
            <img src={calendarIcon} alt="" />
            Calendar
          </button>

          <button
            className={`sidebar-option-btn ${pathname.startsWith('/task') ? 'selected-btn' : ''}`}
            onClick={() => navigate('/task/all')}
          >
            <img src={tasksIcon} alt="" />
            Task
          </button>

          <button
            className={`sidebar-option-btn ${pathname.startsWith('/reminder') ? 'selected-btn' : ''}`}
            onClick={() => navigate('/reminder/all')}
          >
            <img src={reminderIcon} alt="" />
            Reminder
          </button>
        </div>
      </div>
      <div className="bottom-sidebar">
        <div className="bottom-options">
          <button onClick={() => navigate('/settings')}>
            <img src={settingsIcons} alt="" />
            Settings
          </button>
          <button onClick={() => navigate('/')}>
            <img src={logoutIcon} alt="" />
            Log Out
          </button>
        </div>
        <hr />
        <div className="user">
          <div className="img-alternative">J</div>
          <h3 className="user-name">Jane Doe</h3>
          <img className="caret" src={caretDown} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;