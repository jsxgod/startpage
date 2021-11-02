import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Searchbar = () => {
  const [searchbarInput, setSearchbarInput] = useState("");
  return (
    <div className="searchbar">
      <form
        action="https://www.google.com/search"
        method="get"
        className="searchbar-container"
      >
        <div className="searchbar-icon-wrapper">
          <FcGoogle className="searchbar-icon" />
        </div>
        <input
          autoFocus
          type="text"
          name="q"
          value={searchbarInput}
          placeholder="Let's google!"
          onChange={(event) => setSearchbarInput(event.target.value)}
          className="searchbar-input"
        />
      </form>
    </div>
  );
};

export default Searchbar;
