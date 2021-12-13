import { isValidSortBy, stringifySortBy } from '../../src/sortby';

test('isValidSortBy() should return true for valid input', () => {
  expect(isValidSortBy('PROPERTY_A')).toBe(true);
  expect(isValidSortBy(['PROPERTY_A', '-PROPERTY_B'])).toBe(true);
  expect(isValidSortBy({ property: 'PROPERTY_A' })).toBe(true);
  expect(isValidSortBy({ property: 'PROPERTY_A', order: 'asc' })).toBe(true);
  expect(isValidSortBy({ property: 'PROPERTY_A', order: 'desc' })).toBe(true);
  expect(isValidSortBy([
    { property: 'PROPERTY_A', order: 'asc' },
    { property: 'PROPERTY_B', order: 'desc' },
  ])).toBe(true);
  expect(isValidSortBy([
    'PROPERTY_A',
    { property: 'PROPERTY_B', order: 'desc' },
  ])).toBe(true);
});

test('isValidSortBy() should return false for invalid input', () => {
  expect(isValidSortBy('')).toBe(false);
  expect(isValidSortBy([])).toBe(false);
  expect(isValidSortBy([''])).toBe(false);
  expect(isValidSortBy({} as any)).toBe(false);
  expect(isValidSortBy([{} as any])).toBe(false);
  expect(isValidSortBy({ property: '' })).toBe(false);
  expect(isValidSortBy([{ property: '' } as any])).toBe(false);
  expect(isValidSortBy({ property: 'PROPERTY_A', order: 'random' } as any)).toBe(false);
  expect(isValidSortBy([{ property: 'PROPERTY_B', order: 'random' } as any])).toBe(false);
});

test('stringifySortBy() should throw an error for invalid filters', () => {
  expect(() => stringifySortBy({ property: '' })).toThrow('invalid sortby');
});

test('stringifySortBy() should return the passed string for string input', () => {
  expect(stringifySortBy('PROPERTY_A')).toBe('PROPERTY_A');
});

test('stringifySortBy() should return a comma seperated sortby string for string array input', () => {
  expect(stringifySortBy(['PROPERTY_A', '-PROPERTY_B'])).toBe('PROPERTY_A,-PROPERTY_B');
});

test('stringifySortBy() should return ascending sortby string', () => {
  expect(stringifySortBy('PROPERTY_A')).toBe('PROPERTY_A');
  expect(stringifySortBy({ property: 'PROPERTY_A' })).toBe('PROPERTY_A');
  expect(stringifySortBy([{ property: 'PROPERTY_A' }])).toBe('PROPERTY_A');
  expect(stringifySortBy({ property: 'PROPERTY_A', order: 'asc' })).toBe('PROPERTY_A');
  expect(stringifySortBy([{ property: 'PROPERTY_A', order: 'asc' }])).toBe('PROPERTY_A');
});

test('stringifySortBy() should return descending sortby string', () => {
  expect(stringifySortBy('-PROPERTY_A')).toBe('-PROPERTY_A');
  expect(stringifySortBy({ property: 'PROPERTY_A', order: 'desc' })).toBe('-PROPERTY_A');
  expect(stringifySortBy([{ property: 'PROPERTY_A', order: 'desc' }])).toBe('-PROPERTY_A');
});

test('stringifySortBy() should return multi property sortby string', () => {
  expect(stringifySortBy('PROPERTY_A,-PROPERTY_B')).toBe('PROPERTY_A,-PROPERTY_B');
  expect(stringifySortBy([
    'PROPERTY_A',
    { property: 'PROPERTY_B', order: 'desc' }
  ])).toBe('PROPERTY_A,-PROPERTY_B');
  expect(stringifySortBy([
    { property: 'PROPERTY_A' },
    { property: 'PROPERTY_B', order: 'desc' }
  ])).toBe('PROPERTY_A,-PROPERTY_B');
});