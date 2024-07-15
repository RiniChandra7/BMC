import React from 'react';

const ToggleSwitch = ({ isOn, handleToggle, onLabel = "True", offLabel = "False", disabled = false }) => {
  return (
    <div className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
        id={`toggle-switch`}
        type="checkbox"
        disabled={disabled}
      />
      <label className="toggle-switch-label" htmlFor={`toggle-switch`}>
        <span className="toggle-switch-inner" data-yes={onLabel} data-no={offLabel} />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
