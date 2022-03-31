import React from "react";
import classes from "./CardContainer.module.css";

const CardContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>CardContainer</div>;
};

export default CardContainer;
