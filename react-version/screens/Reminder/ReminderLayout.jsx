import { Outlet } from 'react-router-dom'
import React, {useState} from 'react'
import SideBar from '../../components/SideBar'
import './Layout.css'
import ReminderHeader from '../../components/ReminderHeader'

function ReminderLayout() {
  const [reminders, setReminders] = useState([]);

  const handleCreateReminder = (newReminder) => {
    setReminders(prev => [...prev, newReminder]);
  };

  return (
    <>
        <div className="layout">
          <SideBar />
          <div className='screen'>
            <ReminderHeader onCreateReminder={handleCreateReminder} />
            <Outlet context={{ reminders, setReminders }} />
          </div>
        </div>
    </>
  )
}

export default ReminderLayout
