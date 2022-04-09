import React, { useState } from "react";
import classes from "./Deck.module.css";
import Card from "../../Cards/Card";
import Button from "../../UI/Button";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [deck, setDeck] = useState(10);
  const takeCard = (quantity) => setDeck(deck - quantity);
  const tableDeck = [];
  for (let i = deck; i > 0; i--) {
    tableDeck.push(<Card className={classes.card} key={i} />);
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
