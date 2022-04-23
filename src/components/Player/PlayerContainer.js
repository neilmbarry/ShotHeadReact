import React from "react";
import classes from "./PlayerContainer.module.css";
import Player from "./Player";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const PlayerContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const players = useSelector((state) => state.game.value.players);

  const playersUI = players.map((player, i) => (
    <Player playerNumber={i} key={i} computer={false} />
  ));
  return <div className={classesList}>{playersUI}</div>;
};

export default PlayerContainer;
