import { parseString } from './parse-string';

describe('parseString', () => {
  it('should correctly parse null', () => {
    expect(parseString('null')).toBe(null);
  });

  it('should correctly parse true', () => {
    expect(parseString('true')).toBe(true);
  });

  it('should correctly parse false', () => {
    expect(parseString('false')).toBe(false);
  });

  it('should correctly parse numbers', () => {
    expect(parseString('42')).toBe(42);
  });

  it('should return original string if parsing fails', () => {
    expect(parseString('foo')).toBe('foo');
  });
});
