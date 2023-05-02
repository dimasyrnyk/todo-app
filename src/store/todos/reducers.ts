import { ITodo } from "../../types/todo";
import { TodosTypes, TodosAction } from "../types/todos";

const initialState: ITodo[] = [];

export default function todosReducer(
  state = initialState,
  action: TodosAction
): ITodo[] {
  switch (action.type) {
    case TodosTypes.ADD_TODO:
      return [action.payload, ...state];
    case TodosTypes.TOGGLE_COMPLETE_TODO:
      const newTodos = state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      });
      return newTodos;
    case TodosTypes.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TodosTypes.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    default:
      return state;
  }
}
