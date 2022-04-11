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

const allCardsHaveEqualValue = (cards) => {
  return cards.every((card) => card.value === cards[0].value);
};

const getTopStackCard = () => {
  return store.getState().game.value.stack[
    store.getState().game.value.stack.length - 1
  ];
};

export function myTest() {
  store.dispatch(test());
  console.log(getTopStackCard());
}

export function playCards(cards, player) {
  checkLegalMove(cards);
  //
  //
  //
  store.dispatch(
    playCard({
      cards,
      player,
    })
  );
}

export function startGame() {
  store.dispatch(setDeck(shuffledDeck));
  store.dispatch(dealCards());
  store.dispatch(setActivePlayer());
}

const addNewPlayer = (player) => {
  store.dispatch(addPlayer(player));
};

const shuffledDeck = shuffleDeck(generateDeck(suits, cardValuePairs));
