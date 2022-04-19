import React from "react";
import classes from "./CardContainer.module.css";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

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
      selected.includes(name.name) && classes.active
    }`;
    return (
      <Card
        name={name}
        back={type === "faceDown"}
        key={name.name}
        onClick={onClick}
        className={CardClassesList}
        selected={selected.includes(name)}
      />
    );
  });

  return (
    <motion.div className={classesList}>
      <AnimatePresence>{displayCards}</AnimatePresence>
      {/* <Card name="QueenHearts.png" />
      <Card name="3Spades.png" />
      <Card name="KingClubs.png" /> */}
    </motion.div>
  );
};

export default CardContainer;
