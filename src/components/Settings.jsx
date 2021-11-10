import React, { useState } from "react";
import { CloseButton, Sparkles } from "./";
import { BsPlusLg } from "react-icons/bs";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
import { FaSave, FaFire, FaTrashAlt, FaBomb } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import IconButton from "./IconButton";
import themes from "../data/themes";

const Settings = ({ opened, openSettings }) => {
  const settings = ["Links", "Theme", "Searchbar"];
  const [selectedSetting, setSelectedSetting] = useState(0);
  const [linksEditorData, setLinksEditorData] = useState(() => {
    const localLinksData = localStorage.getItem("links");
    return localLinksData
      ? JSON.stringify(JSON.parse(localLinksData), null, 2)
      : '[\n\t{\n\t"title":\t"TITLE",\n"links": [{}]}]';
  });
  const [forwardSearchEditorData, setForwardSearchEditorData] = useState(() => {
    const localForwardSearchData = localStorage.getItem("forward-search");
    return localForwardSearchData ? JSON.parse(localForwardSearchData) : [];
  });
  const [searchInputValue, setSearchInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));
    return localTheme ? localTheme : themes[0];
  });
  const [imgLoadedFlags, setImgLoadedFlags] = useState([
    ...themes.map((theme) => false),
  ]);
  const [
    showResetAllSettingsConfirmation,
    setShowResetAllSettingsConfirmation,
  ] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [resetClicks, setResetClicks] = useState(0);

  const handleSaveSettings = () => {
    try {
      JSON.parse(linksEditorData);
      localStorage.setItem("links", linksEditorData);
      localStorage.setItem(
        "forward-search",
        JSON.stringify(forwardSearchEditorData)
      );
      localStorage.setItem("theme", JSON.stringify(selectedTheme));
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleDiscardSettings = () => {
    window.location.reload();
  };

  const checkDuplicate = (search) => {
    return (
      forwardSearchEditorData.filter((fs) => fs.search === search).length !== 0
    );
  };

  const handleAddForwardSearch = () => {
    if (searchInputValue !== "" && destinationInputValue !== "") {
      const forwardSearch = {
        search: searchInputValue,
        destination: destinationInputValue,
      };
      if (!checkDuplicate(searchInputValue)) {
        setForwardSearchEditorData((forwardSearchEditorData) => [
          ...forwardSearchEditorData,
          forwardSearch,
        ]);
      } else {
        alert("Fast Forward Search " + searchInputValue + " already exists.");
      }
    }
  };

  const handleRemoveForwardSearch = (forwardSearch) => {
    setForwardSearchEditorData((forwardSearchEditorData) => [
      ...forwardSearchEditorData.filter(
        (fs) => fs.search !== forwardSearch.search
      ),
    ]);
  };

  const handleLoadImage = (index) => {
    const temp = [...imgLoadedFlags];
    temp[index] = true;
    setImgLoadedFlags(temp);
  };

  const handleResetClick = () => {
    if (resetClicks < 3) {
      setResetClicks((resetClicks) => resetClicks + 1);
    } else {
      alert("FULL RESET");
    }
  };

  const handleCloseResetAllScreen = () => {
    setResetClicks(0);
    setShowResetAllSettingsConfirmation(false);
  };

  return (
    <>
      {opened && (
        <>
          <AnimatePresence>
            {showResetAllSettingsConfirmation && (
              <motion.div
                className="reset-all-wrapper"
                initial={{ height: 0 }}
                animate={{ height: "100vh" }}
                exit={{ y: "-100vh" }}
              >
                <div className="reset-all-container">
                  <div className="close-reset-all-button-wrapper">
                    <button
                      className="reset-all-button"
                      onClick={() => handleCloseResetAllScreen()}
                    >
                      X
                    </button>
                  </div>
                  <div className="title-wrapper">
                    <p>ARE YOU SURE YOU WANT TO RESET ALL THE SETTINGS???</p>
                  </div>
                  <div className="input-wrapper">
                    <p>TYPE YES:</p>
                    <input
                      type="text"
                      value={confirmationInput}
                      onChange={(event) =>
                        setConfirmationInput(event.target.value)
                      }
                      className="reset-all-confirmation-input"
                    />
                  </div>
                  <div className="confirm-reset-button-wrapper">
                    <button
                      className="confirm-reset-button"
                      disabled={
                        confirmationInput.trim().toLowerCase() !== "yes"
                      }
                      onClick={() => handleResetClick()}
                    >
                      <motion.span
                        className="front"
                        whileHover={{
                          y: "-2px",
                          transition: {
                            duration: 0.15,
                            ease: [0.3, 0.7, 0.4, 1],
                          },
                        }}
                        whileTap={{
                          y: "11px",
                          transition: {
                            duration: 0.1,
                            ease: [0.3, 0.7, 0.4, 1],
                          },
                        }}
                      >
                        {resetClicks === 3 ? <FaBomb /> : "GO"}
                      </motion.span>
                      <span className="edge">.</span>
                      <span className="shadow">.</span>
                    </button>
                    <div className="lights-wrapper">
                      <span
                        className={`light ${
                          resetClicks >= 1 ? "green" : "red"
                        }`}
                      ></span>
                      <span
                        className={`light ${
                          resetClicks >= 2 ? "green" : "red"
                        }`}
                      ></span>
                      <span
                        className={`light ${
                          resetClicks === 3 ? "green" : "red"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                      onChange={(event) =>
                        setLinksEditorData(event.target.value)
                      }
                    ></textarea>
                  </div>
                )}
                {settings[selectedSetting] === "Theme" && (
                  <div className="theme-settings-wrapper">
                    {themes.map((theme, i) => (
                      <div className="theme-option-wrapper">
                        <Sparkles
                          minSize={30}
                          maxSize={50}
                          showOnlyOnHover
                          hidden={selectedTheme.name === theme.name}
                        >
                          <div className="theme-preview-wrapper">
                            <AnimatePresence>
                              {imgLoadedFlags[i] === false && (
                                <motion.div
                                  className="skeleton-image"
                                  exit={{
                                    opacity: 0,
                                    transition: { duration: 0.2 },
                                  }}
                                ></motion.div>
                              )}
                            </AnimatePresence>
                            <motion.img
                              src={theme.preview}
                              alt={theme.alt}
                              onLoad={() => handleLoadImage(i)}
                              onClick={() => setSelectedTheme(theme)}
                              className={`${
                                selectedTheme.name === theme.name
                                  ? "selected"
                                  : ""
                              }`}
                            />
                          </div>
                        </Sparkles>
                        <Sparkles
                          showOnlyOnHover
                          hidden={selectedTheme.name === theme.name}
                        >
                          <IconButton
                            className={`icon 
                        }`}
                            onClick={() => setSelectedTheme(theme)}
                          >
                            {selectedTheme.name === theme.name ? (
                              <ImRadioChecked />
                            ) : (
                              <ImRadioUnchecked />
                            )}
                          </IconButton>
                        </Sparkles>
                      </div>
                    ))}
                  </div>
                )}
                {settings[selectedSetting] === "Searchbar" && (
                  <div className="searchbar-settings-wrapper">
                    <div className="searchbar-settings-forward-search-container">
                      <h2>Fast Forward Search</h2>
                      <div className="forward-search-input-container">
                        <input
                          type="text"
                          value={searchInputValue}
                          placeholder="search string"
                          className="forward-search-input"
                          onChange={(event) =>
                            setSearchInputValue(event.target.value)
                          }
                        ></input>
                        <span className="separator">:</span>
                        <input
                          type="text"
                          value={destinationInputValue}
                          placeholder="destination"
                          className="forward-search-input"
                          onChange={(event) =>
                            setDestinationInputValue(event.target.value)
                          }
                        ></input>
                        <button
                          className="forward-search-button"
                          onClick={() => handleAddForwardSearch()}
                          disabled={
                            searchInputValue === "" ||
                            destinationInputValue === ""
                          }
                        >
                          <BsPlusLg />
                        </button>
                      </div>
                      <div className="forward-search-values-container">
                        {forwardSearchEditorData.map((fs) => (
                          <div className="forward-search-value-wrapper">
                            <span className="search-value">
                              {'"' + fs.search + '"'}
                            </span>
                            <span className="separator">:</span>
                            <span className="destination-value">
                              {'"' + fs.destination + '"'}
                            </span>
                            <button
                              className="forward-search-button"
                              onClick={() => handleRemoveForwardSearch(fs)}
                            >
                              <FaTrashAlt className="settings-button-icon" />
                            </button>
                          </div>
                        ))}
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
                      onClick={() => handleDiscardSettings()}
                    >
                      <p>Discard Changes</p>
                      <FaFire className="settings-button-icon" />
                    </motion.button>
                    <motion.button
                      className="settings-button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowResetAllSettingsConfirmation(true)}
                    >
                      <p>Reset All Settings</p>
                      <FaTrashAlt className="settings-button-icon" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
