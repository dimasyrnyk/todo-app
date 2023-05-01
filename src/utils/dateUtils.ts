import { DateTime } from "luxon";

const localFormat = "dd.MM.yyyy HH:mm";
const ISOFormat = "yyyy-MM-dd'T'HH:mm";

export const timeNow = (): string => {
  return DateTime.local().toFormat(localFormat);
};

export const tomorrow = (): string => {
  return DateTime.local().plus({ days: 1 }).toFormat(localFormat);
};

export const nextDay = (date: string): string => {
  const newDate: DateTime = DateTime.fromFormat(date, localFormat).plus({
    days: 1,
  });
  return newDate.toFormat(localFormat);
};

export const formatLocaleToISO = (date: string): string => {
  const newDate: DateTime = DateTime.fromFormat(date, localFormat);
  return newDate.toFormat(ISOFormat);
};

export const formatISOToLocale = (date: string): string => {
  const newDate: DateTime = DateTime.fromISO(date);
  return newDate.toFormat(localFormat);
};
