import React, { useEffect } from "react";

const LoadingInfo = ({ setConfigurationFinished }) => {
  useEffect(() => {
    clearLocalStorage();
    setTimeout(() => {
      setDefaultLocalStorageValues();
      setConfigurationFinished(true);
    }, 5000);
  }, []);

  const setDefaultLocalStorageValues = () => {
    localStorage.setItem("configured", "true");
    //LINKS
    localStorage.setItem("links", "[]");
    localStorage.setItem("enableFlicker", "true");
    //TODO
    //localStorage.setItem("todos", '[{"key":"Hello!","description":"Hello!","group":{"name":"books","icon":{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"color":"#D7CCC8","selected":false},"important":true,"history":"","editMode":false}]');
    localStorage.setItem("todos", "[]");
    localStorage.setItem("completedTodos", "[]");
    localStorage.setItem("removedTodos", "[]");
    //SEARCHBAR
    localStorage.setItem(
      "engine",
      '{"name":"google","queryURL":"https://google.com/search?q="}'
    );
    localStorage.setItem("searchOption", "");
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="configuration-wrapper" style={{ color: "white" }}>
      <h1 className="configuration-title">Configuring</h1>
      <div className="configuration-elements-wrapper">
        {["links", "todo", "search engine"].map((config, i) => (
          <div
            key={"configuration-element-" + i}
            className="configuration-element"
          >
            {config}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingInfo;
