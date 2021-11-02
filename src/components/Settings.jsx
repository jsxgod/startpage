import React, { useEffect, useState } from "react";
import { CloseButton } from "./";
import {
  BsArrowRightSquare as LeftArrow,
  BsArrowLeftSquare as RightArrow,
  BsPlusLg,
} from "react-icons/bs";
import {
  FaSave,
  FaFire,
  FaTrashAlt,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
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
              {settings[selectedSetting] === "Searchbar" && (
                <div className="searchbar-settings-wrapper">
                  <div className="searchbar-settings-engine-selection-wrapper">
                    <h2>Select Searchbar Engine</h2>
                    <div className="engine-selection">
                      <button>
                        <FaAngleLeft />
                      </button>
                      <span>{"Google"}</span>
                      <button>
                        <FaAngleRight />
                      </button>
                    </div>
                  </div>
                  <div className="searchbar-settings-forward-search-container">
                    <h2>Fast Forward Search</h2>
                    <div className="forward-search-input-container">
                      <input
                        className="forward-search-input"
                        placeholder="search string"
                      ></input>
                      <span className="separator">:</span>
                      <input
                        className="forward-search-input"
                        placeholder="destination"
                      ></input>
                      <button className="forward-search-button">
                        <BsPlusLg />
                      </button>
                    </div>
                    <div className="forward-search-values-container">
                      <div className="forward-search-value-wrapper">
                        <span className="search-value">{'"deepl"'}</span>
                        <span className="separator">:</span>
                        <span className="destination-value">
                          {"https://deepl.com"}
                        </span>
                        <button className="forward-search-button">
                          <FaTrashAlt className="settings-button-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="buttons-area">
                <div className="buttons-container">
                  <motion.button
                    className="settings-button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSaveSettings()}
                  >
                    <p>Save Changes</p>
                    <FaSave className="settings-button-icon" />
                  </motion.button>
                  <motion.button
                    className="settings-button"
                    whileTap={{ scale: 0.9 }}
                  >
                    <p>Discard Changes</p>
                    <FaFire className="settings-button-icon" />
                  </motion.button>
                  <motion.button
                    className="settings-button"
                    whileTap={{ scale: 0.9 }}
                  >
                    <p>Reset All Settings</p>
                    <FaTrashAlt className="settings-button-icon" />
                  </motion.button>
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
