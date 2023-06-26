export enum Themes {
  Light = "light",
  Dark = "dark",
}

export enum DateFormats {
  localFormat = "dd.MM.yyyy HH:mm",
  ISOFormat = "yyyy-MM-dd'T'HH:mm",
}

export enum InputMessage {
  specialSymbolsMsg = `~!?@#$%^&*()_+=[]{};':"|<>\\/ are not allowed!`,
  spacesMsg = "You can't start with space!",
}

export enum NavBarTabs {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

export enum InputPlaceholder {
  Search = "Search todos",
  EnterTodo = "Enter your todo...",
}

export enum AlertColor {
  RED = "red",
  GREEN = "green",
}

export enum AlertMessage {
  TRY_AGAIN = "Something went wrong, try again",
  SESSIOIN_IS_OVER = "Your session is over",
  TODO_CREATED = "Todo has been created",
  TODO_EDITED = "Todo has been edited",
  TODO_COMPLETED = "Todo status has been changed",
  TODO_DELETED = "Todo has been deleted",
  COMPLETED_TODO_DELETED = "All completed todos has been deleted",
}

export enum AppRoutes {
  HOME = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
}

export const CURRENT_PAGE = 1;
export const ITEMS_PER_PAGE = 10;
export const PAGE_NUMBER_LIMIT = 5;
export const MIN_PAGE_NUMBER_LIMIT = 0;
export const MAX_PAGE_NUMBER_LIMIT = 5;
