/**
 * Utility for building default values object for React Hook Form
 * provides Partial object with only filled keys
 * for watching changes
 */
export function buildDefaultValues<T extends Record<string, unknown>, K extends keyof T>(
  model: T,
  keys: K[],
): Partial<T> {
  const defaultValues: Partial<T> = {};

  keys.forEach((key) => {
    const value = model[key];
    if (value !== undefined && value !== null) {
      defaultValues[key] = value;
    }
  });

  return defaultValues;
}
