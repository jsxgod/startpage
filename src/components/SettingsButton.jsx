import React from "react";
import {
  IoSettingsSharp as SettingsIcon,
  IoSettingsOutline as SettingsIconOutline,
} from "react-icons/io5";

const SettingsButton = ({ openSettings }) => {
  return (
    <button className="settings-button" onClick={() => openSettings(true)}>
      <SettingsIcon className="settings-icon" />
    </button>
  );
};

export default SettingsButton;
