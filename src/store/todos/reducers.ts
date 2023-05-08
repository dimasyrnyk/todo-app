import { TodosTypes, TodosAction, TodosState } from "../types/todos";

const initialState: TodosState = {
  todos: [],
  searchValue: "",
};

export default function todosReducer(
  state = initialState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case TodosTypes.ADD_TODO:
      return { ...state, todos: [action.payload, ...state.todos] };
    case TodosTypes.TOGGLE_COMPLETE_TODO:
      const newTodos = state.todos.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
      return { ...state, todos: newTodos };
    case TodosTypes.DELETE_ALL_COMPLETED_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      };
    case TodosTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TodosTypes.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case TodosTypes.SEARCH_TODO:
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
}