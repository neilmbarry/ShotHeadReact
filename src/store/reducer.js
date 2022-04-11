import * as actions from "./actionTypes";

// export function reducer(state = initialState, action) {
//   switch (action.type) {
//     case actions.DRAW_CARD:
//       const updatedHandCards = [...state.inHandCards, ...action.payload];
//       return { ...state, inHandCards: updatedHandCards };

//     case actions.PLAY_CARD:
//       const updatedHandCardsNew = [...state.inHandCards].filter(
//         (card) => !action.payload.includes(card)
//       );
//       return { ...state, updatedHandCardsNew };

//     case actions.PICK_UP_STACK:
//       //Can be refactored with 1st case
//       const updatedHandCardsNewer = [...state.inHandCards, ...action.payload];
//       return { ...state, inHandCards: updatedHandCardsNewer };

//     default:
//       break;
//   }
//   return state;
// }
