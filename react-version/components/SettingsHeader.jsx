import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/CalendarHeader.css';

function CalendarHeader() {
  return (
    <>
      <div className="header">
        <div className="top">
          <div className="topleft">
            <h1 className="header-heading">Settings</h1>
            <p className="header-text">
              Manage your informations and settings.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarHeader;