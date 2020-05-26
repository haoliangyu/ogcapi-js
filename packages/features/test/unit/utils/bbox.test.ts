import { isValid, stringify } from '../../../src/utils/bbox';

test('isValid() should return false for invalid input', () => {
  expect(isValid([])).toBe(false);
  expect(isValid([1])).toBe(false);
});

test('isValid() should return true for valid input', () => {
  expect(isValid([1, 2, 3, 4, 5, 6])).toBe(true);
  expect(isValid([1, 2, 2, 4])).toBe(true);
});

test('stringify() should throw an error for invalid input', () => {
  expect(() => stringify([])).toThrow('invalid bbox');
});

test('stringify() should return a commas-separated number array', () => {
  expect(stringify([1, 2, 3, 4])).toBe('1,2,3,4');
});
