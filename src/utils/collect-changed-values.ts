import { FieldNamesMarkedBoolean } from 'react-hook-form';

/**
 * Utility for building changed data for sending to the backend.
 * Empty values such undefined or empty string turned to null.
 */
export function collectChangedValues<T extends Record<string, unknown>>(
  model: T,
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<T>>>,
): Partial<T> {
  const changedData: Partial<{ [K in keyof T]: T[K] | null }> = {};
  const keys = Object.keys(dirtyFields) as (keyof T)[];
  keys.forEach((key) => {
    const value = model[key];
    if (value === undefined) {
      changedData[key] = null;
    } else {
      changedData[key] = value;
    }
  });

  return changedData as Partial<T>;
}
