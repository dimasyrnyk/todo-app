import { AppDispatch } from "..";
import { TodosTypes } from "@store/types/todos";
import { showAlert } from "@store/app/actions";
import { ITodo, ICreateTodoDto } from "@constants/todo";
import ClientAPI from "src/middleware/ClientAPI";

export const getUserTodos = () => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/user-todos`
    );

    if (!response.ok) {
      showAlert({ text: data.message || "Something went wrong, try again" });
    } else {
      dispatch({ type: TodosTypes.GET_USER_TODOS, payload: data });
    }
  };
};

export const createTodo = (todo: ICreateTodoDto) => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(`/api/todo`, {
      method: "POST",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      showAlert({ text: data.message || "Something went wrong, try again" });
    } else {
      dispatch({ type: TodosTypes.ADD_TODO, payload: data });
    }
  };
};

export const editTodo = (todo: ITodo) => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      showAlert({ text: data.message || "Something went wrong, try again" });
    } else {
      dispatch({ type: TodosTypes.EDIT_TODO, payload: data });
      showAlert({ text: "Task has been edited", error: false });
    }
  };
};

export const deleteAllCompletedTodo = () => ({
  type: TodosTypes.DELETE_ALL_COMPLETED_TODO,
});

export const deleteTodo = (id: string) => ({
  type: TodosTypes.DELETE_TODO,
  payload: id,
});

export const searchTodos = (value: string) => ({
  type: TodosTypes.SEARCH_TODO,
  payload: value,
});
