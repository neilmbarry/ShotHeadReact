import React from "react";
import classes from "./CardContainer.module.css";
import Card from "./Card";

const CardContainer = ({ className, quantity, type, cards }) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  const displayCards = cards.map((name) => <Card name={name} />);
  return (
    <div className={classesList}>
      {displayCards}
      {/* <Card name="QueenHearts.png" />
      <Card name="3Spades.png" />
      <Card name="KingClubs.png" /> */}
    </div>
  );
};

export default CardContainer;
