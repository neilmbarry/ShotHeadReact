import React from "react";
import classes from "./Card.module.css";

const Card = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>Card</div>;
};

export default Card;
