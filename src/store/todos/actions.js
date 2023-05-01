import { ADD_TODO, TOGGLE_COMPLETE_TODO, DELETE_TODO } from "./../types/todos";

export const createTodo = (todo) => ({ type: ADD_TODO, payload: todo });

export const completeTodo = (id) => ({
  type: TOGGLE_COMPLETE_TODO,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});
