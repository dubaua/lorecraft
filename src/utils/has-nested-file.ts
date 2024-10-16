type MaybeArrayOrObject = Record<string, unknown> | Array<unknown> | null;

export function hasNestedFile(obj: MaybeArrayOrObject): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  if (Array.isArray(obj)) {
    for (const value of obj) {
      if (value instanceof File || hasNestedFile(value as MaybeArrayOrObject)) {
        return true;
      }
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value instanceof File || hasNestedFile(value as MaybeArrayOrObject)) {
          return true;
        }
      }
    }
  }

  return false;
}
