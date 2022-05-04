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
    return localLinksData ? JSON.parse(localLinksData) : [];
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
  const [selectedLinksSection, setSelectedLinksSection] = useState(() => {
    const links = JSON.parse(localStorage.getItem("links"));
    return links ? links[0]?.title : "";
  });
  const [newSectionInputValue, setNewSectionInputValue] = useState("");
  const [newLabelInputValue, setNewLabelInputValue] = useState("");
  const [newLinkInputValue, setNewLinkInputValue] = useState("");

  const handleSaveSettings = () => {
    try {
      //JSON.parse(linksEditorData);
      localStorage.setItem("links", JSON.stringify(linksEditorData));
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
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleCloseResetAllScreen = () => {
    setResetClicks(0);
    setShowResetAllSettingsConfirmation(false);
  };

  const handleAddNewLinksSection = () => {
    if (
      !linksEditorData.find((section) => section.title === newSectionInputValue)
    ) {
      const newLinkSection = {
        title: newSectionInputValue,
        links: [],
      };
      setLinksEditorData((linksEditorData) => [
        ...linksEditorData,
        newLinkSection,
      ]);
      setSelectedLinksSection(newLinkSection.title);
      setNewSectionInputValue("");
    } else {
      alert("section already exists");
    }
  };

  const handleAddNewLink = () => {
    const shallow_copy = [...linksEditorData];
    const idx = [...linksEditorData].findIndex(
      (section) => section.title === selectedLinksSection
    );
    if (idx !== -1) {
      shallow_copy[idx].links.push({
        label: newLabelInputValue.trim(),
        value: newLinkInputValue.trim(),
      });
      setLinksEditorData(shallow_copy);
    }
  };

  const getLinks = () => {
    const temp = linksEditorData.find(
      (section) => section.title === selectedLinksSection
    );
    return temp ? temp.links : undefined;
  };

  const handleRemoveLink = (link) => {
    setLinksEditorData((previousState) => {
      const temp = linksEditorData.find(
        (section) => section.title === selectedLinksSection
      );
      const newTemp = {
        ...temp,
        links: temp.links.filter((l) => l !== link),
      };
      return previousState.map((section) =>
        section.title === selectedLinksSection ? newTemp : section
      );
    });
  };

  const handleRemoveSection = () => {
    setLinksEditorData((previousState) => {
      return previousState.filter(
        (section) => section?.title !== selectedLinksSection
      );
    });
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
                    <div className="select-link-section-wrapper">
                      <select
                        value={selectedLinksSection}
                        className="section-select"
                        onChange={(event) =>
                          setSelectedLinksSection(event.target.value)
                        }
                      >
                        {linksEditorData.map((section, i) => (
                          <option
                            key={"select-option-" + i + "-" + section}
                            value={section.title}
                          >
                            {section.title}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newSectionInputValue}
                        placeholder="add new section"
                        className="section-input"
                        onChange={(event) =>
                          setNewSectionInputValue(event.target.value)
                        }
                      />
                      <button
                        className="section-add-button"
                        onClick={() => handleAddNewLinksSection()}
                        disabled={newSectionInputValue === ""}
                      >
                        <BsPlusLg />
                      </button>
                      <button
                        className="remove-section-button"
                        onClick={() => handleRemoveSection()}
                      >
                        <FaTrashAlt className="remove-icon" />
                      </button>
                    </div>
                    <div className="add-new-link-wrapper">
                      <input
                        type="text"
                        value={newLabelInputValue}
                        placeholder="new link label"
                        className="link-input"
                        onChange={(event) =>
                          setNewLabelInputValue(event.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={newLinkInputValue}
                        placeholder="new link destination"
                        className="link-input"
                        onChange={(event) =>
                          setNewLinkInputValue(event.target.value)
                        }
                      />
                      <button
                        className="link-add-button"
                        onClick={() => handleAddNewLink()}
                        disabled={
                          newLabelInputValue === "" || newLinkInputValue === ""
                        }
                      >
                        <BsPlusLg />
                      </button>
                    </div>
                    <div className="links-editor">
                      <div className="links-container">
                        {getLinks()?.map((link, i) => (
                          <div
                            key={"link-" + i + "-" + link?.label}
                            className="link-wrapper"
                          >
                            <span className="link-label">
                              {i + ". " + link?.label}
                            </span>
                            <span className="separator">:</span>
                            <span className="link-value">{link?.value}</span>
                            <button
                              className="remove-link-button"
                              onClick={() => handleRemoveLink(link)}
                            >
                              <FaTrashAlt className="settings-button-icon" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
                            className="icon"
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
                        {forwardSearchEditorData.map((fs, i) => (
                          <div
                            key={"fs-" + i + "-" + fs.search}
                            className="forward-search-value-wrapper"
                          >
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
