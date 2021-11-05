import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";
import { Sparkles } from ".";

const LinksList = () => {
  /* 
  structure:
  [
    {
      title: Title
      links: [
        {
          label: label
          value:  value (http link)
        },
        ...
      ]
    },
    ...
  ]
  */
  const [selectedSection, setSelectedSection] = useState("");
  const [links, setLinks] = useState(() => {
    const localLinksData = localStorage.getItem("links");
    return localLinksData ? JSON.parse(localLinksData) : [];
  });

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const handleChangeSection = (section) => {
    if (selectedSection === section) {
      setSelectedSection("");
    } else {
      setSelectedSection(section);
      setTimeout(() => {
        document
          .getElementById(section + "-links")
          .scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <div className="links-list">
      <div className="links-sections-container">
        {links.map((section) => (
          <div className="links-section-wrapper">
            <div className="section-title-wrapper">
              <button
                className="section-button"
                onClick={() => handleChangeSection(section.title)}
              >
                {selectedSection === section.title ? <TiMinus /> : <TiPlus />}
              </button>
              <h1
                className={
                  (selectedSection === section.title ? "selected" : "") +
                  " " +
                  (localStorage.getItem("enableFlicker") ? "flicker" : "")
                }
                onClick={() => handleChangeSection(section.title)}
              >
                <Sparkles hidden={selectedSection !== section.title}>
                  {section.title}
                </Sparkles>
              </h1>
            </div>
            <AnimatePresence>
              {selectedSection === section.title && (
                <div
                  className="section-links-container"
                  id={section.title + "-links"}
                >
                  {section.links.map((link) => (
                    <motion.div
                      key={link.value + ":" + link.label}
                      initial={{ height: 0 }}
                      animate={{ height: 50 }}
                      exit={{ height: 0 }}
                      className="link-wrapper"
                    >
                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        href={link.value}
                      >
                        {link.label}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksList;
