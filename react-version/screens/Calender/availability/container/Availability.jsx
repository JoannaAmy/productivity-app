import React, { useState } from 'react';
import './Calendar.css';
import globeIcon from './icons/globe.png';
import clockIcon from './icons/clock2.png';
import copyIcon from './icons/copy.png';
import TimeSelect from './components/TimeSelect';
import ToggleSelect from './components/ToggleSelect';
import TimezoneSelect from './components/TimezoneSelect';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Availability() {
  const [activeDays, setActiveDays] = useState({});

  const toggleDay = (day) => {
    setActiveDays((prev) => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <>
      <div className="availability">
        <h2>Working hours</h2>
        <span>
          <img src={globeIcon} alt="" />
          Timezone
        </span>
        <TimezoneSelect />

        <h4>
          <img src={clockIcon} alt="" />
          Weekly availability
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

              <div className="action-btns">
                {activeDays[day] ? (
                  <>
                    <button>x</button>
                    <button>＋</button>
                    <button><img src={copyIcon} alt="" /></button>
                  </>
                ) : (
                  <button>＋</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Availability;