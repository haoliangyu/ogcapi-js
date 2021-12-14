import {
  isValidFilterLang,
  EFilterLang,
  guessFilterLang,
} from '../../../src/filter/lang';

test('isValidFilterLang() should return true for valid input', () => {
  expect(isValidFilterLang(EFilterLang.TEXT)).toBe(true);
  expect(isValidFilterLang(EFilterLang.JSON)).toBe(true);
});

test('isValidFilterLang() should return false for invalid input', () => {
  expect(isValidFilterLang('cql-xml' as any)).toBe(false);
});

test("guessFilterLang() should return 'cql-text' for string input", () => {
  expect(guessFilterLang('')).toBe(EFilterLang.TEXT);
});

test("guessFilterLang() should return 'cql-json' for object input", () => {
  expect(guessFilterLang({ and: [] })).toBe(EFilterLang.JSON);
});

test('guessFilterLang() should throw for non string input and non object input', () => {
  expect(() => guessFilterLang([])).toThrow(
    'failed to guess filter lang from filter'
  );
  expect(() => guessFilterLang(3)).toThrow(
    'failed to guess filter lang from filter'
  );
  expect(() => guessFilterLang(true)).toThrow(
    'failed to guess filter lang from filter'
  );
});
