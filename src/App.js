import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useSocket } from "./contexts/SocketProvider";

import Home from "./components/Home/Home";
import HomeButton from "./components/UI/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faClose } from "@fortawesome/free-solid-svg-icons";

// import { generateNewDeck, setPlayer } from "../../../controller/controller";

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
  checkActivePlayersHaveSetFaceCards,
} from "./controller/controller";
import Modal from "./components/UI/Modal";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  const socket = useSocket();

  const { activePlayer, players, stack, loser, gameOver, deck } = useSelector(
    (state) => state.game.value
  );

  console.log("RERENDERED");

  const gameOverModal = loser && (
    <Modal>
      <h2>{loser} is The ShitHead</h2>
      <HomeButton
        text="Play Again"
        className={classes.button}
        onClick={() => {
          console.log("here");
          socket.emit("newGame");
        }}
      >
        <FontAwesomeIcon icon={faPlay} />
      </HomeButton>
      <Link to="/">
        <HomeButton
          text="Quit"
          className={classes.button}
          onClick={() => initializeNewGame()}
        >
          <FontAwesomeIcon icon={faClose} />
        </HomeButton>
      </Link>
    </Modal>
  );

  const setComputerFaceUp = () => {
    const computer = players.find((player, i) => {
      return player.name === "Computer" && !player.hasSetFaceUpCards;
    });

    if (!computer) return;

    const index = players.indexOf(computer);

    const sortedCards = [...computer.inHandCards]
      .sort((a, b) => a.worth - b.worth)
      .slice(3, 6);
    setFaceUpCards(sortedCards, index);
    // socket.emit("setFaceUpCards", {
    //   cards: sortedCards,
    //   player: i,
    // });
  };

  useEffect(() => {
    if (!socket) return;

    // socket.join(room) ?

    // Change to socket.to(room).emit(getState)
    // socket.emit("getGameState");

    socket.on("shareGameState", (newPlayer) => {
      console.log("Sharing game state");

      // socket.to(room).emit("setGameState", getGameState());

      socket.emit("setGameState", { state: getGameState(), newPlayer });
    });

    socket.on("setGameState", (state) => {
      console.log("setting game state");
      console.log(state);
      setAppState(state);
      // setPlayer();
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
      console.log("New Player has joined: ", player);
      addNewPlayer(player);
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
      console.log("Received playCards data: ", data);
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
      console.log("starting new game");
      startNewGame();
    });
    socket.on("readyPlayer", (player) => {
      readyUp(player);
    });
    return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    if (loser) return;
    if (players.length === 0) return;
    if (gameOver) return;
    let myTimeout;
    if (!checkActivePlayersHaveSetFaceCards()) {
      myTimeout = setTimeout(() => {
        setComputerFaceUp();
      }, 1500);
    }

    const currentPlayer = players[activePlayer];
    if (!currentPlayer) return;
    if (currentPlayer.name !== "Computer") {
      return;
    }

    if (!currentPlayer.hasSetFaceUpCards) return;
    if (!currentPlayer.playing) return;

    const timeOut = setTimeout(() => {
      if (currentPlayer.hasToPickUp) {
        return socket.emit("pickUpStack", activePlayer);
      }
      if (hasValidMove(getActiveHand(activePlayer), activePlayer)) {
        console.log(
          "computer playing card",
          validMove(getActiveHand(activePlayer), activePlayer)
        );
        // CHANGE TO SOCKET.TO(ROOM).EMIT
        socket.emit("playCards", {
          selected: validMove(getActiveHand(activePlayer), activePlayer),
          hand: getActiveHand(activePlayer),
          playerNumber: activePlayer,
        });
        setTimeout(() => {
          // CHANGE TO SOCKET.TO(ROOM).EMIT
          socket.emit("drawCardsFromDeck", activePlayer);
        }, 1000);
      } else {
        // console.log("emitting PICKUPSTACK");
        // CHANGE TO SOCKET.TO(ROOM).EMIT
        socket.emit("pickUpStack", activePlayer);
        // pickUpStackHandler();
      }
    }, 2000);
    return () => {
      // console.warn(activePlayer, "CLEARING TIMEOUT");
      clearTimeout(timeOut, myTimeout);
    };
  }, [players, activePlayer, socket, stack, loser, gameOver]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home className={classes.home} />} />
        <Route
          path="/game"
          element={
            <>
              {gameOverModal}
              <div className={classesList}>
                <Table />
                <PlayerContainer />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
