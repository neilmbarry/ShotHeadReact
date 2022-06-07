import React from "react";
import classes from "./HomeButton.module.css";
import { motion } from "framer-motion";

const HomeButton = ({
  className,
  text,
  onClick,
  children,
  alt,
  iconStart,
  iconEnd,
}) => {
  const classesList = `${classes.main} ${className} ${classes[alt]} `;
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          // delay: 0.4,
          duration: 0.5,
        },
      }}
      onClick={onClick}
      className={classesList}
    >
      {iconStart && <div className={classes.iconStart}>{iconStart}</div>}

      <p>{text}</p>

      {iconEnd && <div className={classes.iconEnd}>{iconEnd}</div>}
    </motion.button>
  );
};

export default HomeButton;
