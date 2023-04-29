import { ADD_TODO, TOGGLE_COMPLETE_TODO } from "./../types/todos";

export const createTodo = (todo) => ({ type: ADD_TODO, payload: todo });

export const completeTodo = (id) => ({
  type: TOGGLE_COMPLETE_TODO,
  payload: id,
});
