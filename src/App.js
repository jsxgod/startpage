import React, { useState } from "react";
import "./sass/main.scss";
import { LinksList, NavBar, Searchbar, ToDoList } from "./components";

function App() {
  const [settingsOpened, setSettingsOpened] = useState(false);
  return (
      <div className="start-page">
        <NavBar settingsOpened={settingsOpened} setSettingsOpened={setSettingsOpened}/>
        <LinksList />
        <ToDoList />
        <Searchbar />
      </div>
  );
}

export default App;
