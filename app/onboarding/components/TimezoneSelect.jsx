import React, { useState, useRef, useEffect } from 'react';
import './TimezoneSelect.css';

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
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (tz) => {
    setSelected(tz);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
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
