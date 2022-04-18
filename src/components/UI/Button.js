import React from "react";
import classes from "./Button.module.css";
import { motion } from "framer-motion";

const Button = ({ className, text, onClick }) => {
  const classesList = `${classes.main} ${className} `;
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.8,
          duration: 0.5,
        },
      }}
      onClick={onClick}
      className={classesList}
    >
      {text}
    </motion.button>
  );
};

export default Button;
