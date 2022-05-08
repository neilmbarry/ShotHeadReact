import React, { useEffect } from "react";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";

import { useSocket } from "./contexts/SocketProvider";

import {
  pickUpStack,
  playCards,
  sortCards,
  drawCardsFromDeck,
  readyUp,
  startGame,
  initializeNewGame,
  addNewPlayer,
  startNewGame,
  setFaceUpCards,
  setAppState,
  getGameState,
  setPlayer,
} from "./controller/controller";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit("getGameState");

    socket.on("shareGameState", () => {
      console.log("Sharing game state");

      socket.emit("setGameState", getGameState());
    });

    socket.on("setGameState", (state) => {
      console.log("setting game state");
      console.log(state);
      setAppState(state);
      setPlayer();
    });

    socket.on("message", (message) => {
      console.warn("CLIENT", message);
      // return;
    });
    socket.on("groupChat", (message) => {
      console.log("Someone else: ", message);
      // return;
    });
    socket.on("addPlayer", (player) => {
      console.log("here");
      console.log("New Player has joined: ", player.name);
      addNewPlayer(player.name);
    });
    socket.on("dealCards", (deck) => {
      console.log("Dealing Cards");
      startGame(deck);
    });
    socket.on("setFaceUpCards", ({ cards, player }) => {
      console.log("called");
      setFaceUpCards(cards, player);
    });
    socket.on("pickUpStack", (player) => {
      pickUpStack(player);
    });
    socket.on("playCards", (data) => {
      playCards(data.selected, data.hand, data.playerNumber);
    });
    socket.on("sortCards", (player) => {
      sortCards(player);
    });
    socket.on("drawCardsFromDeck", (player) => {
      drawCardsFromDeck(player);
    });
    socket.on("reset", () => {
      initializeNewGame();
    });
    socket.on("newGame", () => {
      startNewGame();
    });
    socket.on("readyPlayer", (player) => {
      readyUp(player);
    });
    return () => socket.disconnect();
  }, [socket]);

  return (
    <div className={classesList}>
      <Table />
      <PlayerContainer />
    </div>
  );
};

export default App;
