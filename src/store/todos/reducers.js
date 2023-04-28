import { ADD_TODO } from "./../types/todos";

const initialState = [];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    default:
      return state;
  }
}
