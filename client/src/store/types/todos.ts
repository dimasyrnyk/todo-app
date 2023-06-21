import { NavBarTabs } from "@constants/app";
import { ITodoDto } from "@constants/todo";

export type ActiveTab =
  | NavBarTabs.All
  | NavBarTabs.Active
  | NavBarTabs.Completed;

export interface TodosState {
  todos: ITodoDto[];
  activeTab: ActiveTab;
  searchValue: string;
  isLoading: boolean;
}

export interface ISearchParams {
  searchTerm?: string;
  isCompleted?: boolean;
}

export const SearchParams = {
  Active: { isCompleted: false },
  Completed: { isCompleted: true },
};
