var assert = require('assert');
var PokerHand = require('../pokerHand.js');

/**
 * test
 */
describe('Rank a Royal Flush', function() {
  it('Return royal flush when hand given', function() {
    var hand = new PokerHand('As Ks Qs Js Ts');
    assert.equal(hand.getRank(), 'Royal Flush');
  });
});

/**
 * test
 */
describe('Rank a Pair', function() {
  it('Return one pair when hand given', function() {
    var hand = new PokerHand('Ah As Tc 7d 6s');

    assert.equal(hand.getRank(), 'One Pair');
  });
});

/**
 * test
 */
describe('Rank Two Pair', function() {
  it('Return two pair when hand given', function() {
    var hand = new PokerHand('Kh Kc 3s 3h 2d');

    assert.equal(hand.getRank(), 'Two Pair');
  });
});

/**
 * test
 */
describe('Rank A Flush', function() {
  var hand = new PokerHand('Kh Qh 6h 2h 9h');

  it('Return flush when hand given', function() {
    assert.equal(hand.getRank(), 'Flush');
  });
});

/**
 * test
 */
describe('Rank Four of a Kind', function() {
  it('Return four of a kind when hand given', function() {
    const hand = new PokerHand('Qd Qc Qh Qs 5c');
    assert.equal(hand.getRank(), 'Four of a Kind');
  });
});

/**
 * test
 */
describe('Rank Full House', function() {
  it('Return full house when hand given', function() {
    const hand = new PokerHand('9d 9c 9h 4s 4c');
    assert.equal(hand.getRank(), 'Full House');
  });
});

/**
 * test
 */
describe('Rank Straight', function() {
  it('Return straight when hand given', function() {
    const hand = new PokerHand('5s 4c 3h 2d Ac');
    assert.equal(hand.getRank(), 'Straight');
  });
});

/**
 * test
 */
describe('Rank Three of a Kind', function() {
  it('Return three of a kind when hand given', function() {
    const hand = new PokerHand('8c 8s 8d 4h 9c');
    assert.equal(hand.getRank(), 'Three of a Kind');
  });
});

/**
 * test
 */
describe('Rank High Card', function() {
  it('Return high card when hand given', function() {
    const hand = new PokerHand('Kd Jc 9h 5s 2c');
    assert.equal(hand.getRank(), 'High Card');
  });
});

