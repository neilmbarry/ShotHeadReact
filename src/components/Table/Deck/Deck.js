import React, { useState } from "react";
import classes from "./Deck.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stateDeck = useSelector((state) => state.game.value.deck.length);
  const [deck, setDeck] = useState(10);

  const tableDeck = [];
  for (let i = stateDeck; i > 0; i--) {
    tableDeck.push(<Card className={classes.card} key={i} shift={i} />);
  }
  return (
    <>
      <div className={classesList}>{tableDeck}</div>
      {/* <Button text={"---"} className={classes.btn} onClick={() => takeCard(1)}>
        - - -
      </Button> */}
    </>
  );
};

export default Deck;
