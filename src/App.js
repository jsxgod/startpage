import React, { useState, useEffect } from "react";
import "./sass/main.scss";
import {
  LinksList,
  Configuration,
  NavBar,
  Searchbar,
  ToDoList,
} from "./components";

function App() {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [configurationFinished, setConfigurationFinished] = useState(() => {
    return localStorage.getItem("configured") ? true : false;
  });

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    theme
      ? document.documentElement.setAttribute("data-theme", theme.name)
      : document.documentElement.setAttribute("data-theme", "dark");
  }, []);
  return (
    <>
      {configurationFinished ? (
        <div className="start-page">
          <NavBar
            settingsOpened={settingsOpened}
            setSettingsOpened={setSettingsOpened}
          />
          <LinksList />
          <ToDoList />
          <Searchbar />
        </div>
      ) : (
        <Configuration setConfigurationFinished={setConfigurationFinished} />
      )}
    </>
  );
}

export default App;
