import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Modal = ({ className, onClose, onStartGame, children }) => {
  const classesList = `${classes.main} ${className}`;

  //   const socket = useSocket();

  const variants = {
    hidden: {
      y: -50,
      opacity: 0,
      // scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      y: 0,
      opacity: 1,

      // scale: activeScale,
      transition: {
        // type: "spring",
        // delay: 0.5,
        duration: 0.3,
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      // scale: 0.9,
      transition: {
        // type: "spring",
        // delay: 0.5,
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  return ReactDOM.createPortal(
    <motion.div variants={variants}>
      <div className={classes.overlay} onClick={onClose}></div>
      <motion.div variants={variants} className={classesList}>
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById("portal")
  );
};

export default Modal;
