import { isValid, stringify } from '../../../src/utils/datetime';

test('isValid() should return true for valid input', () => {
  expect(isValid(new Date())).toBe(true);

  expect(
    isValid({
      start: new Date(),
    })
  ).toBe(true);

  expect(
    isValid({
      end: new Date(),
    })
  ).toBe(true);

  expect(
    isValid({
      start: new Date(),
      end: new Date(),
    })
  ).toBe(true);
});

test('isValid() should return false for invalid input', () => {
  expect(isValid({})).toBe(false);
});

test('stringify() should throw an error for invalid input', () => {
  expect(() => stringify({})).toThrow('invalid datetime');
});

test('stringify() should return the ISO string for a date input', () => {
  const date = new Date(1000);
  expect(stringify(date)).toBe('1970-01-01T00:00:01.000Z');
});

test('stringify() should return the ISO string for a date range', () => {
  const start = new Date(1000);
  const end = new Date(2000);
  expect(stringify({ start })).toBe('1970-01-01T00:00:01.000Z/');
  expect(stringify({ end })).toBe('/1970-01-01T00:00:02.000Z');
  expect(stringify({ start, end })).toBe(
    '1970-01-01T00:00:01.000Z/1970-01-01T00:00:02.000Z'
  );
});
