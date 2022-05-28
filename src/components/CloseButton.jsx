import React from "react";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";

const CloseButton = ({ openSettings }) => {
  return (
    <button
      className="settings-close-button"
      onClick={() => openSettings(false)}
    >
      <CloseIcon className="close-icon" />
    </button>
  );
};

export default CloseButton;
