import { Primitive } from '@models/primitive.type';
import { parseString } from './parse-string';

export function deserializeURLSearchParams(params: URLSearchParams): Record<string, Primitive> {
  const result: Record<string, Primitive> = {};

  for (const [key, value] of params.entries()) {
    if (value.includes(',')) {
      const values = value.split(',');
      result[key] = values.map(parseString);
      continue;
    }
    result[key] = parseString(value);
  }

  return result;
}
