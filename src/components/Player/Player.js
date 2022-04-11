import React, { useState } from "react";
import classes from "./Player.module.css";
import Button from "../UI/Button";
import CardContainer from "../Cards/CardContainer";
import InHandContainer from "../Cards/InHandContainer";
import { useSelector, useDispatch } from "react-redux";
import { playCard } from "../../store/game";
import { myTest } from "../../controller/controller";

const Player = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const gameState = useSelector((state) => state.game);

  const faceUpCardsRedux = gameState.value.players[0].faceUpCards.map(
    (card) => card.name
  );
  const faceDownCardsRedux = gameState.value.players[0].faceDownCards.map(
    () => "back"
  );
  const inHandCardsRedux = gameState.value.players[0].inHandCards.map(
    (card) => card.name
  );

  const playCardsHandler = () => {
    // setInHandCards([...inHandCards].filter((name) => name !== selected));
    // setSelected([]);
  };

  const selectCardHandler = (card) => {
    // console.log("----->" + card);
    if (selected.includes(card)) {
      return setSelected(selected.filter((cards) => cards !== card));
    }
    setSelected([...selected, card]);
  };

  // myTest();

  const playCardHandler = (hand) => {
    dispatch(
      playCard({
        cards: selected,
        player: 0,
        hand,
      })
    );
    setSelected([]);
  };
  const playFaceUpHandler = () => {
    // const faceUpTemp = [...faceUpCards];
    // faceUpTemp.pop();
    // setFaceUpCards(faceUpTemp);
  };
  const playFaceDownHandler = () => {
    // const faceDownTemp = [...faceDownCards];
    // faceDownTemp.pop();
    // setFaceDownCards(faceDownTemp);
  };

  const addCardToHand = () => {
    // setInHandCards([...inHandCards, "AceSpades.png"]);
  };

  return (
    <div className={classesList}>
      <h3>Neil Barry</h3>
      <div className={classes.tableCards}>
        <CardContainer
          type="faceDown"
          cards={faceDownCardsRedux}
          playCards={(cards) => playCardsHandler(cards, "faceDown")}
          selected={selected}
        />
        <CardContainer
          type="faceUp"
          cards={faceUpCardsRedux}
          playCards={(cards) => playCardsHandler(cards, "faceUp")}
          selected={selected}
        />
      </div>
      <InHandContainer
        type="inHand"
        cards={inHandCardsRedux}
        playCards={(cards) => playCardsHandler(cards, "inHand")}
        onClick={selectCardHandler}
        selected={selected}
      />
      <Button text="Pick Up Card" onClick={addCardToHand}></Button>
      {inHandCardsRedux.length ? (
        <Button
          text="Play In Hand"
          onClick={() => playCardHandler("inHandCards")}
        ></Button>
      ) : null}

      {!inHandCardsRedux.length && faceUpCardsRedux.length ? (
        <Button text="Play Face Up" onClick={playFaceUpHandler}></Button>
      ) : null}
      {!inHandCardsRedux.length && !faceUpCardsRedux.length ? (
        <Button text="Play Face Down" onClick={playFaceDownHandler}></Button>
      ) : null}
      <Button text="test" onClick={myTest}></Button>
    </div>
  );
};

export default Player;
