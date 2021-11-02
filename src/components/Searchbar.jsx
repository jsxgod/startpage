import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsReddit, BsStackOverflow } from "react-icons/bs";
import { motion } from "framer-motion";

const Searchbar = () => {
  const [searchbarInput, setSearchbarInput] = useState("");
  const [searchOption, setSearchOption] = useState(() => {
    const localSearchOption = localStorage.getItem("searchOption");
    return localSearchOption ? localSearchOption : "";
  });

  useEffect(() => {
    localStorage.setItem("searchOption", searchOption);
  }, [searchOption]);

  const checkForwardSearch = () => {
    const fs = JSON.parse(localStorage.getItem("forward-search")).filter(
      (f) => f.search === searchbarInput
    );
    if (fs[0]) {
      console.log(fs[0].destination);
      window.location.href = "https://" + fs[0].destination;
    } else {
      window.location.href =
        "https://google.com/search?q=" + searchbarInput + " " + searchOption;
    }
  };

  const toggleSearchOption = (option) => {
    if (searchOption === "") {
      setSearchOption(option);
    } else if (searchOption === option) {
      setSearchOption("");
    } else {
      setSearchOption(option);
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <motion.button
          className={`searchbar-option-icon-button ${
            searchOption === "reddit" ? "reddit" : ""
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleSearchOption("reddit")}
        >
          <BsReddit />
        </motion.button>
        <motion.button
          className={`searchbar-option-icon-button ${
            searchOption === "stack overflow" ? "stackOverflow" : ""
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleSearchOption("stack overflow")}
        >
          <BsStackOverflow />
        </motion.button>
        <div className="searchbar-engine-icon-wrapper">
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
