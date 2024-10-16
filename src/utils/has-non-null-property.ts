/* eslint-disable @typescript-eslint/no-explicit-any */
type Key = keyof any;

export const hasNonNullProperty = <T extends Record<K, any>, K extends Key>(
  obj: T,
  property: K,
): obj is { [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P] } => {
  return obj[property] !== null && obj[property] !== undefined;
};
