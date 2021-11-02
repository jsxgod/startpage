import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Searchbar = () => {
  const [searchbarInput, setSearchbarInput] = useState("");

  const checkForwardSearch = () => {
    const fs = JSON.parse(localStorage.getItem("forward-search")).filter(
      (f) => f.search === searchbarInput
    );
    if (fs[0]) {
      console.log(fs[0].destination);
      window.location.href = "https://" + fs[0].destination;
    } else {
      window.location.href = "https://google.com/search?q=" + searchbarInput;
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <div className="searchbar-icon-wrapper">
          <FcGoogle className="searchbar-icon" />
        </div>
        <input
          autoFocus
          type="text"
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              checkForwardSearch();
            }
          }}
          value={searchbarInput}
          placeholder="Let's google!"
          onChange={(event) => setSearchbarInput(event.target.value)}
          className="searchbar-input"
        />
      </div>
    </div>
  );
};

export default Searchbar;
