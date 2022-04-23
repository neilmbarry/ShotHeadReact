import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deck: [1],
  stack: [],
  burned: [],
  activePlayer: null,
  gameOver: true,
  loser: false,
  test: false,
  direction: 1,
  players: [
    // {
    //   name: "Neil",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: true,
    // },
    // {
    //   name: "Warren",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: false,
    // },
    // {
    //   name: "Warren",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: false,
    // },
    // {
    //   name: "Warren",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: false,
    // },
    // {
    //   name: "Warren",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: false,
    // },
    // {
    //   name: "Warren",
    //   inHandCards: [],
    //   faceUpCards: [],
    //   faceDownCards: [],
    //   message: "",
    //   ready: false,
    //   hasSetFaceUpCards: false,
    //   winner: false,
    // },
  ],
};

export const gameSlice = createSlice({
  name: "game",
  initialState: { value: initialState },
  reducers: {
    newGame: (state, action) => {
      state.value = initialState;
    },
    addPlayer: (state, action) => {
      state.value.players.push({
        name: action.payload,
        inHandCards: [],
        faceUpCards: [],
        faceDownCards: [],
        message: "",
        ready: false,
        hasSetFaceUpCards: false,
        winner: true,
      });
    },
    removePlayer: (state, action) => {
      state.value.players = state.value.players.filter(
        (player, i) => i !== action.payload
      );
    },
    readyPlayer: (state, action) => {
      state.value.players[action.payload].ready = true;
      state.value.players[action.payload].winner = false;
    },
    setDeck: (state, action) => {
      state.value.deck = action.payload;
    },
    dealCards: (state, action) => {
      state.value.gameOver = false;
      state.value.players.forEach((player) => {
        if (!player.winner) {
          player.faceDownCards = state.value.deck.splice(0, 3);
          player.faceUpCards = [];
          player.inHandCards = state.value.deck.splice(0, 6);
          player.hasSetFaceUpCards = false;
        }
      });
      state.value.stack = [];
      state.value.burned = [];
    },
    selectFaceUpCards: (state, action) => {
      state.value.players[action.payload.player].inHandCards =
        state.value.players[action.payload.player].inHandCards.filter(
          (card) =>
            !action.payload.cards.map((card) => card.name).includes(card.name)
        );
      state.value.players[action.payload.player].faceUpCards.push(
        ...action.payload.cards
      );
      state.value.players[action.payload.player].hasSetFaceUpCards = true;
    },
    setActivePlayer: (state, action) => {
      //TODO set player with lowest starting hand to begin
      state.value.activePlayer = action.payload;
    },
    playCard: (state, action) => {
      // Take card from player
      // let newHand;
      // if (action.payload.hand === "faceUpCards") {
      //   newHand = state.value.players[action.payload.player][
      //     action.payload.hand
      //   ].map((card) =>
      //     !action.payload.cards.map((card) => card.name).includes(card.name)
      //       ? card
      //       : { name: "transparent" }
      //   );
      //   newHand = state.value.stack.pop();

      //   console.log(newHand);
      //   return (state.value.players[action.payload.player][
      //     action.payload.hand
      //   ] = newHand);
      // }
      // REFACTOR
      state.value.players[action.payload.player][action.payload.hand] =
        state.value.players[action.payload.player][action.payload.hand].filter(
          (card) =>
            !action.payload.cards.map((card) => card.name).includes(card.name)
        );
      // Add card to stack
      state.value.stack.push(...action.payload.cards);
    },
    drawCard: (state, action) => {
      // Take card from deck
      const newCard = state.value.deck.pop();
      // Add card to players hand
      state.value.players[action.payload].inHandCards.unshift(newCard);
    },
    switchActivePlayer: (state, action) => {
      state.value.activePlayer = action.payload;
    },
    sortHandCards: (state, action) => {
      state.value.players[action.payload].inHandCards.sort(
        (a, b) => a.worth - b.worth
      );
    },

    takeStack: (state, action) => {
      // Add stack to players hand
      state.value.players[action.payload].inHandCards.unshift(
        ...state.value.stack
      );
      // Reset stack
      state.value.stack = [];
    },

    burnStack: (state) => {
      state.value.burned.push(...state.value.stack);
      state.value.stack = [];
    },
    changeDirection: (state, action) => {
      state.value.direction *= action.payload;
    },

    setWinner: (state, action) => {
      state.value.players[action.payload].winner = true;
    },
    setLoser: (state, action) => {
      state.value.loser = true;
      state.value.gameOver = true;
    },
  },
});

export const {
  newGame,
  drawCard,
  playCard,
  takeStack,
  dealCards,
  selectFaceUpCards,
  setDeck,
  addPlayer,
  setActivePlayer,
  burnStack,
  switchActivePlayer,
  changeDirection,
  setWinner,
  sortHandCards,
  removePlayer,
  readyPlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
