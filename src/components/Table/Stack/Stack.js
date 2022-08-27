import React, { useState } from "react";
import classes from "./Stack.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import { pickUpStack, getActivePlayer } from "../../../controller/controller";
import { AnimatePresence } from "framer-motion";
import HomeButton from "../../UI/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from "../../../contexts/SocketProvider";
import { generateNewDeck } from "../../../controller/controller";
import Deck from "../Deck/Deck";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const gameState = useSelector((state) => state.game.value);
  const room = gameState.room;
  const stackState = gameState.stack;
  const loser = gameState.loser;
  const gameOver = gameState.gameOver;
  // console.log(stackState);
  const socket = useSocket();
  const dealCardsHandler = () => {
    socket.emit("dealCards", { deck: generateNewDeck(), room });
  };

  const stackOfCards = stackState.map((name, i) => {
    return (
      <Card
        className={classes.stackCard + " " + classes[`rotate${[i % 8] + ""}`]}
        name={name}
        key={name.name}
        rotate={i % 8}
        type="stack"
        onClick={() => null}
      />
    );
  });
  const startGameButton = gameOver && !loser && (
    <HomeButton
      text="Start Game"
      className={classes.play}
      onClick={() => dealCardsHandler()}
      iconEnd={<FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>}
    ></HomeButton>
  );
  return (
    <>
      <div className={classesList}>
        <div className={classes.cardsContainer}>
          {startGameButton}
          <AnimatePresence>{stackOfCards}</AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Stack;
