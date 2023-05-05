import { DateTime } from "luxon";
import { DateFormats } from "../types/app";

const DateNow = (): string => {
  return DateTime.local().toFormat(DateFormats.localFormat);
};

export const getDate = (days: number = 0, date: string = DateNow()): string => {
  const newDate: DateTime = DateTime.fromFormat(
    date,
    DateFormats.localFormat
  ).plus({ days: days });
  return newDate.toFormat(DateFormats.localFormat);
};

export const formatLocaleToISO = (date: string): string => {
  const newDate: DateTime = DateTime.fromFormat(date, DateFormats.localFormat);
  return newDate.toFormat(DateFormats.ISOFormat);
};

export const formatISOToLocale = (date: string): string => {
  const newDate: DateTime = DateTime.fromISO(date);
  return newDate.toFormat(DateFormats.localFormat);
};
