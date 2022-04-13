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
    store.dispatch(drawCard(player));
  }
}

function burnCurrentStack() {
  store.dispatch(burnStack());
}

const getActivePlayerName = () => {
  return getGameState().players[getActivePlayer()].name;
};

const switchPlayer = () => {
  // refactor '2' for length when using multiple players
  store.dispatch(switchActivePlayer((getActivePlayer() + 1) % 2));
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

export function playCards(cards, hand, player) {
  // Check Active Player
  if (!checkActivePlayer(player)) {
    return console.error("It's not you're turn dummy!");
  }
  // Check All Cards Equal
  if (!allCardsHaveEqualValue(cards)) {
    return console.error("Cards must be the same value, dumbo!");
  }
  // Check Cards are in Hand
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
    if (!checkLegalMove(cards[0], stackCopy)) {
      console.error("Fucked by the blind card!");
      console.error("PICK THAT SHIT UP!");
      switchPlayer();
    }
  } else {
    // Check Move Is Legal
    if (!checkLegalMove(cards[0], getStack())) {
      return console.error("ILLEGAL MOVE... fuckstick.");
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

  const cardNames = cards.map((card) => card.name).join(", ");

  console.warn(`${getActivePlayerName()} has played ${cardNames}`);

  // Check If inHandCards < 3 && Deck.length && Pick up Cards
  drawCardFromDeck(cardsToDraw(player), player);
  // Check Burn
  if (checkBurnStack(getStack())) {
    console.error("IT BURNS!!!");
    return burnCurrentStack();
  }
  // Check Skip or change direction
  if (cards[0].power === "skip") {
    return;
  }
  // Set Active Player
  switchPlayer();
  // Check Winner
}

export function pickUpStack(player) {
  store.dispatch(takeStack(player));
  switchPlayer();
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
