import React, { useState } from "react";
import "./sass/main.scss";
import { Settings, SettingsButton } from "./components";

function App() {
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
    <div className="App">
      <SettingsButton openSettings={setSettingsOpened} />
      <Settings opened={settingsOpened} openSettings={setSettingsOpened}/>
    </div>
  );
}

export default App;
