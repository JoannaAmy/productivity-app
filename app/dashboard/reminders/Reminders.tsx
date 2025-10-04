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
import { useState } from "react";

function Reminders() {
    const pathname = usePathname();

    const remindersArray = [
        {
            id: 1,
            title: "Doctor Appointment",
            detail: "Annual check-up with Dr. Smith",
            date: "2024-07-10",
            time: "10:00 AM",
            repeat: "Does not repeat",
            active: true,
        },
        {
            id: 2,
            title: "Team Meeting",
            detail: "Weekly sync with the development team",
            date: "2024-07-12",
            time: "2:00 PM",
            repeat: "Weekly",
            active: true,
        },
        {
            id: 3,
            title: "Pay Electricity Bill",
            detail: "Pay via online banking",
            date: "2024-07-15",
            time: "8:00 AM",
            repeat: "Monthly",
            active: true,
        },
        {
            id: 4,
            title: "Mom's Birthday",
            detail: "Buy flowers and call Mom",
            date: "2024-07-18",
            time: "9:00 AM",
            repeat: "Yearly",
            active: true,
        },
        {
            id: 5,
            title: "Gym Workout",
            detail: "Leg day at the gym",
            date: "2024-07-11",
            time: "6:30 PM",
            repeat: "Daily",
            active: false,
        },
        {
            id: 6,
            title: "Project Deadline",
            detail: "Submit final project to client",
            date: "2024-07-20",
            time: "11:59 PM",
            repeat: "Does not repeat",
            active: true,
        },
        {
            id: 7,
            title: "Flight to New York",
            detail: "Check in at least 2 hours early",
            date: "2024-07-25",
            time: "7:45 AM",
            repeat: "Does not repeat",
            active: true,
        },
        {
            id: 8,
            title: "Meditation",
            detail: "15-minute mindfulness practice",
            date: "2024-07-13",
            time: "7:00 AM",
            repeat: "Daily",
            active: true,
        }
    ];


    const [reminders, setReminders] = useState(remindersArray);

    const handleToggle = (id: number) => {
      setReminders(prev =>
        prev.map(reminder =>
          reminder.id === id
            ? { ...reminder, active: !reminder.active }
            : reminder
        )
      );
    };

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
                {reminders.map((reminder) => (
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
                            // isActive={reminder.active}
                            // onToggle={() => handleToggle(reminder.id)}
                            />
                            <button
                            // onClick={() => handleDelete(reminder.id)}
                            >
                                <img className="icon" src={trash} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))}
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
