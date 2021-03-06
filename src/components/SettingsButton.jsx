import React from "react";
import { IoSettingsSharp as SettingsIcon } from "react-icons/io5";

const SettingsButton = ({ openSettings }) => {
  return (
    <button className="settings-button">
      <SettingsIcon
        className="settings-icon"
        onClick={() => openSettings(true)}
      />
    </button>
  );
};

export default SettingsButton;
