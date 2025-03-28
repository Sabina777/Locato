const { sum } = require('./storeController');

describe('sum function', () => {
  test('should return the correct sum of two positive numbers', () => {
    expect(sum(3, 5)).toBe(8);
  });

  test('should return the correct sum of a positive and a negative number', () => {
    expect(sum(10, -4)).toBe(6);
  });

  test('should return the correct sum of two negative numbers', () => {
    expect(sum(-3, -7)).toBe(-10);
  });

  test('should return the correct sum when one of the numbers is zero', () => {
    expect(sum(0, 5)).toBe(5);
    expect(sum(7, 0)).toBe(7);
  });
});