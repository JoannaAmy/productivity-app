import React from 'react';
import './ToggleSelect.css'; // Optional: style the switch here

interface ToggleSelectProps {
  isActive: boolean;
  onToggle: () => void;
}

function ToggleSelect({ isActive, onToggle }: ToggleSelectProps) {
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