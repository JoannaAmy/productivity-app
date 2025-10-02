'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import '../styles/WelcomePg2.css';
import '../styles/header.css';
import '../styles/toggle.css';
import '../styles/style.css';
import TimeSelect from '../components/TimeSelect';
import ToggleSelect from '../components/ToggleSelect';
import TimezoneSelect from '../components/TimezoneSelect';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WelcomePg2: React.FC = () => {
  const [activeDays, setActiveDays] = useState({});

  const toggleDay = (day) => {
    setActiveDays((prev) => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  return (
    <div className="parent-container">
      <div className="header">
        <div className="title">
          Zen<span style={{ color: '#7f67be' }}>Plan</span>
        </div>
        <div className="whole-prog">
          <div className="step-count">step 2 of 3</div>
          <div className="progress-container">
            <div className="step-1 active"></div>
            <div className="step-2 active"></div>
            <div className="step-3"></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', left: '40px' }}>
        <div className="logo-container">
          <Image
            src="/icons/Group 29.svg"
            alt="ZenPlan Logo"
            className="ZP-logo"
            style={{ position: 'relative', left: '-12.4px' }}
            width={100}
            height={100}
          />
        </div>
        <div className="title">Protect your Time</div>
        <div className="subtitle">
          Define your working hours so we know when you&apos;re available for
          <br />
          meetings.
        </div>
      </div>

      <div className="availability">
             <span>
               <img className='icon' src='/icons/globe.png' alt="" />
               Timezone
             </span>
             <TimezoneSelect />
     
             <h4>
               <img className='icon' src='/icons/clock2.png' alt="" />
               Working Hours
             </h4>
     
             <div className="days">
               {weekdays.map((day) => (
                 <div className="day" key={day}>
                   <div className="inner">
                     <div>
                       <ToggleSelect
                         checked={!!activeDays[day]}
                         onChange={() => toggleDay(day)}
                       />
                       <span className="toggle-day">{day}</span>
                     </div>
     
                     {activeDays[day] ? (
                       <div className="schedule">
                         <TimeSelect /> to <TimeSelect />
                       </div>
                     ) : (
                       <div className="unavailable">Unavailable</div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>

      <div className="email-button">
        <button className="submit" type="submit">
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomePg2;