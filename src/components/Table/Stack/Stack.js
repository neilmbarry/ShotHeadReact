import React from "react";
import classes from "./Stack.module.css";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>Stack</div>;
};

export default Stack;
