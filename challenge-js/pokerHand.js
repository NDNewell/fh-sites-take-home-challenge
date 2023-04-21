class PokerHand {
  constructor(hand) {
    this.cards = hand.split(' ');
  }

  // Here we're converting the card value to a number
  // We do this so that we can easily compare the card values
  // For example, if we have a hand with a King and a Queen, we can easily
  // compare the card values by converting the King to 13 and the Queen to 12
  // and then comparing the two values
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

  // Here we're counting the number of occurrences of each card value
  // The card values are added to an object where the key is the card value
  // and the value is the number of occurrences of that card value
  countCardValues() {
    const cardValues = {};

    for (const card of this.cards) {
      const value = this.convertValueToNumber(card[0]);
      cardValues[value] = (cardValues[value] || 0) + 1;
    }

    return cardValues;
  }

  // Here we're checking to see if the hand is a Flush
  // We do this by checking to see if all of the cards have the same suit
  // Each suit is represented by a single character; for example, the suit of
  // a card is represented by the last character of the card such as 'H' for
  // hearts, 'D' for diamonds, 'C' for clubs, and 'S' for spades
  // Combined with the card value, the suit of a card is represented by the
  // last character of the card such as 'KH' for a King of Hearts, 'QD' for
  // a Queen of Diamonds, 'TC' for a Ten of Clubs, and 'AS' for an Ace of Spades
  isFlush() {
    const suit = this.cards[0][1];

    // We loop through the cards and check to see if the suit of the card by
    // checking the last character of the card is the same as the suit of the
    // first card
    for (const card of this.cards) {
      if (card[1] !== suit) {
        return false;
      }
    }

    return true;
  }

  // Here we're checking to see if the hand is a Straight
  // We do this by converting the card values to numbers and then sorting the
  // card values in ascending order
  // We then loop through the card values and check to see if the current card
  // value is one more than the previous card value
  // If it is, we continue looping through the card values
  // If it isn't, we return false because the hand is not a Straight
  // If we make it through the loop without returning false, we return true
  // because the hand is a Straight
  // We also handle the case where the Ace is used as the lowest card in the
  // Straight
  isStraight() {
    const cardValues = this.cards.map(card => this.convertValueToNumber(card[0]));
    cardValues.sort((a, b) => a - b);

    for (let i = 1; i < cardValues.length; i++) {
      if (cardValues[i] !== cardValues[i - 1] + 1) {
        if (i === 4 && cardValues[i] === 14 && cardValues[0] === 2) {
          // Handle the case where Ace is used as the lowest card
          return true;
        }
        return false;
      }
    }

    return true;
  }


  // Here we're checking for the various card rankings
  // We do this by checking for the highest card value, then the second highest, etc.
  // This is done in the following order of precedence: Royal Flush, Straight Flush
  // Four of a Kind, Full House, Flush, Straight, Three of a Kind, Two Pair, One
  // Pair, High Card
  // We do it in this order because if we have a Royal Flush, we don't need to check
  // for any other card rankings because it's the highest possible ranking; likewise
  // for the other card rankings such as Straight Flush, Four of a Kind, etc.
  getRank() {
    const isFlush = this.isFlush();
    const isStraight = this.isStraight();
    const cardValues = this.countCardValues();

    const occurrences = Object.values(cardValues);
    const maxOccurrences = Math.max(...occurrences);
    const minOccurrences = Math.min(...occurrences);

    // Check if the hand is a Flush and a Straight, which is a requirement for both
    // Royal Flush and Straight Flush.
    // If the hand meets these conditions, we first sort the cards in descending
    // order based on their values.
    // Then, we check if the highest card is an Ace and the second-highest card is a
    // King, both with the same suit.
    // If these conditions are met, it means the hand is a Royal Flush.
    // If the highest card is not an Ace or the second-highest card is not a King of
    // the same suit,
    // it indicates that the hand is a Straight Flush, since it is both a Flush and a
    // Straight.
    if (isFlush && isStraight) {
      // Since the hand is already a Straight Flush, we can simply check if the highest card is an Ace to determine if it's a Royal Flush.
      const highestCard = this.cards.reduce((highest, card) => this.convertValueToNumber(card[0]) > this.convertValueToNumber(highest[0]) ? card : highest, this.cards[0]);
      return highestCard[0] === 'A' ? 'Royal Flush' : 'Straight Flush';
    }


    // Here we check to see if the hand is a Four of a Kind
    // It's simple to check for this because if the hand is a Four of a Kind, the
    // maxOccurrences will be 4
    if (maxOccurrences === 4) {
      return 'Four of a Kind';
    }

    // Here we check to see if the hand is a Full House
    // This is done by checking to see if the maxOccurrences is 3 and the
    // minOccurrences is 2
    if (maxOccurrences === 3 && minOccurrences === 2) {
      return 'Full House';
    }

    if (isFlush) {
      return 'Flush';
    }

    if (isStraight) {
      return 'Straight';
    }

    if (maxOccurrences === 3) {
      return 'Three of a Kind';
    }

    // Here we check to see if the hand is a Two Pair by checking to see if the
    // maxOccurrences is 2 and the number of occurrences that are 2 is 2
    if (maxOccurrences === 2 && occurrences.filter(occurrence => occurrence === 2).length === 2) {
      return 'Two Pair';
    }

    if (maxOccurrences === 2) {
      return 'One Pair';
    }

    // If all else fails, the hand is a High Card
    return 'High Card';
  }
}

module.exports = PokerHand;
