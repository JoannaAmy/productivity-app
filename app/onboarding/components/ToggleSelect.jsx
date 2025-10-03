import React from 'react';

function ToggleSelect({ checked, onChange }) {
  return (
    <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        position: 'absolute',
        cursor: 'pointer',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: checked ? '#665298' : '#ccc',
        transition: '0.4s',
        borderRadius: '34px'
      }}>
        <span style={{
          position: 'absolute',
          height: '22px',
          width: '22px',
          left: checked ? '25px' : '3px',
          bottom: '3px',
          backgroundColor: 'white',
          transition: '0.4s',
          borderRadius: '50%'
        }} />
      </span>
    </label>
  );
}

export default ToggleSelect;