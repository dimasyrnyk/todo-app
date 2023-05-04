import { ITodo } from "../../types/todo";

export interface TodosState {
  allTodos: ITodo[];
  searchValue: string;
}

export enum TodosTypes {
  ADD_TODO = "todos/ADD",
  TOGGLE_COMPLETE_TODO = "todos/TOGGLE_COMPLETE",
  DELETE_ALL_COMPLETED_TODO = "todos/DELETE_ALL_COMPLETED",
  DELETE_TODO = "todos/DELETE",
  EDIT_TODO = "todos/EDIT",
  SEARCH_TODO = "todos/SEARCH",
}

interface AddAction {
  type: TodosTypes.ADD_TODO;
  payload: ITodo;
}

interface ToggleCompleteAction {
  type: TodosTypes.TOGGLE_COMPLETE_TODO;
  payload: string;
}

interface DeleteAction {
  type: TodosTypes.DELETE_TODO;
  payload: string;
}

interface DeleteAllCompletedAction {
  type: TodosTypes.DELETE_ALL_COMPLETED_TODO;
}

interface EditAction {
  type: TodosTypes.EDIT_TODO;
  payload: ITodo;
}

interface SearchAction {
  type: TodosTypes.SEARCH_TODO;
  payload: string;
}

export type TodosAction =
  | AddAction
  | ToggleCompleteAction
  | DeleteAllCompletedAction
  | DeleteAction
  | EditAction
  | SearchAction;
