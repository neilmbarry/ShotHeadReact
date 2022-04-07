import React from "react";
import classes from "./PlayerContainer.module.css";
import Player from "./Player";

const PlayerContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Player />
      {/* <Player className={classes.player1} /> */}
      <Player />
      {/* <Player />
      <Player />
      <Player /> */}
    </div>
  );
};

export default PlayerContainer;