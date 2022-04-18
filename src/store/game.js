import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deck: [],
  stack: [],
  burned: [],
  activePlayer: 0,
  loser: false,
  test: false,
  direction: 1,
  players: [
    {
      name: "Neil",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
      message: "",
      ready: false,
      hasSetFaceUpCards: false,
      winner: false,
    },
    {
      name: "Warren",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
      message: "",
      ready: false,
      hasSetFaceUpCards: false,
      winner: false,
    },
    {
      name: "Warren",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
      message: "",
      ready: false,
      hasSetFaceUpCards: false,
      winner: false,
    },
    {
      name: "Warren",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
      message: "",
      ready: false,
      hasSetFaceUpCards: false,
      winner: false,
    },
    {
      name: "Warren",
      inHandCards: [],
      faceUpCards: [],
      faceDownCards: [],
      message: "",
      ready: false,
      hasSetFaceUpCards: false,
      winner: false,
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
      // Add card to players hand
      state.value.players[action.payload].inHandCards.push(newCard);
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
    takeStack: (state, action) => {
      // Add stack to players hand
      state.value.players[action.payload].inHandCards.unshift(
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
      state.value.players.forEach((player) => {
        player.faceDownCards = state.value.deck.splice(0, 3);
        player.faceUpCards = [];
        player.inHandCards = state.value.deck.splice(0, 6);
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
    },
    changeDirection: (state, action) => {
      state.value.direction *= action.payload;
    },
    addPlayer: (state, action) => {
      state.value.players.push(action.payload);
    },
    setActivePlayer: (state, action) => {
      //TODO set player with lowest starting hand to begin
      state.value.activePlayer = 0;
    },
    switchActivePlayer: (state, action) => {
      state.value.activePlayer = action.payload;
    },
    setWinner: (state, action) => {
      state.value.players[action.payload].winner = true;
    },
    sortHandCards: (state, action) => {
      state.value.players[action.payload].inHandCards.sort(
        (a, b) => a.worth - b.worth
      );
    },
  },
});

export const {
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
} = gameSlice.actions;

export default gameSlice.reducer;
