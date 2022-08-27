import React from "react";
import classes from "./Table.module.css";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Burned from "./Burned/Burned";
import HomeButton from "../UI/HomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { initializeNewGame } from "../../controller/controller";
import Button from "../UI/Button";

const Table = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const resetLocal = () => {
    initializeNewGame();
  };
  return (
    <div className={classesList}>
      <Link to="/">
        <Button className={classes.quit} onClick={() => resetLocal()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </Link>
      <Burned />
      <Stack />
      <Deck />
    </div>
  );
};

export default Table;
