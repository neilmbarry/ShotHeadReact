import React from "react";
import classes from "./Deck.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stateDeck = useSelector((state) => state.game.value.deck);

  const tableDeck = stateDeck.map((card, i) => (
    <Card className={classes.card} key={card.name} shift={i} onClick={null} />
  ));

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
