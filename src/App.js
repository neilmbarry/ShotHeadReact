import React from "react";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      {/* <PlayerContainer /> */}
      <Table />
      <PlayerContainer />
    </div>
  );
};

export default App;
