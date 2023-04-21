class PokerHand {
  constructor(hand) {
    this.cards = hand.split(' ');
  }

  convertValueToNumber(value) {
    switch (value) {
      case 'A':
        return 14;
      case 'K':
        return 13;
      case 'Q':
        return 12;
      case 'J':
        return 11;
      case 'T':
        return 10;
      default:
        return parseInt(value, 10);
    }
  }

  countCardValues() {
    const cardValues = {};

    for (const card of this.cards) {
      const value = this.convertValueToNumber(card[0]);
      cardValues[value] = (cardValues[value] || 0) + 1;
    }

    return cardValues;
  }

  isFlush() {
    const suit = this.cards[0][1];

    for (const card of this.cards) {
      if (card[1] !== suit) {
        return false;
      }
    }

    return true;
  }

  isStraight() {
  const cardValues = this.cards.map(card => this.convertValueToNumber(card[0]));
  cardValues.sort((a, b) => a - b);

  for (let i = 1; i < cardValues.length; i++) {
    if (cardValues[i] !== cardValues[i - 1] + 1) {
      return false;
    }
  }

  return true;
}

  getRank() {
    // Implement poker hand ranking
    return 'Royal Flush';
  }
}

module.exports = PokerHand;
