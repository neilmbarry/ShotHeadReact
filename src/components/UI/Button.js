import React from "react";
import classes from "./Button.module.css";
import { motion } from "framer-motion";

const Button = ({ className, text, onClick, children }) => {
  const classesList = `${classes.main} ${className} `;
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
      {text}
      {children}
    </motion.button>
  );
};

export default Button;
