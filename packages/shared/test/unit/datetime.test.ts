import { isValidDatetime, stringifyDatetime } from '../../src/datetime';

test('isValidDatetime() should return true for valid input', () => {
  expect(isValidDatetime(new Date())).toBe(true);

  expect(
    isValidDatetime({
      start: new Date(),
    })
  ).toBe(true);

  expect(
    isValidDatetime({
      end: new Date(),
    })
  ).toBe(true);

  expect(
    isValidDatetime({
      start: new Date(),
      end: new Date(),
    })
  ).toBe(true);
});

test('isValidDatetime() should return false for invalid input', () => {
  expect(isValidDatetime({})).toBe(false);
});

test('stringifyDatetime() should throw an error for invalid input', () => {
  expect(() => stringifyDatetime({})).toThrow('invalid datetime');
});

test('stringifyDatetime() should return the ISO string for a date input', () => {
  const date = new Date(1000);
  expect(stringifyDatetime(date)).toBe('1970-01-01T00:00:01.000Z');
});

test('stringifyDatetime() should return the ISO string for a date range', () => {
  const start = new Date(1000);
  const end = new Date(2000);
  expect(stringifyDatetime({ start })).toBe('1970-01-01T00:00:01.000Z/');
  expect(stringifyDatetime({ end })).toBe('/1970-01-01T00:00:02.000Z');
  expect(stringifyDatetime({ start, end })).toBe(
    '1970-01-01T00:00:01.000Z/1970-01-01T00:00:02.000Z'
  );
});
