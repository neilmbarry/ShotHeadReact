import React from "react";
import classes from "./Burned.module.css";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>Burned</div>;
};

export default Burned;
