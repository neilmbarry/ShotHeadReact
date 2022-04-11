import React, { useState } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";
import InHandContainer from "../Cards/InHandContainer";
import { playCards } from "../../controller/controller";

import { myTest } from "../../controller/controller";
import { selectFaceUpCards } from "../../store/game";
import { setFaceUpCards } from "../../controller/controller";

const Player = ({ className, state, playerNumber }) => {
  // console.log(state);
  const classesList = `${classes.main} ${className}`;

  const [ready, setReady] = useState(false);

  const [selected, setSelected] = useState([]);

  let { inHandCards, faceDownCards, faceUpCards } = state;
  // inHandCards = inHandCards.map((card) => card.name);
  // faceDownCards = faceDownCards.map((card) => card.name);
  // faceUpCards = faceUpCards.map((card) => card.name);

  const selectCardHandler = (card) => {
    // console.log("----->" + card);
    if (selected.includes(card)) {
      return setSelected(selected.filter((cards) => cards !== card));
    }
    setSelected([...selected, card]);
  };

  const playCardHandler = (hand) => {
    playCards(selected, hand, playerNumber);
    setSelected([]);
  };

  const setFaceCardsHandler = () => {
    setFaceUpCards(selected, playerNumber);
    setReady(true);
    setSelected([]);
  };

  return (
    <div className={classesList}>
      <h3>{state.name}</h3>
      <div className={classes.tableCards}>
        <CardContainer
          type="faceDown"
          cards={faceDownCards}
          playCards={(cards) => null}
          selected={selected}
        />
        <CardContainer
          type="faceUp"
          cards={faceUpCards}
          playCards={(cards) => null}
          selected={selected}
        />
      </div>
      <InHandContainer
        type="inHand"
        cards={inHandCards}
        playCards={playCardHandler}
        onClick={selectCardHandler}
        selected={selected}
      />
      {/* <Button text="Pick Up Card" onClick={addCardToHand}></Button> */}
      {!ready && (
        <Button
          text="Place Face Up Cards"
          onClick={() => setFaceCardsHandler()}
        ></Button>
      )}
      <br />
      {inHandCards.length && ready ? (
        <Button
          text="Play In Hand"
          onClick={() => playCardHandler("inHandCards")}
        ></Button>
      ) : null}

      {/* {!inHandCardsRedux.length && faceUpCardsRedux.length ? (
        <Button text="Play Face Up" onClick={playFaceUpHandler}></Button>
      ) : null} */}
      {/* {!inHandCardsRedux.length && !faceUpCardsRedux.length ? (
        <Button text="Play Face Down" onClick={playFaceDownHandler}></Button>
      ) : null} */}
      {/* <Button text="test" onClick={myTest}></Button> */}
    </div>
  );
};

export default Player;
