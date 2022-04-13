import { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store/store";
import {
  drawCard,
  playCard,
  dealCards,
  selectFaceUpCards,
  setDeck,
  addPlayer,
  setActivePlayer,
  test,
  takeStack,
  burnStack,
  switchActivePlayer,
  changeDirection,
  setWinner,
  sortHandCards,
} from "../store/game";

import {
  suits,
  cardValuePairs,
  generateDeck,
  shuffleDeck,
  checkLegalMove,
  checkBurnStack,
} from "../model/model";

//remove
const allCardsHaveEqualValue = (cards) => {
  return cards.every((card) => card.value === cards[0].value);
};

const getGameState = () => store.getState().game.value;

const getStack = () => {
  return getGameState().stack;
};

const numberOfPlayers = () => {
  // return getGameState().players.filter((player) => !player.winner).length;
  return getGameState().players.length;
};

const getDeck = () => {
  return getGameState().deck;
};

const getActivePlayer = () => {
  return getGameState().activePlayer;
};

const checkActivePlayer = (player) => {
  return player === getActivePlayer();
};

const cardsToDraw = (player) => {
  if (getGameState().players[player].inHandCards.length < 3) {
    const cardsToPickUp = 3 - getGameState().players[player].inHandCards.length;
    return cardsToPickUp;
  }
  return 0;
};

function drawCardFromDeck(number, player) {
  if (getDeck().length === 0) return;
  // use splice instead
  for (let i = 1; i <= number; i++) {
    if (getDeck().length !== 0) {
      store.dispatch(drawCard(player));
    }
  }
}

function burnCurrentStack() {
  store.dispatch(burnStack());
}

const getActivePlayerName = () => {
  return getGameState().players[getActivePlayer()].name;
};

const activePlayerIsWinner = () => {
  return getGameState().players[getActivePlayer()].winner;
};

const checkWinner = () => {
  const activePlayer = getGameState().players[getActivePlayer()];
  if (
    !activePlayer.inHandCards.length &&
    !activePlayer.faceDownCards.length &&
    !activePlayer.faceUpCards.length
  ) {
    console.log("we have a winner");
    store.dispatch(setWinner(getActivePlayer()));
    return true;
  }
  return false;
};

const checkCardsInHand = (cards, hand, player) => {
  // console.log(cards, hand);
  return cards.every((card) =>
    getGameState().players[player][hand].includes(card)
  );
};

const switchPlayer = (skip = 0) => {
  //What a mess, needs to be refactored
  // trouble with removing a winner from play and direction
  const direction = getDirection();
  let moves = getActivePlayer() + direction * (1 + skip);
  if (moves < 0) moves += numberOfPlayers();
  store.dispatch(switchActivePlayer(moves % numberOfPlayers()));

  let loopStop = 0;

  while (activePlayerIsWinner() && loopStop < 100) {
    console.log("infinite loop");
    console.log((getActivePlayer() + direction * 1) % numberOfPlayers());
    console.log("activePlayer", getActivePlayer());
    console.log("direction", direction * 1);
    console.log("noOfplayers", numberOfPlayers());

    loopStop++;
    let moves = getActivePlayer() + direction * 1;
    if (moves < 0) moves += numberOfPlayers();
    store.dispatch(switchActivePlayer(moves % numberOfPlayers()));
    store.dispatch(switchActivePlayer(moves % numberOfPlayers()));
  }
};

const getDirection = () => {
  return getGameState().direction;
};

export function myTest() {
  store.dispatch(test());
  console.log(getStack());
}

export function setFaceUpCards(cards, player) {
  store.dispatch(
    selectFaceUpCards({
      cards,
      player,
    })
  );
}

export function playValidMove(hand, player) {
  if (hand === "faceDownCards") {
    const availableCards = getGameState().players[player][hand];
    console.log("available face down", availableCards);
    const playedCard = availableCards[0];
    if (!playCards([playedCard], hand, player)) {
      console.log("cant play this card");
      return false;
    }
    return true;
  }
  const availableCards = getGameState().players[player][hand];
  // console.log(availableCards, "---->available");
  const validCards = availableCards
    .filter((card) => checkLegalMove([card], getStack()))
    .sort((a, b) => a.worth - b.worth);
  // console.log(validCards, "validCards");
  if (!validCards.length) {
    return false;
  }
  const playingCards = validCards.filter(
    (card) => card.value === validCards[0].value
  );
  // console.log(playingCards, "--->playingvards");
  playCards(playingCards, hand, player);
  return true;
}

export function playCards(cards, hand, player) {
  // Check Active Player
  if (!checkActivePlayer(player)) {
    //  console.error("It's not you're turn yet!");
    return;
  }
  if (!cards.length) {
    return console.error("Please select you desired cards.");
  }
  // Check Cards are in Hand
  // console.log(hand, cards);
  if (!checkCardsInHand(cards, hand, player)) {
    return console.error("Cards selected must be from the current hand.");
  }
  // Check All Cards Equal
  if (!allCardsHaveEqualValue(cards)) {
    return console.error("Cards must be the same value.");
  }
  // Check for Jacks
  if (cards[0].power === "reverse") {
    store.dispatch(changeDirection((-1) ** cards.length));
  }
  // Check If Playing Blind
  if (hand === "faceDownCards") {
    const stackCopy = getStack();
    store.dispatch(
      playCard({
        cards,
        hand,
        player,
      })
    );
    if (!checkLegalMove(cards, stackCopy)) {
      const cardNames = cards
        .map((card) => `${card.value} of ${card.suit}`)
        .join(", ");

      console.log(`${getActivePlayerName()} has played ${cardNames}.`);
      console.error("Betrayed by the blind card!");
      console.error("PICK THAT PILE UP!");
      return false;
    }
  } else {
    // Check Move Is Legal
    if (!checkLegalMove(cards, getStack())) {
      return console.error("ILLEGAL MOVE!");
    }
    // Move Card From Player to Stack
    store.dispatch(
      playCard({
        cards,
        hand,
        player,
      })
    );
  }

  const cardNames = cards
    .map((card) => `${card.value} of ${card.suit}`)
    .join(", ");

  console.log(`${getActivePlayerName()} has played ${cardNames}.`);

  // Check If inHandCards < 3 && Deck.length && Pick up Cards
  drawCardFromDeck(cardsToDraw(player), player);
  // Check Burn
  if (checkBurnStack(getStack())) {
    console.error("IT BURNS!!!");
    if (checkWinner()) {
      switchPlayer();
    }
    // Set Active Player
    return setTimeout(() => {
      burnCurrentStack();
    }, 2000);
  }
  // Check Skip or change direction
  if (cards[0].power === "skip") {
    if (numberOfPlayers() === 2) {
      return switchPlayer(1);
    }
    return switchPlayer(cards.length);
  }
  // Check Winner
  checkWinner();
  // Set Active Player
  switchPlayer();
  return true;
}

export function pickUpStack(player) {
  store.dispatch(takeStack(player));
  switchPlayer();
}

export function sortCards(player) {
  store.dispatch(sortHandCards(player));
}

export function startGame() {
  store.dispatch(setDeck(generateAndShuffleDeck()));
  store.dispatch(dealCards());
  store.dispatch(setActivePlayer());
}

const addNewPlayer = (player) => {
  store.dispatch(addPlayer(player));
};

const generateAndShuffleDeck = () => {
  return shuffleDeck(generateDeck(suits, cardValuePairs));
};
