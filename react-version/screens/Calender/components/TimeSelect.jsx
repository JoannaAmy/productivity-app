import React, { useState } from 'react';
import './TimeSelect.css'

function TimeSelect() {
  const [selectedHour, setSelectedHour] = useState('');
  const [open, setOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0') + ':00'
  );

  const handleSelect = (hour) => {
    setSelectedHour(hour);
    setOpen(false);
  };

  return (
    <div className="custom-time-select">
      <div className="select-box" onClick={() => setOpen(!open)}>
        {selectedHour || '00:00'}
        <span className="arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <ul className="select-options">
          {hours.map((hour) => (
            <li key={hour} onClick={() => handleSelect(hour)}>
              {hour}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimeSelect;