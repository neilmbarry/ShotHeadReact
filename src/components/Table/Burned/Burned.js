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

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const gameState = useSelector((state) => state.game.value);
  console.log(gameState);
  const dispatch = useDispatch();
  return (
    <div className={classesList}>
      {/* {gameState.deck[0]} */}
      <button
        onClick={() => {
          dispatch(dealCards(0));
        }}
      >
        Deal Cards
      </button>
      <button
        onClick={() => {
          dispatch(
            playCard({
              card: [
                {
                  value: "6",
                  suit: "Hearts",
                  worth: 6,
                  power: null,
                  name: "6Hearts",
                },
              ],
              player: 0,
              hand: "inHandCards",
            })
          );
        }}
      >
        Play Card
      </button>
      <button
        onClick={() => {
          dispatch(selectFaceUpCards());
        }}
      >
        Select face up cards
      </button>
    </div>
  );
};

export default Burned;
