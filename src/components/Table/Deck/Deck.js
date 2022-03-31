import React from "react";
import classes from "./Deck.module.css";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>Deck</div>;
};

export default Deck;
