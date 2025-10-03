"use client"

// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { usePathname } from "next/navigation";
import trash from "./icons/trash.png";
import calendar from "./icons/calendar.png";
import clock from "./icons/clock2.png";
import repeat from "./icons/repeat.png";
import ToggleSelect from "./components/ToggleSelect";
// import { useOutletContext } from "react-router-dom";
import "./Reminders.css";

function Reminders() {
    const pathname = usePathname();

    // const { reminders, setReminders } = useOutletContext();

    // const handleToggle = (id) => {
    //   setReminders(prev =>
    //     prev.map(reminder =>
    //       reminder.id === id
    //         ? { ...reminder, active: !reminder.active }
    //         : reminder
    //     )
    //   );
    // };

    // const handleDelete = (id) => {
    //   setReminders(prev => prev.filter(reminder => reminder.id !== id));
    // };

    // const activeCount = reminders.filter(r => r.active).length;
    const activeCount = 0;

    // Filter based on route
    const path = pathname;
    // const filteredReminders = path.includes("/reminder/active")
    //   ? reminders.filter((r) => r.active)
    //   : path.includes("/reminder/inactive")
    //   ? reminders.filter((r) => !r.active)
    //   : reminders;

    return (
        <div className="reminders-page">
            <h2>Reminders</h2>
            <p>
                <span className="active-count">{activeCount}</span> out of{" "} 0
                {/* <span className="total-reminders">{reminders.length}</span> reminders */}
                {/* are active */}
            </p>
            <div className="reminders-list">
                {/* {filteredReminders.map((reminder) => (
          <div className="reminder" key={reminder.id}>
            <div className="reminder-left">
              <div className="reminder-desc">
                <h4>{reminder.title}</h4>
                <span
                  className={`repeat-mode repeat-mode-${reminder.repeat.replace(
                    / /g,
                    "-"
                  )}`}
                >
                  <img className="icon" src={repeat} alt="" />
                  {reminder.repeat}
                </span>
              </div>
              <div className="reminder-detail">
                <span>{reminder.detail}</span>
              </div>
              <div className="reminder-tags">
                <span>
                  <img className="icon" src={calendar} alt="" />
                  {reminder.date}
                </span>
                <span>
                  <img className="icon" src={clock} alt="" />
                  {reminder.time}
                </span>
              </div>
            </div>
            <div className="reminder-right">
              <ToggleSelect
                isActive={reminder.active}
                onToggle={() => handleToggle(reminder.id)}
              />
              <button onClick={() => handleDelete(reminder.id)}>
                <img className="icon" src={trash} alt="Delete" />
              </button>
            </div>
          </div>
        ))} */}
                <div className="no-reminders">
                    <img
                        src="/icons/no-events.png"
                        alt=""
                    />
                    <p>No Reminders</p>
                </div>
            </div>
        </div>
    );
}

export default Reminders;
