import { AppDispatch } from "..";
import { TodosTypes } from "@store/types/todos";
import { ITodo, ITodoDto } from "@constants/todo";

export const getUserTodos = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`/api/todo/${userId}`);
    const json = await response.json();

    if (!response.ok) {
      console.log(json.message || "Something went wrong, try again");
    } else {
      dispatch({
        type: TodosTypes.GET_USER_TODOS,
        payload: json,
      });
    }
  };
};

export const createTodo = (todo: ITodo) => ({
  type: TodosTypes.ADD_TODO,
  payload: todo,
});

export const completeTodo = (id: string) => ({
  type: TodosTypes.TOGGLE_COMPLETE_TODO,
  payload: id,
});

export const deleteAllCompletedTodo = () => ({
  type: TodosTypes.DELETE_ALL_COMPLETED_TODO,
});

export const deleteTodo = (id: string) => ({
  type: TodosTypes.DELETE_TODO,
  payload: id,
});

export const editTodo = (todo: ITodo) => ({
  type: TodosTypes.EDIT_TODO,
  payload: todo,
});

export const searchTodos = (value: string) => ({
  type: TodosTypes.SEARCH_TODO,
  payload: value,
});
