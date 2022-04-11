export const suits = ["Hearts", "Clubs", "Diamonds", "Spades"];

export const cardValuePairs = [
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

export function checkLegalMove(card, topStackCard) {
  if (!topStackCard) {
    return true;
  }
  if (topStackCard.power) {
    switch (topStackCard.power) {
      case "reset":
        return true;
      case "skip":
        if (card.worth > 5) {
          return true;
        } else {
          return false;
        }
      case "lower":
        if (card.worth < 8 || card.worth > 15) {
          return true;
        } else {
          return false;
        }
      default:
        return;
    }
  }
  if (card.worth >= topStackCard.worth) {
    return true;
  }
  return false;
}
