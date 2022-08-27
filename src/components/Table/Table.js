import React from "react";
import classes from "./Table.module.css";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Burned from "./Burned/Burned";
import HomeButton from "../UI/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { initializeNewGame } from "../../controller/controller";
import Button from "../UI/Button";
import PlayerContainer from "../Player/PlayerContainer";
import { useSelector } from "react-redux";
import Player from "../Player/Player";

const Table = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const resetLocal = () => {
    initializeNewGame();
  };
  const players = useSelector((state) => state.game.value.players);

  const playersUI = players.map((player, i) => {
    console.log(classes["position" + (i + 1)]);
    return (
      <Player
        playerNumber={i}
        key={i}
        computer={false}
        className={classes["position" + (i + 1)]}
      />
    );
  });
  const quitButton = (
    <Link to="/">
      <Button className={classes.quit} onClick={() => resetLocal()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    </Link>
  );
  return (
    <div className={classesList}>
      {quitButton}
      <Stack className={classes.stack} />
      <Deck className={classes.deck} />
      {playersUI}
      {/* <PlayerContainer>{playersUI}</PlayerContainer> */}
    </div>
  );
};

export default Table;
