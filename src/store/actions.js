import * as actions from "./actionTypes";

export const drawCard = (card) => {
  return {
    type: actions.DRAW_CARD,
    payload: card,
  };
};
