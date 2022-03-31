import React from "react";
import classes from "./Table.module.css";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Burned from "./Burned/Burned";

const Table = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Burned />
      <Stack />
      <Deck />
    </div>
  );
};

export default Table;
