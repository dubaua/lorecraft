/** Represent date as ISO String, YYYY-MM-DD format, without time */
export type ISODateString = string;
/** Represent date as ISO String, YYYY-MM-DDTHH:mm:ss */
export type ISODateTimeString = string;

const ISODateRegexp = /^\d{4}-\d{2}-\d{2}$/;
export function isISODateString(date: unknown): date is ISODateString {
  return typeof date === 'string' && ISODateRegexp.test(date);
}

const ISODateTimeRegexp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
export function isISODateTimeString(date: unknown): date is ISODateTimeString {
  return typeof date === 'string' && ISODateTimeRegexp.test(date);
}
