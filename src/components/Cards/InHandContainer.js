import React from "react";
import classes from "./InHandContainer.module.css";
import Card from "./Card";

const InHandContainer = ({ className, selected, cards, onClick }) => {
  const classesList = `${classes.main} ${className}`;

  const displayCards = cards.map((name, i) => (
    <Card
      name={name}
      key={name + i}
      onClick={onClick}
      className={classes.card}
      selected={selected.includes(name)}
    />
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

export default InHandContainer;
