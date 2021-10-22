import React, { useState } from "react";
import { CloseButton } from "./";
import {
  BsArrowRightSquare as LeftArrow,
  BsArrowLeftSquare as RightArrow,
} from "react-icons/bs";

const Settings = ({ opened, openSettings }) => {
  const settings = ["Links", "Theme", "Searchbar"];
  const [selectedSetting, setSelectedSetting] = useState(0);

  return (
    <>
      {opened && (
        <div className="settings">
          <div className="window-wrapper">
            <div className="settings-options-container">
              <div className="settings-options-wrapper">
                <div className="settings-option">Links</div>
                <div className="settings-option">Theme</div>
                <div className="settings-option">Searchbar</div>
              </div>
              <div className="close-button-wrapper">
                <CloseButton openSettings={openSettings} />
              </div>
            </div>
            <div className="settings-window"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
