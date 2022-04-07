import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, text, onClick }) => {
  const classesList = `${classes.main} ${className} `;
  return (
    <button onClick={onClick} className={classesList}>
      {text}
    </button>
  );
};

export default Button;
