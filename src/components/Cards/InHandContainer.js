import React from "react";
import classes from "./InHandContainer.module.css";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import Order from "../Order";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    transition: {
      staggerChildren: 0.5,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      staggerChildren: 2,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

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
  // const variants = {
  //   hidden: {
  //     opacity: 0,
  //     transition: {
  //       type: "spring",
  //       mass: 0.4,
  //       damping: 8,
  //       staggerChildren: 2,
  //       when: "beforeChildren",
  //     },
  //   },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       when: "beforeChildren",
  //       staggerChildren: 2,
  //     },
  //   },
  // };
  // const childVariants = {
  //   hidden: {
  //     opacity: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //   },
  // };

  return (
    <>
      <motion.div
        className={classesList}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence layout>{displayCards}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default InHandContainer;
