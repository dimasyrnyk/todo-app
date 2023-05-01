import { ADD_TODO, TOGGLE_COMPLETE_TODO, DELETE_TODO } from "./../types/todos";

const initialState = [];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case TOGGLE_COMPLETE_TODO:
      const newTodos = state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
      return newTodos;
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
