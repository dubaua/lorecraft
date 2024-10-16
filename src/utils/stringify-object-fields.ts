import { Primitive } from '@models/primitive.type';

export function stringifyObjectFields(model: Record<string, Primitive>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in model) {
    if (Object.hasOwnProperty.call(model, key)) {
      const value = model[key];
      if (Array.isArray(value)) {
        result[key] = value.join(',');
      } else if (value === null) {
        result[key] = 'null';
      } else {
        result[key] = value.toString();
      }
    }
  }

  return result;
}
