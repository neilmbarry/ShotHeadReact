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
  drawCardsFromDeck,
  readyUp,
} from "../../controller/controller";
import { motion } from "framer-motion";

import { setFaceUpCards, leaveGame } from "../../controller/controller";
import { useSelector } from "react-redux";

const Player = React.memo(({ className, playerNumber, computer }) => {
  const { burned, deck, activePlayer, players, gameOver } = useSelector(
    (state) => state.game.value
  );
  // console.log(players[playerNumber]);
  const {
    inHandCards,
    faceDownCards,
    faceUpCards,
    name,
    hasSetFaceUpCards,
    playing,
    hasToPickUp,
  } = players[playerNumber];

  const active = activePlayer === playerNumber;
  // console.log(state);
  const classesList = `${classes.main} ${className} ${
    hasSetFaceUpCards && !active && classes.false
  }`;

  // const [hasSetFaceUpCards, sethasSetFaceUpCards] = useState(false);

  const [selected, setSelected] = useState([]);

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

  const hasValidMove = () => {
    return playValidMove(getActiveHand(), playerNumber);
  };

  const validMoveHandler = () => {
    if (!playValidMove(getActiveHand(), playerNumber, true)) {
      console.error(name, " HAS TO PICK UP!");
      setTimeout(() => {
        pickUpStackHandler();
      }, 1000);
    }
  };

  const selectCardHandler = (card) => {
    if (selected.includes(card)) {
      return setSelected((prev) => prev.filter((cards) => cards !== card));
    }
    if (!hasSetFaceUpCards) {
      if (selected.length === 3) {
        return setSelected((prev) => [...prev.slice(1, 3), card]);
      }
    }

    if (hasSetFaceUpCards) {
      if (selected.length > 0 && selected[0].value !== card.value) {
        return setSelected([card]);
      }
    }

    setSelected((prev) => [...prev, card]);
  };

  const playCardHandler = () => {
    playCards(selected, getActiveHand(), playerNumber);
    // console.log(inHandCards);
    setSelected([]);
    setTimeout(() => {
      drawCardsFromDeck(playerNumber);
    }, 800);
  };

  const pickUpStackHandler = () => {
    pickUpStack(playerNumber);
    setSelected([]);
  };

  const setFaceCardsHandler = () => {
    if (selected.length === 3) {
      setFaceUpCards(selected, playerNumber);
      // sethasSetFaceUpCards(true);
    }
    if (selected.length === 0) {
      const sortedCards = [...inHandCards].sort((a, b) => a.worth - b.worth);

      setFaceUpCards(sortedCards.slice(3, 6), playerNumber);
      // sethasSetFaceUpCards(true);
    }

    setSelected([]);
  };

  useEffect(() => {
    if (active && computer && hasSetFaceUpCards) {
      setTimeout(() => {
        // console.log("computer playing card");

        validMoveHandler();
      }, 2500);
    }

    // return clearTimeout(timeout);
    return;
  }, [active, computer, hasSetFaceUpCards, burned]);

  const faceDownHeight =
    hasSetFaceUpCards && (inHandCards.length > 0 || deck.length > 0)
      ? "60px"
      : "120px";

  // console.log(faceDownHeight);

  const sortButton = inHandCards.length !== 0 && (
    <Button text="Sort" onClick={() => sortHandler()} />
  );
  const selectFaceUpButton = !hasSetFaceUpCards && inHandCards.length > 0 && (
    <Button
      text="Select Face Up Cards"
      onClick={() => setFaceCardsHandler()}
    ></Button>
  );

  const playSelectedButton =
    (faceDownCards.length || inHandCards.length) &&
    !hasToPickUp &&
    hasSetFaceUpCards &&
    active &&
    hasValidMove() ? (
      <Button
        text={selected.length > 0 ? "Play Selected" : "Select a card..."}
        onClick={() => playCardHandler()}
      ></Button>
    ) : null;

  const pickUpStackButton = (!hasValidMove() || hasToPickUp) && active && (
    <Button
      text={"Pick Up Stack"}
      onClick={() => pickUpStackHandler()}
    ></Button>
  );

  const leaveGameButton = (
    <Button text="Leave Game" onClick={() => leaveGame(playerNumber)}></Button>
  );

  const getReadyButton = (
    <Button text="I'm Ready" onClick={() => readyUp(playerNumber)}></Button>
  );

  return (
    <motion.div className={classesList}>
      <div className={classes.tableCards} style={{ minHeight: faceDownHeight }}>
        <CardContainer
          type="faceDown"
          cards={faceDownCards}
          selected={selected}
          active={!faceUpCards && !inHandCards}
          onClick={selectCardHandler}
        />

        <CardContainer
          type="faceUp"
          cards={faceUpCards}
          selected={selected}
          active={!inHandCards}
          onClick={selectCardHandler}
        />
      </div>
      <div className={classes.playerControl}>
        <div
          className={`${classes.playerName} ${
            playing ? classes.ready : classes.notReady
          }`}
        >
          <h3>{name}</h3>
        </div>
        {sortButton}
        <InHandContainer
          type="inHand"
          cards={inHandCards}
          onClick={selectCardHandler}
          selected={selected}
          computer={computer}
        />

        {gameOver && getReadyButton}
        {!gameOver && playing && selectFaceUpButton}
        {!active && playing && !gameOver && hasSetFaceUpCards && (
          <h3>Please wait...</h3>
        )}
        {!gameOver && playing && playSelectedButton}
        {!gameOver && playing && pickUpStackButton}
        {!gameOver && !playing && <h3>Spectating...</h3>}
        {/* {!gameOver && leaveGameButton} */}
      </div>
    </motion.div>
  );
});

export default Player;
