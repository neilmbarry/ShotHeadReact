import React from "react";
import classes from "./PlayerContainer.module.css";
import Player from "./Player";
import { useSelector } from "react-redux";

const PlayerContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const playersState = useSelector((state) => state.game.value.players);

  console.log(playersState[0]);

  const players = playersState.map((player, i) => (
    <Player state={playersState[i]} playerNumber={i} key={i} computer={false} />
  ));
  return (
    <div className={classesList}>
      {players}
      {/* <Player
              state={{
                inHandCards: [
                  {
                    value: "Jack",
                    suit: "Spades",
                    worth: 11,
                    power: "reverse",
                    name: "JackSpades",
                  },
                  {
                    value: "King",
                    suit: "Spades",
                    worth: 13,
                    power: null,
                    name: "KingSpades",
                  },
                  {
                    value: "4",
                    suit: "Clubs",
                    worth: 4,
                    power: null,
                    name: "4Clubs",
                  },
                  {
                    value: "7",
                    suit: "Diamonds",
                    worth: 7,
                    power: null,
                    name: "7Diamonds",
                  },
                  {
                    value: "3",
                    suit: "Hearts",
                    worth: 3,
                    power: null,
                    name: "3Hearts",
                  },
                  {
                    value: "9",
                    suit: "Clubs",
                    worth: 9,
                    power: null,
                    name: "9Clubs",
                  },
                ],
                faceDownCards: [
                  {
                    value: "4",
                    suit: "Diamonds",
                    worth: 4,
                    power: null,
                    name: "4Diamonds",
                  },
                  {
                    value: "4",
                    suit: "Spades",
                    worth: 4,
                    power: null,
                    name: "4Spades",
                  },
                  {
                    value: "5",
                    suit: "Diamonds",
                    worth: 100,
                    power: "skip",
                    name: "5Diamonds",
                  },
                ],
                faceUpCards: [],
                message: "",
                name: "Neil",
                ready: false,
                winner: false,
                hasSetFaceUpCards: false,
              }}
              playerNumber={6}
              key={6}
              computer={false}
            /> */}
    </div>
  );
};

export default PlayerContainer;
