import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Searchbar = () => {
  const [searchbarInput, setSearchbarInput] = useState("");
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <div className="searchbar-icon-wrapper">
          <FcGoogle className="searchbar-icon" />
        </div>
        <input
          autoFocus
          type="text"
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
