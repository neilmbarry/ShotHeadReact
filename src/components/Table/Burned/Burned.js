import React from "react";
import classes from "./Burned.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  drawCard,
  playCard,
  takeStack,
  dealCards,
  selectFaceUpCards,
} from "../../../store/game";

import Button from "../../UI/Button";

import { startGame } from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const gameState = useSelector((state) => state.game.value);
  // console.log(gameState);
  const dispatch = useDispatch();
  return (
    <div className={classesList}>
      {/* {gameState.deck[0]} */}

      <Button onClick={() => startGame()} text="Start Game"></Button>
    </div>
  );
};

export default Burned;
