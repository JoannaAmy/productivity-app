"use client"


import '../public/assets/styles/SideBar.css';;
import caretDown from './icons/arrow-down-filled.png';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';


function SideBar() {
  const pathname = usePathname();
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);

  const openCreateEventModal = () => {
    router.push('?modal=create-events');
  };


  const handleCreateClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleOptionClick = (modalType: string) => {
  router.push(`?modal=${modalType}`);
};


  const links = [
    { href: `calendar/events`, title: 'Calendar', src: "/icons/calendar.png" },
    { href: `tasks/all`, title: 'Tasks', src: "/icons/tasks.png"},
    { href: `reminders/all`, title: 'Reminders', src: "/icons/reminder.png" }
  ]


  return (
    <div className="sidebar">
      <div className="top-sidebar">
        <h1 className="logo">
          Zen<span className="logo-purple">Plan</span>
        </h1>
        <div className="create-wrapper">
          <button className="create-btn" onClick={handleCreateClick}>+ Create</button>
          {showDropdown && (
            <div className="create-dropdown-sidebar">
              <button onClick={() => handleOptionClick('create-task')}>Add Task</button>
              <button onClick={() => handleOptionClick('create-reminder')}>Add Reminder</button>
              <button onClick={() => handleOptionClick('create-events')}>Add Event</button>
            </div>
          )}
        </div>
        <div className="sidebar-options">
          {/* <button
            className={`sidebar-option-btn ${pathname.startsWith('/calendar') ? 'selected-btn' : ''}`}
            onClick={() => router.push('/calendar/events')}
          >
            <img src='/icons/calendar.png' alt="" />
            Calendar
          </button>

          <button
            className={`sidebar-option-btn ${pathname.startsWith('/task') ? 'selected-btn' : ''}`}
            onClick={() => router.push('/task/all')}
          >
            <img src='/icons/tasks.png' alt="" />
            Task
          </button>

          <button
            className={`sidebar-option-btn ${pathname.startsWith('/reminder') ? 'selected-btn' : ''}`}
            onClick={() => router.push('/reminder/all')}
          >
            <img src='/icons/reminder.png' alt="" />
            Reminder
          </button> */}

          {links.map(({ href, title, src }) => {
            return <Link key={href} href={`/dashboard/${href}`}
              className={`sidebar-option-btn ${pathname.includes(href) ? 'selected-btn' : ''}`}>
              <img src={src} alt="" />
              {title}
            </Link>
          })}
        </div>
      </div>
      <div className="bottom-sidebar">
        <div className="bottom-options">
          {/* <button onClick={() => router.push('/settings')}> */}
            {/* <img src='/icons/settings.png' alt="" /> */}
            <Link className='sidebar-option-btn' href={"/dashboard/settings"}>
              <img src='/icons/settings.png' alt="" />

              Settings
            </Link>
            <button className='sidebar-option-btn' onClick={() => router.push('/')}>
              <img src='/icons/logout.png' alt="" />
              Log Out
            </button>

        </div>
        <hr />
        <div className="user">
          <div className="img-alternative">J</div>
          <h3 className="user-name">Jane Doe</h3>
          <img className="caret" src='/icons/arrow-down-filled.png' alt="" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;