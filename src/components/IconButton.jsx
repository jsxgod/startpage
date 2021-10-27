import React from "react";
import { motion } from "framer-motion";

const IconButton = ({ children, className, onClick, style }) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.8 }}
      style={style}
    >
      {children}
    </motion.button>
  );
};

export default IconButton;
