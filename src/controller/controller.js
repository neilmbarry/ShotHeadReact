import store from "../store/store";
import {
  reset,
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
  removePlayer,
  readyPlayer,
  hasToPickUp,
  setGameState,
  setCurrentPlayer,
  setLoser,
  setGameOver,
  setRoom,
  setCurrentUserId,
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

// export const getGameState = () => store.getState().game.value;
export const getGameState = () => {
  const state = { ...store.getState().game.value };
  delete state.currentPlayer;

  return state;
};

export const setAppState = (state) => {
  store.dispatch(setGameState(state));
};

const getStack = () => {
  return getGameState().stack;
};

export const setPlayer = (name) => {
  store.dispatch(setCurrentPlayer(name));
};

export const setCurrentRoom = (room) => {
  store.dispatch(setRoom(room));
};

export const getActiveHand = (player) => {
  // console.log(player);
  if (getGameState().players[player].inHandCards.length) {
    return "inHandCards";
  }
  if (getGameState().players[player].faceUpCards.length) {
    return "faceUpCards";
  }
  if (getGameState().players[player].faceDownCards.length) {
    return "faceDownCards";
  }
  return false;
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

const getPlayers = () => {
  return getGameState().players;
};

const getPlayingPlayers = () => {
  return getPlayers().filter((player) => player.playing);
};

const numberOfPlayers = () => {
  return getGameState().players.length;
  // return getGameState().players.filter((player) => !player.winner).length;
};

const getActivePlayers = () => {
  return getGameState().players.filter((player) => player.playing);
};

const numberOfActivePlayers = () => {
  return getActivePlayers().length;
};

// const allActivePlayersHaveSetFaceCards = ()=>{

// }

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

const getActivePlayerInfo = () => {
  return getGameState().players[getActivePlayer()];
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

const checkAndSetGameOver = () => {
  if (numberOfActivePlayers() === 1) {
    const loser = getActivePlayers()[0].name;
    store.dispatch(setGameOver());
    setTimeout(() => {
      store.dispatch(setLoser(loser));
    }, 1000);
  }
};

const checkCardsInHand = (cards, hand, player) => {
  const cardNames = cards.map((card) => card.name);
  const handCardNames = getPlayersHand(hand, player).map((card) => card.name);
  return cardNames.every((card) => handCardNames.includes(card));
};

export const checkActivePlayersHaveSetFaceCards = () => {
  return getPlayingPlayers().every((player) => player.hasSetFaceUpCards);
};

const playerWithLowestStarter = () => {
  const arrayOfArrayOfCards = getPlayers().map((player) => player.inHandCards);
  const reduced = arrayOfArrayOfCards
    .map((hand, i) => [
      hand.reduce((acc, card) => {
        return acc + card.worth;
      }, 0),
      i,
    ])
    .sort((a, b) => a[0] - b[0])
    .find((el, i) => el[0] !== 0)[1];

  return reduced;
};

const switchPlayer = (skip = 0) => {
  let loopStop = 0;
  const direction = getDirection();
  let moves = direction * (1 + skip);
  while (moves !== 0 && loopStop < 10) {
    let move = getActivePlayer() + direction;
    if (move < 0) move += numberOfPlayers();
    store.dispatch(switchActivePlayer(move % numberOfPlayers()));
    if (!getActivePlayerInfo().playing) {
      loopStop++;
    } else {
      moves -= direction;
      loopStop++;
    }
  }
};

export const startNewGame = () => {
  store.dispatch(newGame());
};

export function setFaceUpCards(cards, player) {
  store.dispatch(
    selectFaceUpCards({
      cards,
      player,
    })
  );
  if (checkActivePlayersHaveSetFaceCards()) {
    console.log("All players are ready");
    store.dispatch(setActivePlayer(playerWithLowestStarter()));
  }
}

export const allPlayersReady = () => {
  console.log("cheking all players");
  if (getPlayers().every((player) => player.playing)) {
    return true;
  }
  return false;
};

export function hasValidMove(hand, player) {
  if (hand === "faceDownCards") {
    return true;
  }
  const availableCards = getPlayersHand(hand, player);

  if (!availableCards) return false;

  const validCards = availableCards.find((card) =>
    checkLegalMove([card], getStack())
  );

  if (!validCards) {
    return false;
  }
  return true;
}

export function validMove(hand, player) {
  if (hand === "faceDownCards") {
    const availableCards = getPlayersHand(hand, player);
    const playedCard = availableCards[0];
    return [playedCard];
  }

  const availableCards = getPlayersHand(hand, player);

  if (!availableCards) return;

  const validCards = availableCards
    .filter((card) => checkLegalMove([card], getStack()))
    .sort((a, b) => a.worth - b.worth);

  // if (!validCards.length) {
  //   return pickUpStack(player);
  // }
  const playingCards = validCards.filter(
    (card) => card.value === validCards[0].value
  );

  return playingCards;
}

export function drawCardsFromDeck(player) {
  return drawCardFromDeck(cardsToDraw(player), player);
}

export function playCards(cards, hand, player) {
  // Check Active Player
  if (!checkActivePlayer(player)) {
    return console.log("It is not your turn");
  }
  if (!cards) {
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

  // Check If Playing Blind
  if (hand === "faceDownCards") {
    const stackCopy = getStack();

    if (!checkLegalMove(cards, stackCopy)) {
      // If the blind card fails
      const cardNames = cards
        .map((card) => `${card.value} of ${card.suit}`)
        .join(", ");

      console.log(`${getActivePlayerName()} has played ${cardNames}.`);
      console.error("Betrayed by the blind card!");
      console.error("PICK THAT PILE UP!");
      store.dispatch(
        playCard({
          cards,
          hand,
          player,
        })
      );
      store.dispatch(hasToPickUp(player));
      return false;
    }
    store.dispatch(
      playCard({
        cards,
        hand,
        player,
      })
    );
    // Check for Jacks
    if (cards[0].power === "reverse") {
      store.dispatch(changeDirection((-1) ** cards.length));
    }
  } else {
    // Check Move Is Legal

    if (!checkLegalMove(cards, getStack())) {
      console.log(cards, getStack());

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
    // Check for Jacks
    if (cards[0].power === "reverse") {
      store.dispatch(changeDirection((-1) ** cards.length));
    }
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
      checkAndSetGameOver();
      switchPlayer();
    }
    // Set Active Player
    // return burnCurrentStack();
    return setTimeout(() => {
      burnCurrentStack();
    }, 1000);
    // return setTimeout(() => {
    return burnCurrentStack();
    // }, 1000);
  }
  // Check Skip or change direction
  if (cards[0].power === "skip") {
    if (numberOfActivePlayers() <= 2) {
      checkAndSetWinner(player);
      checkAndSetGameOver();
      return;
    }
    switchPlayer(cards.length);
    checkAndSetWinner(player);
    checkAndSetGameOver();
    return;
  }
  // Check Winner
  checkAndSetWinner(player);
  checkAndSetGameOver();
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
  store.dispatch(reset());
}

export function generateNewDeck() {
  return generateAndShuffleDeck();
}

export function startGame(deck) {
  store.dispatch(setDeck(deck));
  store.dispatch(dealCards());
  // store.dispatch(setActivePlayer());
}

export const addNewPlayer = (name) => {
  // console.warn(name);
  console.log("adding Player XXXXXXXX", name);
  store.dispatch(addPlayer(name));
};

export const readyUp = (playerNumber) => {
  store.dispatch(readyPlayer(playerNumber));
};

export const leaveGame = (playerNumber) => {
  console.warn("Player " + (playerNumber + 1) + " is leaving...");
  store.dispatch(removePlayer(playerNumber));
};

const generateAndShuffleDeck = () => {
  return shuffleDeck(generateDeck(suits, cardValuePairs));
};

export const setUserId = (id) => {
  store.dispatch(setCurrentUserId(id));
};
