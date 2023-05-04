import { TodosTypes, TodosAction, TodosState } from "../types/todos";

const initialState: TodosState = {
  allTodos: [],
  searchValue: "",
};

export default function todosReducer(
  state = initialState,
  action: TodosAction
): TodosState {
  switch (action.type) {
    case TodosTypes.ADD_TODO:
      return { ...state, allTodos: [action.payload, ...state.allTodos] };
    case TodosTypes.TOGGLE_COMPLETE_TODO:
      const newTodos = state.allTodos.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
      return { ...state, allTodos: newTodos };
    case TodosTypes.DELETE_ALL_COMPLETED_TODO:
      return {
        ...state,
        allTodos: state.allTodos.filter((todo) => !todo.isCompleted),
      };
    case TodosTypes.DELETE_TODO:
      return {
        ...state,
        allTodos: state.allTodos.filter((todo) => todo.id !== action.payload),
      };
    case TodosTypes.EDIT_TODO:
      return {
        ...state,
        allTodos: state.allTodos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case TodosTypes.SEARCH_TODO:
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
}
