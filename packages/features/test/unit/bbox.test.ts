import { isValidBbox, stringifyBbox, stringifyBboxCrs } from '../../src/bbox';

test('isValidBbox() should return false for invalid input', () => {
  expect(isValidBbox([])).toBe(false);
  expect(isValidBbox([1])).toBe(false);
});

test('isValidBbox() should return true for valid input', () => {
  expect(isValidBbox([1, 2, 3, 4, 5, 6])).toBe(true);
  expect(isValidBbox([1, 2, 2, 4])).toBe(true);
});

test('stringifyBbox() should throw an error for invalid input', () => {
  expect(() => stringifyBbox({} as any)).toThrow('invalid bbox');
  expect(() => stringifyBbox([])).toThrow('invalid bbox');
});

test('stringifyBbox() should return a commas-separated number array', () => {
  expect(stringifyBbox([1, 2, 3, 4])).toBe('1,2,3,4');
});

test('stringifyBbboxCrs() should throw an error for invalid input', () => {
  expect(() => stringifyBboxCrs('CRS84')).toThrow('invalid bbox crs');
});

test('stringifyBbboxCrs() should return passed crs', () => {
  expect(stringifyBboxCrs('http://www.opengis.net/def/crs/OGC/1.3/CRS84')).toBe(
    'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  );
});
