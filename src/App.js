import React, { useState, useEffect } from "react";
import "./sass/main.scss";
import { LinksList, NavBar, Searchbar, ToDoList } from "./components";

function App() {
  const [settingsOpened, setSettingsOpened] = useState(false);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    theme 
      ? document.documentElement.setAttribute("data-theme", theme.name)
      : document.documentElement.setAttribute("data-theme", "dark");
  }, [])
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
