import React, { useState } from "react";
import classes from "./Stack.module.css";
import Card from "../../Cards/Card";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [stack, setStack] = useState([]);
  const addCardToStack = (card) => {
    setStack([...stack, card]);
  };
  const burnStack = () => {
    setStack([]);
  };
  const stackOfCards = stack.map((name) => (
    <Card className={classes.card} name={name} />
  ));
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
