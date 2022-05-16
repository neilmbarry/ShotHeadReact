import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Modal = ({ className, onClose, onStartGame, children }) => {
  const classesList = `${classes.main} ${className}`;

  //   const socket = useSocket();

  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} onClick={onClose}></div>
      <div className={classesList}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
