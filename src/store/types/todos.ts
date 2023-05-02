import { ITodo } from "../../types/todo";

export enum TodosTypes {
  ADD_TODO = "todos/ADD",
  TOGGLE_COMPLETE_TODO = "todos/TOGGLE_COMPLETE",
  DELETE_TODO = "todos/DELETE",
  EDIT_TODO = "todos/EDIT",
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

interface EditAction {
  type: TodosTypes.EDIT_TODO;
  payload: ITodo;
}

export type TodosAction =
  | AddAction
  | ToggleCompleteAction
  | DeleteAction
  | EditAction;
