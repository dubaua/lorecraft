export function nullToString<T>(value: T): T | string | string[] {
  if (value === null) {
    return 'null';
  }

  if (Array.isArray(value)) {
    return value.map(nullToString);
  }

  return value;
}
