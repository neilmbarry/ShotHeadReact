import React, { useState } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";
import InHandContainer from "../Cards/InHandContainer";
import { pickUpStack, playCards } from "../../controller/controller";

import { myTest } from "../../controller/controller";
import { selectFaceUpCards } from "../../store/game";
import { setFaceUpCards } from "../../controller/controller";

const Player = ({ className, state, playerNumber }) => {
  // console.log(state);
  const classesList = `${classes.main} ${className}`;

  const [ready, setReady] = useState(false);

  const [selected, setSelected] = useState([]);

  // console.log(selected);

  const { inHandCards, faceDownCards, faceUpCards } = state;
  const getActiveHand = () => {
    if (inHandCards.length) {
      return "inHandCards";
    }
    if (faceUpCards.length) {
      return "faceUpCards";
    }
    if (faceDownCards.length) {
      return "faceDownCards";
    }
  };

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

  const pickUpStackHandler = () => {
    pickUpStack(playerNumber);
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
          active={!faceUpCards}
          onClick={selectCardHandler}
        />
        {faceUpCards && (
          <CardContainer
            type="faceUp"
            cards={faceUpCards}
            playCards={(cards) => null}
            selected={selected}
            active={!inHandCards}
            onClick={selectCardHandler}
          />
        )}
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
          text="Select Face Up Cards"
          onClick={() => setFaceCardsHandler()}
        ></Button>
      )}
      <br />
      {faceDownCards.length && ready ? (
        <Button
          text="Play Selected"
          onClick={() => playCardHandler(getActiveHand())}
        ></Button>
      ) : null}
      <br />
      {ready && (
        <Button
          text="Pick Up Stack"
          onClick={() => pickUpStackHandler()}
        ></Button>
      )}

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
