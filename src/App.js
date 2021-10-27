import React, { useState } from "react";
import "./sass/main.scss";
import { NavBar, ToDoList } from "./components";

function App() {
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
    <div className="start-page">
      <NavBar settingsOpened={settingsOpened} setSettingsOpened={setSettingsOpened}/>
      <ToDoList />
    </div>
  );
}

export default App;
