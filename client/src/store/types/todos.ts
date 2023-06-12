import { ITodo, ITodoDto } from "@constants/todo";

export interface TodosState {
  todos: ITodo[];
  searchValue: string;
}

export enum TodosTypes {
  GET_USER_TODOS = "todos/GET_USER_TODOS",
  ADD_TODO = "todos/ADD",
  TOGGLE_COMPLETE_TODO = "todos/TOGGLE_COMPLETE",
  DELETE_ALL_COMPLETED_TODO = "todos/DELETE_ALL_COMPLETED",
  DELETE_TODO = "todos/DELETE",
  EDIT_TODO = "todos/EDIT",
  SEARCH_TODO = "todos/SEARCH",
}

interface GetUserAction {
  type: TodosTypes.GET_USER_TODOS;
  payload: ITodo[];
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
  | GetUserAction
  | AddAction
  | ToggleCompleteAction
  | DeleteAllCompletedAction
  | DeleteAction
  | EditAction
  | SearchAction;
