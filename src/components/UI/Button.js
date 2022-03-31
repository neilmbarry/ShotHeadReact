import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, text }) => {
  const classesList = `${classes.main} ${className}`;
  return <button className={classesList}>{text}</button>;
};

export default Button;
