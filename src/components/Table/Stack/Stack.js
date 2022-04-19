import React, { useState } from "react";
import classes from "./Stack.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import { pickUpStack, getActivePlayer } from "../../../controller/controller";
import { AnimatePresence } from "framer-motion";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stackState = useSelector((state) => state.game.value.stack);
  // console.log(stackState);

  const stackOfCards = stackState.map((name, i) => {
    // console.log(name);
    return (
      <Card
        className={classes.stackCard + " " + classes[`rotate${[i % 8] + ""}`]}
        name={name}
        key={name.name}
        rotate={i % 8}
        type="stack"
        onClick={() => null}
      />
    );
  });
  return (
    <>
      <div className={classesList}>
        <div className={classes.cardsContainer}>
          <AnimatePresence>{stackOfCards}</AnimatePresence>
        </div>

        {/* <Button
          text="Pick Up Stack"
          className={classes.btn}
          onClick={() => pickUpStack(getActivePlayer())}
        ></Button> */}
      </div>
    </>
  );
};

export default Stack;
