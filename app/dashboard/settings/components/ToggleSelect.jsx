import React from 'react';
import './ToggleSelect.css'; // Optional: style the switch here

function ToggleSelect({ isActive, onToggle }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isActive}
        onChange={onToggle}
      />
      <span className="slider" />
    </label>
  );
}

export default ToggleSelect;