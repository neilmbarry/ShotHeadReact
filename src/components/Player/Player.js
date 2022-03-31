import React from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";

const Player = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2>Neil Barry</h2>
      <p>Cards</p>
      <p>Cards</p>
      <Button text="Play"></Button>
    </div>
  );
};

export default Player;
