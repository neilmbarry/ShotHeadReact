import React from "react";
import classes from "./CardContainer.module.css";
import Card from "./Card";

const CardContainer = ({
  className,
  quantity,
  type,
  cards,
  onClick,
  active,
  selected,
}) => {
  const classesList = `${classes.main} ${className} ${classes[type]}`;
  const displayCards = cards.map((name, i) => {
    const CardClassesList = `${classes.card} ${
      selected.includes(name) && classes.active
    }`;
    return (
      <Card
        name={name}
        back={type === "faceDown"}
        key={name + i}
        onClick={onClick}
        className={CardClassesList}
      />
    );
  });

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
