import { typeOf } from "./utils";

describe('utils typeOf', () => {
  test('typeOf({})', () => {
    expect(typeOf({})).toBe('Object');
  });

  test('typeOf([])', () => {
    expect(typeOf([])).toBe('Array');
  });

  test('typeOf(\'str\')', () => {
    expect(typeOf('str')).toBe('String');
  });

  test('typeOf(true)', () => {
    expect(typeOf(true)).toBe('Boolean');
  });

  test('typeOf(null)', () => {
    expect(typeOf(null)).toBe('Null');
  });

  test('typeOf(undefined)', () => {
    expect(typeOf(undefined)).toBe('Undefined');
  });
});