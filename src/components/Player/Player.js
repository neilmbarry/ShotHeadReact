import React, { useState, useEffect } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";
import InHandContainer from "../Cards/InHandContainer";
import {
  pickUpStack,
  playCards,
  sortCards,
  playValidMove,
} from "../../controller/controller";

import { myTest } from "../../controller/controller";
import { selectFaceUpCards } from "../../store/game";
import { setFaceUpCards } from "../../controller/controller";
import { useSelector } from "react-redux";

const Player = ({ className, state, playerNumber, computer }) => {
  const burned = useSelector((state) => state.game.value.burned);
  const activePlayer = useSelector((state) => state.game.value.activePlayer);
  const active = activePlayer === playerNumber;
  // console.log(state);
  const classesList = `${classes.main} ${className} ${classes[active]}`;

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
    return false;
  };

  const sortHandler = () => {
    sortCards(playerNumber);
  };

  const validMoveHandler = () => {
    if (!playValidMove(getActiveHand(), playerNumber)) {
      console.error("HAS TO PICK UP!");
      setTimeout(() => {
        pickUpStackHandler();
      }, 1000);
    }
  };

  const selectCardHandler = (card) => {
    // console.log("----->" + card);
    if (selected.includes(card)) {
      return setSelected(selected.filter((cards) => cards !== card));
    }

    if (!ready) {
      if (selected.length === 3) {
        return setSelected([...selected.slice(1, 3), card]);
      }
    }

    if (ready) {
      if (selected.length > 0 && selected[0].value !== card.value) {
        return setSelected([card]);
      }
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
    if (selected.length === 3) {
      setFaceUpCards(selected, playerNumber);
      setReady(true);
    }
    if (selected.length === 0) {
      const sortedCards = [...inHandCards].sort((a, b) => a.worth - b.worth);

      setFaceUpCards(sortedCards.slice(3, 6), playerNumber);
      setReady(true);
    }

    setSelected([]);
  };

  useEffect(() => {
    if (active && computer && ready) {
      setTimeout(() => {
        // console.log("computer playing card");

        validMoveHandler();
      }, 2500);
    }

    // return clearTimeout(timeout);
    return;
  }, [active, computer, ready, burned]);

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
        computer={computer}
      />
      {/* <Button text="Pick Up Card" onClick={addCardToHand}></Button> */}
      {!ready && (
        <Button
          text="Select Face Up Cards"
          onClick={() => setFaceCardsHandler()}
        ></Button>
      )}
      <br />

      <br />
      {(faceDownCards.length || inHandCards.length) && ready ? (
        <Button
          text={active ? "Play Selected" : "Please wait..."}
          onClick={() => playCardHandler(getActiveHand())}
        ></Button>
      ) : null}
      <br />
      {active && <Button text="Sort" onClick={() => sortHandler()} />}
      <br />
      {ready && (
        <Button
          text={active ? "Pick Up Stack" : "Please wait..."}
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
