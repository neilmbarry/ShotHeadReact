import React from "react";
import classes from "./InHandContainer.module.css";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

const InHandContainer = ({ className, selected, cards, onClick, computer }) => {
  const classesList = `${classes.main} ${className}`;

  const displayCards = cards.map((name, i) => {
    const CardClassesList = `${classes.card} ${
      selected.includes(name) && classes.active
    }`;
    return (
      <Card
        name={name}
        key={name.name}
        onClick={onClick}
        back={computer}
        className={CardClassesList}
        selected={selected.includes(name)}
      />
    );
  });

  return (
    <>
      <motion.div className={classesList}>
        <AnimatePresence layout>{displayCards}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default InHandContainer;
