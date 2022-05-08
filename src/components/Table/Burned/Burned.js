import React, { useRef } from "react";
import classes from "./Burned.module.css";
// import { motion } from "framer-motion";

import { useSocket } from "../../../contexts/SocketProvider";

import Button from "../../UI/Button";

import { generateNewDeck, setPlayer } from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const nameRef = useRef();

  const socket = useSocket();

  const addNewPlayerHandler = () => {
    const name = nameRef.current.value;
    console.log(name);
    console.log(socket);
    setPlayer(name);
    socket.emit("addPlayer", { name: name });
    nameRef.current.value = "";
  };

  const dealCardsHandler = () => {
    socket.emit("dealCards", generateNewDeck());
  };

  const resetHandler = () => {
    socket.emit("reset");
  };

  const newGameHandler = () => {
    socket.emit("newGame");
  };

  return (
    <div className={classesList}>
      <Button onClick={() => resetHandler()} text="Reset All"></Button>

      <input type="text" ref={nameRef} />
      <Button
        onClick={() => addNewPlayerHandler()}
        text="Add New Player"
      ></Button>
      <Button onClick={() => newGameHandler()} text="New Game"></Button>
      <Button onClick={() => dealCardsHandler()} text="Deal Cards"></Button>
      {/* <motion.button whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.8 }}>
        Click
      </motion.button> */}
    </div>
  );
};

export default Burned;
