import { ITodo } from "../../types/todo";
import { TodosTypes } from "../types/todos";

export const createTodo = (todo: ITodo) => ({
  type: TodosTypes.ADD_TODO,
  payload: todo,
});

export const completeTodo = (id: string) => ({
  type: TodosTypes.TOGGLE_COMPLETE_TODO,
  payload: id,
});

export const deleteTodo = (id: string) => ({
  type: TodosTypes.DELETE_TODO,
  payload: id,
});

export const editTodo = (todo: ITodo) => ({
  type: TodosTypes.EDIT_TODO,
  payload: todo,
});
