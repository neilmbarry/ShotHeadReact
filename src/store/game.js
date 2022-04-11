import { createSlice, current } from "@reduxjs/toolkit";

const suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
const deck = [];
const cardValuePairs = [
  ["Ace", 14, null],
  ["2", 100, "reset"], // POWER CARD
  ["3", 3, null],
  ["4", 4, null],
  ["5", 100, "skip"], // POWER CARD
  ["6", 6, null],
  ["7", 7, null],
  ["8", 100, "lower"], // POWER CARD
  ["9", 9, null],
  ["10", 100, "burn"], // POWER CARD
  ["Jack", 11, "reverse"],
  ["Queen", 12, null],
  ["King", 13, null],
];
suits.forEach((suit) => {
  cardValuePairs.forEach((value) => {
    deck.push({
      value: value[0],
      suit,
      worth: value[1],
      power: value[2],
      name: value[0] + suit,
    });
  });
});

const initialState = {
  deck,
  stack: [],
  burned: [],
  activePlayer: 0,
  loser: false,
  players: [
    {
      name: "Neil",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
    },
  ],
};

export const gameSlice = createSlice({
  name: "game",
  initialState: { value: initialState },
  reducers: {
    drawCard: (state, action) => {
      // Take card from deck
      const newCard = state.value.deck.pop();
      // Add to players hand
      state.value.players[action.payload].inHandCards.push(newCard);
    },
    playCard: (state, action) => {
      // Take card from player
      state.value.players[action.payload.player][action.payload.hand] =
        state.value.players[action.payload.player][action.payload.hand].filter(
          (card) => !action.payload.cards.includes(card)
        );
      // Add card to stack
      state.value.stack.push(...action.payload.cards);
    },
    takeStack: (state, action) => {
      // Add stack to players hand
      state.value.players[action.payload.player].inHandCards.push(
        ...state.value.stack
      );
      // Reset stack
      state.value.stack = [];
    },
    setDeck: (state, action) => {
      state.value.deck = action.payload;
    },
    burnStack: (state) => {
      state.value.burned.push(...state.value.stack);
      state.value.stack = [];
    },
    dealCards: (state, action) => {
      state.value.players[action.payload].faceDownCards =
        state.value.deck.splice(0, 3);
      state.value.players[action.payload].inHandCards = state.value.deck.splice(
        0,
        6
      );
    },
    selectFaceUpCards: (state, action) => {
      state.value.players[action.payload.player].inHandCards =
        state.value.players[action.payload.player].inHandCards.filter(
          (card) => !action.payload.cards.includes(card)
        );
      state.value.players[action.payload.player].faceUpCards =
        action.payload.cards;
    },
  },
});

export const { drawCard, playCard, takeStack, dealCards, selectFaceUpCards } =
  gameSlice.actions;

export default gameSlice.reducer;
