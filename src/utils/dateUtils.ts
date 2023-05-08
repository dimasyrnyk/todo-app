import { DateTime } from "luxon";
import { DateFormats } from "../types/app";

const DateNow = (): string => {
  return DateTime.local().toFormat(DateFormats.localFormat);
};

// Function getDate may take no args or may take one or two args
// and return a string in local date format
// first arg - number, second arg - string in local date & time format
// in case of 0 args returns current date, in case of one arg returns tommorow
// in case of two args returns next day after day in second arg
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
