import { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../store/store";
import {
  newGame,
  drawCard,
  playCard,
  dealCards,
  selectFaceUpCards,
  setDeck,
  addPlayer,
  setActivePlayer,
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
  allCardsHaveEqualValue,
} from "../model/model";

const getGameState = () => store.getState().game.value;

const getStack = () => {
  return getGameState().stack;
};

const getDeck = () => {
  return getGameState().deck;
};

export const getActivePlayer = () => {
  return getGameState().activePlayer;
};

const getPlayersHand = (hand, player) => {
  return getGameState().players[player][hand];
};

const getDirection = () => {
  return getGameState().direction;
};

const numberOfPlayers = () => {
  return getGameState().players.length;
};

const checkActivePlayer = (player) => {
  return getActivePlayer() === player;
};

const cardsInHandQuantity = (player) => {
  return getGameState().players[player].inHandCards.length;
};

const cardsToDraw = (player) => {
  if (cardsInHandQuantity(player) < 3) {
    const cardsToPickUp = 3 - cardsInHandQuantity(player);
    return cardsToPickUp;
  }
  return 0;
};

function drawCardFromDeck(number, player) {
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

const checkAndSetWinner = (player) => {
  const activePlayer = getGameState().players[player];
  if (
    !activePlayer.inHandCards.length &&
    !activePlayer.faceDownCards.length &&
    !activePlayer.faceUpCards.length
  ) {
    console.log(getActivePlayerName(player), " is a WINNER!!");
    store.dispatch(setWinner(player));
    return true;
  }
  return false;
};

const checkCardsInHand = (cards, hand, player) => {
  return cards.every((card) => getPlayersHand(hand, player).includes(card));
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

export function setFaceUpCards(cards, player) {
  store.dispatch(
    selectFaceUpCards({
      cards,
      player,
    })
  );
}

export function playValidMove(hand, player, act) {
  if (hand === "faceDownCards" && act) {
    const availableCards = getPlayersHand(hand, player);
    console.log("available face down", availableCards);
    const playedCard = availableCards[0];
    if (!playCards([playedCard], hand, player)) {
      console.log("cant play this card");
      return false;
    }
    return true;
  }
  const availableCards = getPlayersHand(hand, player);

  if (!availableCards) return;

  const validCards = availableCards
    .filter((card) => checkLegalMove([card], getStack()))
    .sort((a, b) => a.worth - b.worth);

  if (!validCards.length) {
    return false;
  }
  const playingCards = validCards.filter(
    (card) => card.value === validCards[0].value
  );
  if (act) {
    playCards(playingCards, hand, player);
  }
  return true;
}

// TODO -- SKIP CURRENTLY DOESN'T ACCOUNT FOR WINNERS
export function drawCardsFromDeck(player) {
  return drawCardFromDeck(cardsToDraw(player), player);
}

export function playCards(cards, hand, player) {
  // Check Active Player
  if (!checkActivePlayer(player)) {
    return;
  }
  if (!cards.length) {
    return console.error("Please select you desired cards.");
  }
  // Check Cards are in Hand
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
      // If the blind card fails
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
  // drawCardFromDeck(cardsToDraw(player), player);
  // Check Burn
  if (checkBurnStack(getStack())) {
    console.error("IT BURNS!!!");
    if (checkAndSetWinner(player)) {
      switchPlayer();
    }
    // Set Active Player
    // return burnCurrentStack();
    return setTimeout(() => {
      burnCurrentStack();
    }, 1000);
  }
  // Check Skip or change direction
  if (cards[0].power === "skip") {
    if (numberOfPlayers() === 2) {
      return switchPlayer(1);
    }
    return switchPlayer(cards.length);
  }
  // Check Winner
  checkAndSetWinner(player);
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

export function initializeNewGame() {
  store.dispatch(newGame());
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
