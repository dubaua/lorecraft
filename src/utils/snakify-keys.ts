import { snakeCase } from 'lodash';

// TODO выбросить нахрен, и исправить бекенд
export function snakifyKeys(model: Record<string, unknown>): Record<string, unknown> {
  const snakeCasedCopy: Record<string, unknown> = {};
  for (const key in model) {
    if (Object.prototype.hasOwnProperty.call(model, key)) {
      snakeCasedCopy[snakeCase(key)] = model[key];
    }
  }
  return snakeCasedCopy;
}
