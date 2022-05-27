export const suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

export const cardValuePairs = [
  ["Ace", 14, null],
  ["2", 100, "reset"], // POWER CARD
  ["3", 0.1, null],
  ["4", 6, null],
  ["5", 100, "skip"], // POWER CARD
  ["6", 8, null],
  ["7", 9, null],
  ["8", 100, "lower"], // POWER CARD
  ["9", 10, null],
  ["10", 100, "burn"], // POWER CARD
  ["Jack", 11, "reverse"],
  ["Queen", 12, null],
  ["King", 13, null],
];

export function generateDeck(suits, cardValues) {
  const deck = [];
  suits.forEach((suit) => {
    cardValues.forEach((value) => {
      deck.push({
        value: value[0],
        suit,
        worth: value[1],
        power: value[2],
        name: value[0] + suit,
      });
    });
  });
  console.log("Deck generated.");
  return deck;
}

export function shuffleDeck(deck) {
  let shuffledDeck = [...deck];
  let currIndex = shuffledDeck.length;
  let randomIndex;
  while (currIndex > 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    [shuffledDeck[currIndex], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[currIndex],
    ];
  }
  console.log("Deck shuffled.");
  return shuffledDeck;
}

const getTopStackCard = (stack) => {
  return stack[stack.length - 1];
};

export const allCardsHaveEqualValue = (cards) => {
  return cards.every((card) => card.value === cards[0].value);
};

export function checkLegalMove(cards, stack) {
  const topCard = cards[0];
  if (!topCard) return false;
  const topStackCard = getTopStackCard(stack);
  if (!topStackCard) {
    return true;
  }
  if (allCardsHaveEqualValue(cards) && cards.length === 4) {
    return true;
  }

  if (topCard.power && !(topCard.power === "reverse")) {
    return true;
  }
  if (topStackCard.power && !(topStackCard.power === "reverse")) {
    switch (topStackCard.power) {
      case "reset":
        return true;
      case "skip":
        if (topCard.worth > 6) {
          return true;
        } else {
          return false;
        }
      case "lower":
        if (topCard.worth < 10 || topCard.worth > 15) {
          return true;
        } else {
          return false;
        }
      case "burn":
        return true;

      default:
        return false;
    }
  }
  if (topCard.worth >= topStackCard.worth) {
    return true;
  }
  return false;
}

export function checkBurnStack(stack) {
  const topStackCard = getTopStackCard(stack);
  if (!topStackCard) return;
  const isBurnCard = () => {
    if (topStackCard.power === "burn") {
      console.warn("A CHEEKY 10!!");
      return true;
    }
    return false;
  };
  const isFourOfAKind = () => {
    if (stack.length < 4) return false;
    const lastFourCards = stack.filter((card, i) => i >= stack.length - 4);
    if (allCardsHaveEqualValue(lastFourCards)) {
      console.warn("Four of a kind!");
      return true;
    }
    return false;
  };
  if (isBurnCard() || isFourOfAKind()) {
    return true;
  }
  return false;
}
