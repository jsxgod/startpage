import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  BsReddit,
  BsStackOverflow,
  BsFillFileEarmarkPdfFill,
} from "react-icons/bs";
import { SiGooglescholar, SiDuckduckgo } from "react-icons/si";
import { motion } from "framer-motion";

const Searchbar = () => {
  const [searchbarInput, setSearchbarInput] = useState("");
  const [searchOption, setSearchOption] = useState(() => {
    const localSearchOption = localStorage.getItem("searchOption");
    return localSearchOption ? localSearchOption : "";
  });
  const [engine, setEngine] = useState(() => {
    const localEngine = localStorage.getItem("engine");
    return localEngine
      ? JSON.parse(localEngine)
      : {
          name: "google",
          queryURL: "https://google.com/search?q=",
        };
  });
  const [hoverEnabled, setHoverEnabled] = useState(
    engine.name !== "googleScholar"
  );

  useEffect(() => {
    localStorage.setItem("searchOption", searchOption);
  }, [searchOption]);

  useEffect(() => {
    localStorage.setItem("engine", JSON.stringify(engine));
  }, [engine]);

  const handleSearch = () => {
    const fs = JSON.parse(localStorage.getItem("forward-search")).filter(
      (f) => f.search === searchbarInput
    )[0];

    if (fs) {
      console.log(fs.destination);
      window.location.href = "https://" + fs.destination;
    } else {
      if (engine.name === "googleScholar") {
        window.location.href = engine.queryURL + searchbarInput;
      } else if (engine.name === "google" || engine.name === "duckDuckGo") {
        if (searchOption === "reddit") {
          window.location.href =
            engine.queryURL + "site:reddit.com " + searchbarInput;
        } else if (searchOption === "stack overflow") {
          window.location.href =
            engine.queryURL + "site:stackoverflow.com " + searchbarInput;
        } else if (searchOption === "pdf") {
          window.location.href =
            engine.queryURL + "filetype:pdf " + searchbarInput;
        } else {
          window.location.href = engine.queryURL + searchbarInput;
        }
      }
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

  const toggleEngine = (engine) => {
    if (engine === "google") {
      setEngine({
        name: "duckDuckGo",
        queryURL: "https://duckduckgo.com/?q=",
      });
      setHoverEnabled(true);
    } else if (engine === "duckDuckGo") {
      setEngine({
        name: "googleScholar",
        queryURL: "https://scholar.google.com/scholar?q=",
      });
      setHoverEnabled(false);
    } else {
      setEngine({
        name: "google",
        queryURL: "https://google.com/search?q=",
      });
      setHoverEnabled(true);
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <motion.button
          className={`searchbar-option-icon-button ${
            searchOption === "reddit" && engine.name !== "googleScholar"
              ? "reddit"
              : ""
          }`}
          disabled={engine.name === "googleScholar"}
          whileHover={hoverEnabled ? { scale: 1.1 } : { scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleSearchOption("reddit")}
        >
          <BsReddit />
        </motion.button>
        <motion.button
          className={`searchbar-option-icon-button ${
            searchOption === "stack overflow" && engine.name !== "googleScholar"
              ? "stackOverflow"
              : ""
          }`}
          disabled={engine.name === "googleScholar"}
          whileHover={hoverEnabled ? { scale: 1.1 } : { scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleSearchOption("stack overflow")}
        >
          <BsStackOverflow />
        </motion.button>
        <motion.button
          className={`searchbar-option-icon-button ${
            searchOption === "pdf" && engine.name !== "googleScholar"
              ? "pdf"
              : ""
          }`}
          disabled={engine.name === "googleScholar"}
          whileHover={hoverEnabled ? { scale: 1.1 } : { scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleSearchOption("pdf")}
        >
          <BsFillFileEarmarkPdfFill />
        </motion.button>
        <motion.button
          className={`searchbar-engine-icon-button ${engine.name}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleEngine(engine.name)}
        >
          {engine.name === "google" ? (
            <FcGoogle />
          ) : engine.name === "googleScholar" ? (
            <SiGooglescholar />
          ) : (
            <SiDuckduckgo />
          )}
        </motion.button>
        <input
          autoFocus
          type="text"
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSearch();
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
