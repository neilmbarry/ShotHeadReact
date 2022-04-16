import React from "react";
import classes from "./InHandContainer.module.css";
import Card from "./Card";
import { motion } from "framer-motion";

const InHandContainer = ({ className, selected, cards, onClick, computer }) => {
  const classesList = `${classes.main} ${className}`;

  const displayCards = cards.map((name, i) => {
    const CardClassesList = `${classes.card} ${
      selected.includes(name) && classes.active
    }`;
    return (
      <Card
        name={name}
        key={name + i}
        onClick={onClick}
        back={computer}
        className={CardClassesList}
        selected={selected.includes(name)}
      />
    );
  });
  return <div className={classesList}>{displayCards}</div>;
};

export default InHandContainer;
