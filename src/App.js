import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Table from "./components/Table/Table";
import PlayerContainer from "./components/Player/PlayerContainer";
import IMAGES from "./util/CardImages";

const App = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [imgsLoaded, setImgsLoaded] = useState(false);

  // useEffect(() => {
  //   const loadImage = (image) => {
  //     return new Promise((resolve, reject) => {
  //       const loadImg = new Image();
  //       loadImg.src = "http://localhost:3000" + image;
  //       console.log(loadImg.src);
  //       // wait 2 seconds to simulate loading time
  //       loadImg.onload = () =>
  //         setTimeout(() => {
  //           resolve(image.url);
  //         }, 2000);

  //       loadImg.onerror = (err) => reject(err);
  //     });
  //   };

  //   Promise.all(Object.keys(IMAGES).map((image) => loadImage(IMAGES[image])))
  //     .then(() => setImgsLoaded(true))
  //     .catch((err) => console.log("Failed to load images", err));
  // }, []);

  return (
    <div className={classesList}>
      {/* <PlayerContainer /> */}
      <Table />
      <PlayerContainer />
    </div>
  );
};

export default App;
