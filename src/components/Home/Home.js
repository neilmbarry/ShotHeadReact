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
  faComputer,
  faUsers,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { setPlayer, setCurrentRoom } from "../../controller/controller";
import { useSelector } from "react-redux";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [computerModalOpen, setComputerModalOpen] = useState(false);
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [roomSelected, setRoomSelected] = useState(null);
  const socket = useSocket();
  const username = useRef();
  const userId = useSelector((state) => state.game.value.userId);
  console.log(userId);

  const startGameHandler = () => {
    console.log(selected);
    const name = username.current?.value || "Player";
    // 1. join room
    // 2. receive state
    // 3. add player

    //
    socket.emit("joinRoom", roomSelected || userId);
    setCurrentRoom(roomSelected || userId);
    if (roomSelected) {
      socket.emit("getGameState", {
        room: roomSelected,
        newPlayer: name,
      });
    }
    // socket.emit("addPlayer", { name, room: roomSelected });

    setPlayer(name);
    socket.emit("addPlayer", { name, room: userId });
    for (let i = 1; i < +selected; i++) {
      socket.emit("addPlayer", { name: "Computer", room: userId });
    }
    // socket.emit("dealCards", generateNewDeck());
  };
  const computerModal = computerModalOpen && (
    <Modal
      onClose={() => {
        setComputerModalOpen(false);
      }}
    >
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
    <Modal
      onClose={() => {
        setFriendModalOpen(false);
        setRoomSelected(null);
      }}
    >
      <h2>Play With Friends</h2>
      <h5>What's your name?</h5>
      <div className={classes.choice}>
        <input type="text" ref={username} />
      </div>
      <h5>Select a room</h5>
      <div className={classes.choice}>
        <Button
          text="College"
          onClick={() => setRoomSelected("College")}
          className={roomSelected === "College" && classes.active}
        ></Button>
        <Button
          text="Ossington"
          onClick={() => setRoomSelected("Ossington")}
          className={roomSelected === "Ossington" && classes.active}
        ></Button>
        <Button
          text="Spadina"
          onClick={() => setRoomSelected("Spadina")}
          className={roomSelected === "Spadina" && classes.active}
        ></Button>
      </div>
      <Link to={`/game?room=${roomSelected}`}>
        <Button
          text="Join Game"
          onClick={() => startGameHandler(roomSelected)}
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
