import React, { useRef, useEffect } from "react";
import classes from "./Burned.module.css";
import { motion } from "framer-motion";

import { useSocket } from "../../../contexts/SocketProvider";

import Button from "../../UI/Button";

import {
  startGame,
  initializeNewGame,
  addNewPlayer,
  startNewGame,
} from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const nameRef = useRef();

  const socket = useSocket();
  // console.log(socket);
  // socket.emit("message", "working?");

  const addNewPlayerHandler = () => {
    const name = nameRef.current.value;
    // console.log(name);
    socket.emit("addPlayer", { name: name });
    // addNewPlayer(name);
  };

  useEffect(() => {
    if (!socket) return;
    // console.log(socket);
    socket.on("title", (message) => {
      console.log("CLIENT ", message);
      // setMessage(message);
      // return;
    });
    socket.on("message", (message) => {
      console.log("CLIENT", message);
      // return;
    });
    socket.on("groupChat", (message) => {
      console.log("Someone else: ", message);
      // return;
    });
    socket.on("addPlayer", (player) => {
      console.log("New Player has joined: ", player.name);
      addNewPlayer(player.name);
    });
  }, [socket]);

  return (
    <div className={classesList}>
      <Button onClick={() => initializeNewGame()} text="Reset"></Button>
      <Button
        onClick={() => {
          console.log(socket);
          socket.emit("message", "working?");
        }}
        text="test"
      ></Button>
      <input type="text" ref={nameRef} />
      <Button
        onClick={() => addNewPlayerHandler()}
        text="Add New Player"
      ></Button>
      <Button onClick={() => startNewGame()} text="New Game"></Button>
      <Button onClick={() => startGame()} text="Deal Cards"></Button>
      {/* <motion.button whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.8 }}>
        Click
      </motion.button> */}
    </div>
  );
};

export default Burned;
