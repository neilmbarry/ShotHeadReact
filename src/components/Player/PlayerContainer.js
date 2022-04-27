import React, { useEffect } from "react";
import classes from "./PlayerContainer.module.css";
import Player from "./Player";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "../../contexts/SocketProvider";

const PlayerContainer = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const players = useSelector((state) => state.game.value.players);

  const playersUI = players.map((player, i) => (
    <Player playerNumber={i} key={i} computer={false} />
  ));

  // const socket = useSocket();

  // useEffect(() => {
  //   if (!socket) return;
  //   // console.log(socket);
  //   socket.on("title", (message) => {
  //     console.log("CLIENT ", message);
  //     // setMessage(message);
  //     // return;
  //   });
  //   socket.on("message", (message) => {
  //     console.log("CLIENT", message);
  //     // return;
  //   });
  //   socket.on("groupChat", (message) => {
  //     console.log("Someone else: ", message);
  //     // return;
  //   });
  //   socket.on("addPlayer", (player) => {
  //     console.log("New Player has joined: ", player.name);
  //     // addNewPlayer(player.name);
  //   });
  // }, [socket]);

  return <div className={classesList}>{playersUI}</div>;
};

export default PlayerContainer;
