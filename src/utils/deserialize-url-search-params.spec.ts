import { deserializeURLSearchParams } from './deserialize-url-search-params';
import { URLSearchParams } from 'url';

describe('deserializeURLSearchParams', () => {
  it('should parse single value correctly', () => {
    const params = new URLSearchParams('foo=bar');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should parse numbers correctly', () => {
    const params = new URLSearchParams('foo=42');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: 42 });
  });

  it('should parse boolean values correctly', () => {
    const params = new URLSearchParams('foo=true');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: true });
  });

  it('should parse null values correctly', () => {
    const params = new URLSearchParams('foo=null');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: null });
  });

  it('should parse arrays correctly', () => {
    const params = new URLSearchParams('foo=1,2,3');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: [1, 2, 3] });
  });

  it('should parse arrays of boolean values correctly', () => {
    const params = new URLSearchParams('foo=true,false,true');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: [true, false, true] });
  });

  it('should parse arrays with mixed values', () => {
    const params = new URLSearchParams('foo=null,bar,2,true');
    const result = deserializeURLSearchParams(params);
    expect(result).toEqual({ foo: [null, 'bar', 2, true] });
  });
});
