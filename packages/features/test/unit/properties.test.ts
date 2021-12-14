import { isValidProperties, stringifyProperties } from '../../src/properties';

test('isValidProperties() should return true for valid input', () => {
  expect(isValidProperties('PROPERTY_A')).toBe(true);
  expect(isValidProperties(['PROPERTY_A', 'PROPERTY_B'])).toBe(true);
});

test('isValidProperties() should return false for invalid input', () => {
  expect(isValidProperties('')).toBe(false);
  expect(isValidProperties([])).toBe(false);
  expect(isValidProperties(1 as any)).toBe(false);
  expect(isValidProperties({} as any)).toBe(false);
});

test('stringifyProperties() should throw an error for valid input', () => {
  expect(() => stringifyProperties([])).toThrow('invalid properties');
});

test('stringifyProperties() should return the passed string for string input', () => {
  expect(stringifyProperties('PROPERTY_A')).toBe('PROPERTY_A');
});

test('stringifyProperties() should return a comma seperated properties string for array input', () => {
  expect(stringifyProperties(['PROPERTY_A', 'PROPERTY_B'])).toBe(
    'PROPERTY_A,PROPERTY_B'
  );
});
