import { DateTime } from "luxon";

export const now = () => {
  return DateTime.local();
};

export const nextDay = () => {
  return now().plus({ days: 1 });
};

const startDateTime = now().plus({ days: -1 });

export const isValidDate = (selectedDate, startDate = startDateTime) => {
  const selectedDateTime = DateTime.fromJSDate(selectedDate._d);
  return selectedDateTime > startDate;
};
