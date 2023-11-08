import { isValidDatetime, stringifyDatetime } from '../../src/datetime';

test('isValidDatetime() should return true for valid input', () => {
  // single date
  expect(isValidDatetime('2023-10-27T09:27:40.883Z')).toBe(true);
  expect(isValidDatetime(1698398833044)).toBe(true);
  expect(isValidDatetime(new Date())).toBe(true);

  // range with start
  expect(
    isValidDatetime({
      start: '2023-10-27T09:27:40.883Z',
    })
  ).toBe(true);
  expect(
    isValidDatetime({
      start: 1698398833044,
    })
  ).toBe(true);
  expect(
    isValidDatetime({
      start: new Date(),
    })
  ).toBe(true);

  // range with end
  expect(
    isValidDatetime({
      end: '2023-10-27T09:29:42.906Z',
    })
  ).toBe(true);
  expect(
    isValidDatetime({
      end: 1698398844131,
    })
  ).toBe(true);
  expect(
    isValidDatetime({
      end: new Date(),
    })
  ).toBe(true);

  // range with start and end
  expect(
    isValidDatetime({
      start: '2023-10-27T09:27:40.883Z',
      end: '2023-10-27T09:29:42.906Z',
    })
  ).toBe(true);
  expect(
    isValidDatetime({
      start: 1698398833044,
      end: 1698398844131,
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
