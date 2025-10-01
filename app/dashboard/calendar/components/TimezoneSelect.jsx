import React, { useState } from 'react';
import './TimezoneSelect.css'

const timezones = [
  'Africa/Lagos (WAT)',
  'America/New_York (EST)',
  'Europe/London (GMT)',
  'Asia/Tokyo (JST)',
  'Australia/Sydney (AEST)'
];

function TimezoneSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (tz) => {
    setSelected(tz);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selected || 'Select Timezone'}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {timezones.map((tz) => (
            <li key={tz} onClick={() => handleSelect(tz)}>
              {tz}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimezoneSelect;
