import React from "react";
import classes from "./Burned.module.css";
import { motion } from "framer-motion";

import Button from "../../UI/Button";

import { startGame } from "../../../controller/controller";

const Burned = ({ className }) => {
  const classesList = `${classes.main} ${className}`;

  return (
    <div className={classesList}>
      <Button onClick={() => startGame()} text="Start Game"></Button>
      {/* <motion.button whileHover={{ scale: 1.8 }} whileTap={{ scale: 0.8 }}>
        Click
      </motion.button> */}
    </div>
  );
};

export default Burned;
