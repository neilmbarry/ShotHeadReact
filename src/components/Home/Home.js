import React from "react";
import classes from "./Home.module.css";
import Button from "../UI/Button";
import HomeButton from "../UI/HomeButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartFull,
  faStarHalfStroke,
  faStar,
  faComputer,
  faUsers,
  faArrowRight,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.titleContainer}>
        <h2>Welcome to</h2>
        <h1>SH!T-HEAD!</h1>
        <h2>Multiplayer</h2>
      </div>
      <div className={classes.buttonContainer}>
        <HomeButton text="PLAY AGAINST COMPUTER">
          <FontAwesomeIcon icon={faComputer} />
        </HomeButton>
        <Link to="/game">
          <HomeButton text="MULTIPLAYER">
            <FontAwesomeIcon icon={faUsers} />
          </HomeButton>
        </Link>
        <HomeButton text="Learn how to play" alt="secondary">
          <FontAwesomeIcon icon={faGraduationCap} />
        </HomeButton>
      </div>
    </div>
  );
};

export default Home;
