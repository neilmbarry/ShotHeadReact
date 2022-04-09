import React, { useState } from "react";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [gameOver, setGameOver] = React.useState(true);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("");
  const [player1FaceDownCards, setPlayer1FaceDownCards] = useState([]);
  const [player2FaceDownCards, setPlayer2FaceDownCards] = useState([]);
  const [player1FaceUpCards, setPlayer1FaceUpCards] = useState([]);
  const [player2FaceUpCards, setPlayer2FaceUpCards] = useState([]);
  const [player1InHandCards, setPlayer1InHandCards] = useState([]);
  const [player2InHandCards, setPlayer2InHandCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [stack, setStack] = useState([]);
  const [burned, setBurned] = useState([]);
  const generateDeck = null;
  const shuffleDeck = null;
  const dealCards = null;
  const checkLegalMove = null;
  const getTopStackCard = null;
  const addCardsToStack = null;
  const checkBurnStack = null;
  const burnStack = null;
  const switchActivePlayer = null;
  const startActivePlayer = null;
  const checkWinner = null;

  const tableState = { deck, stack, burned };

  return (
    <div className={classesList}>
      {/* <PlayerContainer /> */}
      <Table state={tableState} />
      <PlayerContainer />
    </div>
  );
};

export default App;
