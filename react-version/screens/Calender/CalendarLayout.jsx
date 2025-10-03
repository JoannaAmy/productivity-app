"use client"

// import { Outlet, useLocation } from 'react-router-dom';
// import React, { useState } from 'react';
// import SideBar from '../../components/SideBar';
// import CalendarHeader from '../../components/CalendarHeader';
import './Layout.css';

function CalendarLayout() {
  // const location = useLocation();
  // const showHeader = location.pathname.startsWith('/calendar/');

  // const [events, setEvents] = useState([]);

  // const handleCreateEvent = (newEvent) => {
  //   setEvents(prev => [...prev, newEvent]);
  // };

  // const handleDeleteEvent = (indexToDelete) => {
  //   setEvents(prev => prev.filter((_, index) => index !== indexToDelete));
  // };

  return (
    <div className="layout">
      Calender
      {/* <SideBar /> */}
      {/* <div className="screen">
        {showHeader && <CalendarHeader onCreateEvent={handleCreateEvent} />}
        <Outlet context={{ events, handleCreateEvent, handleDeleteEvent }} />
      </div> */}
    </div>
  );
}

export default CalendarLayout;