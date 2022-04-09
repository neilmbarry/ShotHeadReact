import React from "react";
import classes from "./CardContainer.module.css";
import Card from "./Card";

const CardContainer = ({ className, quantity, type, cards, onClick }) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  const cardQuantityMiddle = cards.length / 2;

  const displayCards = cards.map((name, i) => (
    <Card name={name} key={name + i} onClick={onClick} />
  ));
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
