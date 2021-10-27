import React from "react";
import { Settings, SettingsButton } from ".";

const NavBar = ({ settingsOpened, setSettingsOpened }) => {
  return (
    <div className="navbar">
      <SettingsButton openSettings={setSettingsOpened} />
      <Settings opened={settingsOpened} openSettings={setSettingsOpened} />
    </div>
  );
};

export default NavBar;
