import React, { useState } from "react";
import classes from "./Stack.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";

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
        // rotate={i % 8}
      />
    );
  });
  return (
    <>
      <div className={classesList}>
        {/* <Card className={classes.card + `${classes.rotate}3`} /> */}
        <div className={classes.cardsContainer}>{stackOfCards}</div>
        <Button
          text="Pick Up Stack"
          className={classes.btn}
          onClick={null}
        ></Button>
      </div>
      {/* <button onClick={() => addCardToStack("KingDiamonds.png")}>++++</button>
      <button onClick={() => burnStack()}>-----</button> */}
    </>
  );
};

export default Stack;
