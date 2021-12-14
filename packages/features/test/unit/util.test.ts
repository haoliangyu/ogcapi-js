import { isObject, isUrl } from "../../src/util";

test('isObject() should return true for object input', () => {
  expect(isObject({})).toBe(true);
});

test('isObject() should return false for non object input', () => {
  expect(isObject('')).toBe(false);
  expect(isObject(3)).toBe(false);
  expect(isObject([])).toBe(false);
  expect(isObject(function() {})).toBe(false);
});

test('isUrl() should return true for url input', () => {
  expect(isUrl('http://localhost/')).toBe(true);
  expect(isUrl(new URL('http://localhost/'))).toBe(true);
});

test('isUrl() should return false for non url input', () => {
  expect(isUrl('')).toBe(false);
  expect(isUrl(3)).toBe(false);
  expect(isUrl([])).toBe(false);
  expect(isUrl({})).toBe(false);
});