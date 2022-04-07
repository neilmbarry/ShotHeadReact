import React, { useState } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";

const Player = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [inHandCards, setInHandCards] = useState([
    "2Diamonds.png",
    "9Hearts.png",
    "AceSpades.png",
  ]);
  const [faceUpCards, setFaceUpCards] = useState([
    "KingClubs.png",
    "KingDiamonds.png",
    "10Hearts.png",
  ]);
  const [faceDownCards, setFaceDownCards] = useState([
    "back.png",
    "back.png",
    "back.png",
  ]);
  const playCardsHandler = (cards, hand) => {
    return;
  };

  const playInHandHandler = () => {
    const inHandCardsTemp = [...inHandCards];
    inHandCardsTemp.pop();
    setInHandCards(inHandCardsTemp);
  };
  const playFaceUpHandler = () => {
    const faceUpTemp = [...faceUpCards];
    faceUpTemp.pop();
    setFaceUpCards(faceUpTemp);
  };
  const playFaceDownHandler = () => {
    const faceDownTemp = [...faceDownCards];
    faceDownTemp.pop();
    setFaceDownCards(faceDownTemp);
  };

  const addCardToHand = () => {
    setInHandCards([...inHandCards, "AceSpades.png"]);
  };

  return (
    <div className={classesList}>
      <h3>Neil Barry</h3>
      <div className={classes.tableCards}>
        <CardContainer
          type="faceDown"
          cards={faceDownCards}
          playCards={(cards) => playCardsHandler(cards, "faceDown")}
        />
        <CardContainer
          type="faceUp"
          cards={faceUpCards}
          playCards={(cards) => playCardsHandler(cards, "faceUp")}
        />
      </div>
      <CardContainer
        type="inHand"
        cards={inHandCards}
        playCards={(cards) => playCardsHandler(cards, "inHand")}
      />
      <Button text="Pick Up Card" onClick={addCardToHand}></Button>
      {inHandCards.length ? (
        <Button text="Play In Hand" onClick={playInHandHandler}></Button>
      ) : null}

      {!inHandCards.length && faceUpCards.length ? (
        <Button text="Play Face Up" onClick={playFaceUpHandler}></Button>
      ) : null}
      {!inHandCards.length && !faceUpCards.length ? (
        <Button text="Play Face Down" onClick={playFaceDownHandler}></Button>
      ) : null}
      {/* <Button text="Play"></Button> */}
    </div>
  );
};

export default Player;
