import { isValidFilterCrs } from "../../../src/filter/crs";

test('isValidFilterCrs() should return true for valid input', () => {
  expect(isValidFilterCrs('http://www.opengis.net/def/crs/OGC/1.3/CRS84')).toBe(true);
});

test('isValidFilterCrs() should return false for invalid input', () => {
  expect(isValidFilterCrs('CRS84')).toBe(false);
});