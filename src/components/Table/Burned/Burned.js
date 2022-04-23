import React, { useRef } from "react";
import classes from "./Burned.module.css";
import { motion } from "framer-motion";

import Button from "../../UI/Button";

import {
  startGame,
  initializeNewGame,
  addNewPlayer,
} from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const nameRef = useRef();

  const addNewPlayerHandler = () => {
    const name = nameRef.current.value;
    // console.log(name);
    addNewPlayer(name);
  };

  return (
    <div className={classesList}>
      <Button onClick={() => initializeNewGame()} text="New Game"></Button>
      <input type="text" ref={nameRef} />
      <Button
        onClick={() => addNewPlayerHandler()}
        text="Add New Player"
      ></Button>
      <Button onClick={() => startGame()} text="Start Game"></Button>
      {/* <motion.button whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.8 }}>
        Click
      </motion.button> */}
    </div>
  );
};

export default Burned;
