import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";
import { useSelector } from "react-redux";

import { useSocket } from "./contexts/SocketProvider";

import Home from "./components/Home/Home";

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
  hasValidMove,
  getActiveHand,
  validMove,
} from "./controller/controller";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const socket = useSocket();

  const { activePlayer, players, stack } = useSelector(
    (state) => state.game.value
  );

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
      console.log("picking up stack");
      pickUpStack(player);
    });
    socket.on("playCards", (data) => {
      console.log("aaaaaaaa");
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

  useEffect(() => {
    if (players.length === 0) return;
    const currentPlayer = players[activePlayer];
    if (!currentPlayer) return;
    if (currentPlayer.name !== "Computer") {
      return;
    }

    if (!currentPlayer.hasSetFaceUpCards) return;
    if (!currentPlayer.playing) return;
    if (currentPlayer.hasToPickUp) {
      return setTimeout(() => {
        socket.emit("pickUpStack", activePlayer);
      }, 1500);
    }

    const timeOut = setTimeout(() => {
      if (hasValidMove(getActiveHand(activePlayer), activePlayer)) {
        console.log(
          "computer playing card",
          validMove(getActiveHand(activePlayer), activePlayer)
        );
        socket.emit("playCards", {
          selected: validMove(getActiveHand(activePlayer), activePlayer),
          hand: getActiveHand(activePlayer),
          playerNumber: activePlayer,
        });
        setTimeout(() => {
          socket.emit("drawCardsFromDeck", activePlayer);
        }, 800);
      } else {
        socket.emit("pickUpStack", activePlayer);
        // pickUpStackHandler();
      }
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [players, activePlayer, socket]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home className={classes.home} />} />
        <Route
          path="/game"
          element={
            <div className={classesList}>
              <Table />
              <PlayerContainer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
