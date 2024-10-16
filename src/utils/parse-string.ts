export function parseString(value: string): string | number | boolean | null {
  if (value === 'null') {
    return null;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  const numberValue = Number(value);
  if (!Number.isNaN(numberValue)) {
    return numberValue;
  }

  return value;
}
