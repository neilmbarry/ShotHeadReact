import React from "react";
import classes from "./HomeButton.module.css";
import { motion } from "framer-motion";

const HomeButton = ({ className, text, onClick, children, alt }) => {
  const classesList = `${classes.main} ${className} ${classes[alt]} `;
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.4,
          duration: 0.5,
        },
      }}
      onClick={onClick}
      className={classesList}
    >
      <h5>{children}</h5>
      <p>{text}</p>
    </motion.button>
  );
};

export default HomeButton;
