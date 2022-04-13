import React from "react";
import classes from "./PlayerContainer.module.css";
import Player from "./Player";
import { useSelector } from "react-redux";

const PlayerContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const playersState = useSelector((state) => state.game.value.players);

  const players = playersState.map((player, i) => (
    <Player state={playersState[i]} playerNumber={i} key={i} computer={true} />
  ));
  return (
    <div className={classesList}>
      {players}
      {/* <Player /> */}
      {/* <Player />
      <Player />
      <Player /> */}
    </div>
  );
};

export default PlayerContainer;
