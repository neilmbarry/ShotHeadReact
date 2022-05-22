import React, { useRef, useState } from "react";
import classes from "./Burned.module.css";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

import { useSocket } from "../../../contexts/SocketProvider";

import Button from "../../UI/Button";

import { generateNewDeck, setPlayer } from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const nameRef = useRef();
  const [showMenu, setShowMenu] = useState(true);

  const socket = useSocket();

  const addNewPlayerHandler = () => {
    const name = nameRef.current.value || "Computer";
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

  const menuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className={classesList}>
      {/* {!showMenu && <Button text="Menu" onClick={() => menuHandler()}></Button>}
     
      {showMenu && <Button text="Close" onClick={() => menuHandler()}></Button>}
      {showMenu && (
        <div className={classes.menu}>
          <Button onClick={() => resetHandler()} text="Reset All"></Button>

          <input type="text" ref={nameRef} />
          <Button
            onClick={() => addNewPlayerHandler()}
            text="Add New Player"
          ></Button>

          <Button onClick={() => newGameHandler()} text="New Game"></Button>
          <Button onClick={() => dealCardsHandler()} text="Deal Cards"></Button>
        </div>
      )} */}
    </div>
  );
};

export default Burned;
