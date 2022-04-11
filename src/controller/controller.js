import { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store/store";
import {
  drawCard,
  playCard,
  takeStack,
  dealCards,
  selectFaceUpCards,
  setDeck,
  addPlayer,
  setActivePlayer,
  test,
} from "../store/game";

import {
  suits,
  cardValuePairs,
  generateDeck,
  shuffleDeck,
  checkLegalMove,
} from "../model/model";

//remove
const allCardsHaveEqualValue = (cards) => {
  return cards.every((card) => card.value === cards[0].value);
};

const getStack = () => {
  return store.getState().game.value.stack;
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
  // Check All Cards Equal
  allCardsHaveEqualValue(cards);
  // Check If Playing Blind
  // Check Move Is Legal
  checkLegalMove(cards[0], getStack())
    ? console.warn("legal move")
    : console.error("ILLEGAL MOVE");
  // Move Card From Player to Stack
  store.dispatch(
    playCard({
      cards,
      hand,
      player,
    })
  );
  // Check Burn
  // Check Skip or change direction
  // Set Active Player
  // Check Winner
}

export function startGame() {
  const shuffledDeck = shuffleDeck(generateDeck(suits, cardValuePairs));
  store.dispatch(setDeck(shuffledDeck));
  store.dispatch(dealCards());
  store.dispatch(setActivePlayer());
}

const addNewPlayer = (player) => {
  store.dispatch(addPlayer(player));
};
