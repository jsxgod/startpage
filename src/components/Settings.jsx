import React, { useState } from "react";
import { CloseButton } from "./";
import {
  BsArrowRightSquare as LeftArrow,
  BsArrowLeftSquare as RightArrow,
} from "react-icons/bs";

const Settings = ({ opened, openSettings }) => {
  const settings = ["Links", "Theme", "Searchbar"];
  const [selectedSetting, setSelectedSetting] = useState(0);

  const handleSettingClick = (event) => {
    setSelectedSetting(event.target.getAttribute("data-index"));
  };

  return (
    <>
      {opened && (
        <div className="settings">
          <div className="window-wrapper">
            <div className="settings-options-container">
              <div className="settings-options-wrapper">
                <div className="settings-title">Settings</div>
                {settings.map((setting, i) => (
                  <div
                    key={i}
                    data-index={i}
                    className={`settings-option ${
                      selectedSetting === i ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSetting(i)}
                  >
                    {setting}
                  </div>
                ))}
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
