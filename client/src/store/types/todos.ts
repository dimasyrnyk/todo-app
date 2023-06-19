import { ITodoDto } from "@constants/todo";

export interface TodosState {
  todos: ITodoDto[];
  searchValue: string;
  isLoading: boolean;
}
