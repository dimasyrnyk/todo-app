import { ADD_TODO } from "./../types/todos";

export const createTodo = (todo) => ({ type: ADD_TODO, payload: todo });
