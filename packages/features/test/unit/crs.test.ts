import { isValidCrs, stringifyCrs } from '../../src/crs';

test('isValidCrs() should return true for valid input', () => {
  expect(isValidCrs('http://www.opengis.net/def/crs/OGC/1.3/CRS84')).toBe(true);
});

test('isValidCrs() should return false for invalid input', () => {
  expect(isValidCrs('CRS84')).toBe(false);
});

test('stringifyCrs() should throw an error for invalid input', () => {
  expect(() => stringifyCrs('CRS84')).toThrow('invalid crs');
});

test('stringifyCrs() should return passed crs', () => {
  expect(stringifyCrs('http://www.opengis.net/def/crs/OGC/1.3/CRS84')).toBe(
    'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  );
});
