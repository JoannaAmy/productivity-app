import React, { useState, useRef, useEffect } from 'react';
import './TimeSelect.css';

function TimeSelect() {
    const [selectedHour, setSelectedHour] = useState('');
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);

    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, '0') + ':00'
    );

    const handleSelect = (hour) => {
        setSelectedHour(hour);
        setOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div className="custom-time-select" ref={selectRef}>
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
