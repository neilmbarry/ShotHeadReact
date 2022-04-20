import React from "react";
import classes from "./Deck.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stateDeck = useSelector((state) => state.game.value.deck);

  const tableDeck = stateDeck.map((card, i) => (
    <Card
      className={classes.card}
      key={i}
      name={i}
      shift={i}
      onClick={() => null}
      back={true}
      type="deck"
    />
  ));

  return (
    <>
      <div className={classesList}>
        <AnimatePresence>{tableDeck}</AnimatePresence>
      </div>
    </>
  );
};

export default Deck;
