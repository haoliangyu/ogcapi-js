import { isValidFilter, stringifyFilter, EFilterLang } from '../../../src/filter/index';

test('isValidFilter() should return true for valid input', () => {
  expect(isValidFilter('PROPERTY_A = 3')).toBe(true);
  expect(isValidFilter({ and: [] })).toBe(true);
});

test('isValidFilter() should return false for invalid input', () => {
  expect(isValidFilter('')).toBe(false);
  expect(isValidFilter({})).toBe(false);
  expect(isValidFilter(1 as any)).toBe(false);
  expect(isValidFilter([] as any)).toBe(false);
  expect(isValidFilter(true as any)).toBe(false);
});

test('stringifyFilter() should return the passed string for string input', () => {
  expect(stringifyFilter({ filter: 'PROPERTY_A = 3' }).filter).toBe('PROPERTY_A = 3');
});

test('stringifyFilter() should return the stringified json for object input', () => {
  expect(stringifyFilter({ filter: { and: [] } }).filter).toBe('{"and":[]}');
});

test("stringifyFilter() should auto guess filter lang", () => {
  expect(stringifyFilter({ filter: 'PROPERTY_A = 3' }).filterLang).toBe(EFilterLang.TEXT);
  expect(stringifyFilter({ filter: { and: [] } }).filterLang).toBe(EFilterLang.JSON);
});

test("stringifyFilter() should return the passed uri for filter crs", () => {
  expect(stringifyFilter({
    filter: 'PROPERTY_A = 3',
    filterCrs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  }).filterCrs).toBe('http://www.opengis.net/def/crs/OGC/1.3/CRS84');
});


test('stringifyFilter() should throw an error for invalid filter', () => {
  expect(() => stringifyFilter({ filter: '' })).toThrow('invalid filter');
  expect(() => stringifyFilter({ filter: {} })).toThrow('invalid filter');
  expect(() => stringifyFilter({ filter: 1 as any })).toThrow('invalid filter');
  expect(() => stringifyFilter({ filter: [] as any })).toThrow('invalid filter');
  expect(() => stringifyFilter({ filter: true as any })).toThrow('invalid filter');
});

test('stringifyFilter() should throw an error for invalid filter lang', () => {
  expect(() => stringifyFilter({
    filter: 'PROPERTY_A = 3',
    filterLang: 'cql-xml' as any,
  })).toThrow('invalid filter lang');
});

test('stringifyFilter() should throw an error for invalid filter crs', () => {
  expect(() => stringifyFilter({
    filter: 'PROPERTY_A = 3',
    filterCrs: 'CRS84',
  })).toThrow('invalid filter crs');
});