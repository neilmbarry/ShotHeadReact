import React, { useState } from "react";
import classes from "./Stack.module.css";
import Card from "../../Cards/Card";
import { useSelector } from "react-redux";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stackState = useSelector((state) => state.game.value.stack);

  const stackOfCards = stackState.map((name, i) => {
    // console.log(name);
    return (
      <Card
        className={classes.card}
        name={name}
        key={name + i}
        rotate={i % 8}
      />
    );
  });
  return (
    <>
      <div className={classesList}>
        {/* <Card className={classes.card + `${classes.rotate}3`} /> */}
        {stackOfCards}
      </div>
      {/* <button onClick={() => addCardToStack("KingDiamonds.png")}>++++</button>
      <button onClick={() => burnStack()}>-----</button> */}
    </>
  );
};

export default Stack;
