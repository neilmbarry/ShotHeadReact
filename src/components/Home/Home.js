import React, { useState, useRef } from "react";
import classes from "./Home.module.css";
import Button from "../UI/Button";
import HomeButton from "../UI/HomeButton";
import Modal from "../UI/Modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useSocket } from "../../contexts/SocketProvider";
import {
  faHeart as faHeartFull,
  faStarHalfStroke,
  faStar,
  faComputer,
  faUsers,
  faArrowRight,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { setPlayer, generateNewDeck } from "../../controller/controller";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [computerModalOpen, setComputerModalOpen] = useState(false);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const socket = useSocket();
  const username = useRef();

  const startGameHandler = () => {
    console.log(selected);
    const name = username.current?.value || "Player";
    socket.emit("addPlayer", { name });
    setPlayer(name);
    for (let i = 1; i < +selected; i++) {
      socket.emit("addPlayer", { name: "Computer" });
    }
    // socket.emit("dealCards", generateNewDeck());
  };
  const computerModal = computerModalOpen && (
    <Modal onClose={() => setComputerModalOpen(false)}>
      <h2>Play Against Computer</h2>
      <h5>Number of Players</h5>
      <div className={classes.choice}>
        <Button
          text="2"
          onClick={() => setSelected(2)}
          className={selected === 2 && classes.active}
        ></Button>
        <Button
          text="3"
          onClick={() => setSelected(3)}
          className={selected === 3 && classes.active}
        ></Button>
        <Button
          text="4"
          onClick={() => setSelected(4)}
          className={selected === 4 && classes.active}
        ></Button>
      </div>
      <Link to="/game">
        <Button
          text="Start Game"
          onClick={(players) => startGameHandler(players)}
          className={selected && classes.active}
        ></Button>
      </Link>
    </Modal>
  );
  const friendModal = friendModalOpen && (
    <Modal onClose={() => setFriendModalOpen(false)}>
      <h2>Play With Friends</h2>
      <h5>What's your name?</h5>
      <div className={classes.choice}>
        <input type="text" ref={username} />
      </div>
      <Link to="/game">
        <Button
          text="Start Game"
          onClick={(players) => startGameHandler(players)}
          className={selected && classes.active}
        ></Button>
      </Link>
    </Modal>
  );
  return (
    <div className={classesList}>
      {computerModal}
      {friendModal}
      <div className={classes.titleContainer}>
        <h2>Welcome to</h2>
        <h1>SH!T-HEAD!</h1>
        <h2>Multiplayer</h2>
      </div>
      <div className={classes.buttonContainer}>
        <HomeButton
          text="PLAY AGAINST COMPUTER"
          onClick={() => setComputerModalOpen(true)}
          className={classes.button}
        >
          <FontAwesomeIcon icon={faComputer} />
        </HomeButton>

        <HomeButton
          text="PLAY AGAINST FRIENDS"
          className={classes.button}
          onClick={() => setFriendModalOpen(true)}
        >
          <FontAwesomeIcon icon={faUsers} />
        </HomeButton>

        <HomeButton
          text="Learn how to play"
          className={classes.button}
          alt="secondary"
        >
          <FontAwesomeIcon icon={faGraduationCap} />
        </HomeButton>
      </div>
    </div>
  );
};

export default Home;
