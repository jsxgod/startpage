import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsSearch, BsBookmarkHeart, BsListCheck } from "react-icons/bs";

const wrapperVariants = {
  hide: {},
  show: { transition: { staggerChildren: 0.3 } },
  exit: { opacity: 0 },
};

const contentVariants = {
  hide: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, transition: { duration: 1 } },
};

const Configuration = ({ setConfigurationFinished }) => {
  const [showNextAnimation, setShowNextAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDefaultLocalStorageValues();
      setConfigurationFinished(true);
    }, 5000);
  }, []);

  const setDefaultLocalStorageValues = () => {
    localStorage.setItem("configured", "true");
    localStorage.setItem("enableFlicker", "true");
    //LINKS
    localStorage.setItem(
      "links",
      JSON.stringify([
        {
          title: "Reddit",
          links: [
            {
              label: "r/startpages",
              value: "https://www.reddit.com/r/startpages/",
            },
          ],
        },
      ])
    );
    //TODO
    localStorage.setItem(
      "todos",
      JSON.stringify([
        {
          key: "Hello!",
          description: "Hello!",
          group: {
            name: "heart",
            icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
            color: "#f48fb1",
            selected: false,
          },
          important: false,
          history: "",
          editMode: false,
        },
        {
          key: "Drag and drop to reorder todos (only on the main list)\n\nGroup various todos with the use of the orange important button.\n\ntip: drag the larger todo over the smaller one",
          description:
            "Drag and drop to reorder todos (only on the main list)\n\nGroup various todos with the use of the orange important button.\n\ntip: drag the larger todo over the smaller one",
          group: {
            name: "star",
            icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
            color: "#ffee58",
            selected: false,
          },
          important: true,
          history: "",
          editMode: false,
        },
        {
          key: "In the settings:\n    - edit the bookmarks\n    - configure fast forward searches\n    - select theme",
          description:
            "In the settings:\n    - edit the bookmarks\n    - configure fast forward searches\n    - select theme",
          group: {
            name: "books",
            icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
            color: "#bcaaa4",
            selected: false,
          },
          important: false,
          history: "",
          editMode: false,
        },
        {
          key: "Edit the todos to...\n\n        ...format \n                         them \n                                     hovewer you like.\n\n. . . . . . . . . . . . . . . . . . . ,,_ . . . . . . . . ,-'`-,\n. . . . . . . . . . . . . . . . . . . .\\,, '``-.__.,.,./ .,., .\\\n. . . . . . . . . . . . . . . . . . . . .|,.-;`;` . . ,.,., .,.,.,`-, . . . . . . . . . . .\n..,,,.,.,._ . . . . . . . . . . . . . . / :o;. . .;o; .['. . . . `'-.,. . . . . . . .\n['. . . . . . '`'`'`'`'*-----,.,.,.,._\\ . . . -;- . . . . '`-,._ . . . `'-., . \n'``'*----,,,,,.,.,.,.,_. . . . . . . ..\\,, . ,-,-,. . . . . ,.,. `'-, . . . .\\,. . . .\n. . . . . . . . . . . . . . ``'`'*----.,., .`'`-----'`'`'`` . . . . .`-. . . . \\\n. . . . . . . . . . . . . . . . . . . . . .`'-. . . . . . . . . . . . . . . . . . .,| . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . . ,|. . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .",
          description:
            "Edit the todos to...\n\n        ...format \n                         them \n                                     hovewer you like.\n\n. . . . . . . . . . . . . . . . . . . ,,_ . . . . . . . . ,-'`-,\n. . . . . . . . . . . . . . . . . . . .\\,, '``-.__.,.,./ .,., .\\\n. . . . . . . . . . . . . . . . . . . . .|,.-;`;` . . ,.,., .,.,.,`-, . . . . . . . . . . .\n..,,,.,.,._ . . . . . . . . . . . . . . / :o;. . .;o; .['. . . . `'-.,. . . . . . . .\n['. . . . . . '`'`'`'`'*-----,.,.,.,._\\ . . . -;- . . . . '`-,._ . . . `'-., . \n'``'*----,,,,,.,.,.,.,_. . . . . . . ..\\,, . ,-,-,. . . . . ,.,. `'-, . . . .\\,. . . .\n. . . . . . . . . . . . . . ``'`'*----.,., .`'`-----'`'`'`` . . . . .`-. . . . \\\n. . . . . . . . . . . . . . . . . . . . . .`'-. . . . . . . . . . . . . . . . . . .,| . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . . ,|. . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .\n. . . . . . . . . . . . . . . . . . . . . . . |;. . . . . . . . . . . . . . . . .,|. . . .",
          group: {
            name: "shopping",
            icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
            color: "#B388FF",
            selected: false,
          },
          important: false,
          history: "",
          editMode: false,
        },
      ])
    );
    //SEARCHBAR
    localStorage.setItem(
      "forward-search",
      JSON.stringify([
        { search: "yt", destination: "youtube.com" },
        { search: "fb", destination: "facebook.com" },
        { search: "deepl", destination: "https://www.deepl.com/pl/translator" },
      ])
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div className="configuration-wrapper" style={{ color: "white" }}>
        <motion.div
          className="content-wrapper"
          initial="hide"
          animate="show"
          exit="exit"
          variants={wrapperVariants}
        >
          {!showNextAnimation ? (
            <motion.h1
              variants={contentVariants}
              onAnimationComplete={() => setShowNextAnimation(true)}
            >
              Configuring
            </motion.h1>
          ) : (
            <motion.ul variants={wrapperVariants}>
              <motion.h2 variants={contentVariants}>
                <BsBookmarkHeart />
              </motion.h2>
              <motion.h2 variants={contentVariants}>
                <BsListCheck />
              </motion.h2>
              <motion.h2 variants={contentVariants}>
                <BsSearch />
              </motion.h2>
            </motion.ul>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Configuration;
