import React, { useState, useEffect, useCallback } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";
import InHandContainer from "../Cards/InHandContainer";
import {
  sortCards,
  validMove,
  readyUp,
  hasValidMove,
  getActiveHand,
} from "../../controller/controller";
import { motion } from "framer-motion";
import { useSocket } from "../../contexts/SocketProvider";

// import { leaveGame } from "../../controller/controller";
import { useSelector } from "react-redux";

const Player = React.memo(({ className, playerNumber, computer }) => {
  const { deck, activePlayer, players, gameOver, currentPlayer, room } =
    useSelector((state) => state.game.value);
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

  const opponent = currentPlayer !== name;

  const active = activePlayer === playerNumber;
  // console.log(state);
  const classesList = `${classes.main} ${className} ${
    hasSetFaceUpCards && !active && classes.false
  }`;

  // const [hasSetFaceUpCards, sethasSetFaceUpCards] = useState(false);

  const [selected, setSelected] = useState([]);

  const socket = useSocket();

  // const getActiveHand = () => {
  //   if (inHandCards.length) {
  //     return "inHandCards";
  //   }
  //   if (faceUpCards.length) {
  //     return "faceUpCards";
  //   }
  //   if (faceDownCards.length) {
  //     return "faceDownCards";
  //   }
  //   return false;
  // };

  const sortHandler = () => {
    sortCards(playerNumber);
  };

  const checkValidMove = () => {
    return hasValidMove(getActiveHand(playerNumber), playerNumber);
  };

  // const validMoveHandler = () => {
  //   if (!validMove(getActiveHand(), playerNumber, true)) {
  //     console.error(name, " HAS TO PICK UP!");
  //     setTimeout(() => {
  //       pickUpStackHandler();
  //     }, 1000);
  //   }
  // };

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

  const playCardHandler = (cards = selected) => {
    console.log(cards);
    socket.emit("playCards", {
      selected: cards,
      hand: getActiveHand(playerNumber),
      playerNumber,
      room,
    });

    setSelected([]);
    setTimeout(() => {
      socket.emit("drawCardsFromDeck", { playerNumber, room });
    }, 800);
  };

  const pickUpStackHandler = () => {
    socket.emit("pickUpStack", { playerNumber, room });

    setSelected([]);
  };

  const setFaceCardsHandler = useCallback(() => {
    if (selected.length === 3) {
      // setFaceUpCards(selected, playerNumber);

      socket.emit("setFaceUpCards", {
        cards: selected,
        player: playerNumber,
        room,
      });
    }
    if (selected.length === 0) {
      console.log("selecting...");
      const sortedCards = [...inHandCards]
        .sort((a, b) => a.worth - b.worth)
        .slice(3, 6);
      socket.emit("setFaceUpCards", {
        cards: sortedCards,
        player: playerNumber,
        room,
      });
      // setFaceUpCards(sortedCards, playerNumber);
    }

    setSelected([]);
  });

  const faceDownHeight =
    (hasSetFaceUpCards && (inHandCards.length > 0 || deck.length > 0)) ||
    faceDownCards.length === 0
      ? "30px"
      : "40px";

  // console.log(faceDownHeight);

  const sortButton = inHandCards.length !== 0 && !opponent && (
    <Button text="S" onClick={() => sortHandler()} />
  );
  const selectFaceUpButton = !gameOver &&
    playing &&
    !hasSetFaceUpCards &&
    inHandCards.length > 0 &&
    !opponent && (
      <Button
        text="Select Face Up Cards"
        onClick={() => setFaceCardsHandler()}
      ></Button>
    );

  const playSelectedButton =
    !gameOver &&
    playing &&
    (faceDownCards.length || inHandCards.length) &&
    !hasToPickUp &&
    hasSetFaceUpCards &&
    active &&
    !opponent &&
    checkValidMove() ? (
      <Button
        text={selected.length > 0 ? "Play Selected" : "Select a card..."}
        onClick={() => playCardHandler()}
      ></Button>
    ) : null;

  const pickUpStackButton = !gameOver &&
    playing &&
    (!checkValidMove() || hasToPickUp) &&
    active &&
    !opponent && (
      <Button
        text={"Pick Up Stack"}
        onClick={() => pickUpStackHandler()}
      ></Button>
    );

  // const leaveGameButton = (
  //   <Button text="Leave Game" onClick={() => leaveGame(playerNumber)}></Button>
  // );

  const getReadyButton = gameOver && !players[playerNumber].playing && (
    <Button
      text="I'm Ready"
      onClick={() => {
        socket.emit("readyPlayer", { playerNumber, room });
        readyUp(playerNumber);
      }}
    ></Button>
  );

  const pleaseWait = !active &&
    playing &&
    !gameOver &&
    hasSetFaceUpCards &&
    !opponent && <h3>Please wait...</h3>;

  const spectating = !gameOver && !playing && <h3>Spectating...</h3>;

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
          {sortButton}
          <h4>{name}</h4>
          {getReadyButton}
          {selectFaceUpButton}
          {playSelectedButton}
          {pickUpStackButton}
        </div>
        {/* {sortButton} */}
        {inHandCards.length > 0 && (
          <InHandContainer
            type="inHand"
            cards={inHandCards}
            onClick={selectCardHandler}
            selected={selected}
            computer={computer}
            back={currentPlayer !== name}
          />
        )}

        {pleaseWait}

        {spectating}
      </div>
    </motion.div>
  );
});

export default Player;
