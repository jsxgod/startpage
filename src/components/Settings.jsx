import React, { useEffect, useState } from "react";
import { CloseButton } from "./";
import {
  BsArrowRightSquare as LeftArrow,
  BsArrowLeftSquare as RightArrow,
} from "react-icons/bs";
import { FaSave, FaFire, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Settings = ({ opened, openSettings }) => {
  const settings = ["Links", "Theme", "Searchbar"];
  const [selectedSetting, setSelectedSetting] = useState(0);
  const [linksEditorData, setLinksEditorData] = useState(() => {
    const localLinksData = localStorage.getItem("links");
    return localLinksData
      ? JSON.stringify(JSON.parse(localLinksData), null, 2)
      : '[\n\t{\n\t"title":\t"TITLE",\n"links": [{}]}]';
  });

  const handleSettingClick = (event) => {
    setSelectedSetting(event.target.getAttribute("data-index"));
  };

  const handleSaveSettings = () => {
    try {
      JSON.parse(linksEditorData);
      localStorage.setItem("links", linksEditorData);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {opened && (
        <div className="settings">
          <div className="settings-wrapper">
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
            <div className="setting-area">
              {settings[selectedSetting] === "Links" && (
                <div className="links-editor-wrapper">
                  <textarea
                    spellCheck="false"
                    className="links-editor"
                    value={linksEditorData}
                    onChange={(event) => setLinksEditorData(event.target.value)}
                  ></textarea>
                </div>
              )}
              <div className="buttons-area">
                <div className="buttons-container">
                  <button
                    className="settings-button"
                    onClick={() => handleSaveSettings()}
                  >
                    <p>Save Changes</p>
                    <FaSave className="settings-button-icon" />
                  </button>
                  <motion.button
                    className="settings-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <p>Discard Changes</p>
                    <FaFire className="settings-button-icon" />
                  </motion.button>
                  <button className="settings-button">
                    <p>Reset All Settings</p>
                    <FaTrashAlt className="settings-button-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
