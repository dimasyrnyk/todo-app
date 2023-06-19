import { AppDispatch } from "..";
import { TodosTypes } from "@store/types/todos";
import { showAlertWithTimeout } from "@store/app/actions";
import { ICreateTodoDto, ITodoDto } from "@constants/todo";
import ClientAPI from "src/middleware/ClientAPI";
import { AlertMessage } from "@constants/app";

export const getUserTodos = () => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/user-todos`
    );

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TRY_AGAIN,
        })
      );
    } else {
      dispatch({ type: TodosTypes.GET_USER_TODOS, payload: data });
    }
  };
};

export const createTodo = (todo: ICreateTodoDto) => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TRY_AGAIN,
        })
      );
    } else {
      dispatch({ type: TodosTypes.ADD_TODO, payload: data });
      dispatch(
        showAlertWithTimeout({ text: AlertMessage.TODO_CREATED, error: false })
      );
    }
  };
};

export const editTodo = (todo: ITodoDto) => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/todos/${todo.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(todo),
      }
    );

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TRY_AGAIN,
        })
      );
    } else {
      dispatch({ type: TodosTypes.EDIT_TODO, payload: data });
      dispatch(
        showAlertWithTimeout({
          text: AlertMessage.TODO_EDITED,
          error: false,
        })
      );
    }
  };
};

export const deleteTodo = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      `/api/todos/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TRY_AGAIN,
        })
      );
    } else {
      dispatch({ type: TodosTypes.DELETE_TODO, payload: id });
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TODO_DELETED,
          error: false,
        })
      );
    }
  };
};

export const deleteAllCompletedTodo = () => {
  return async (dispatch: AppDispatch) => {
    const { response, data } = await ClientAPI.interceptedFetch(
      "/api/todos/completed",
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.TRY_AGAIN,
        })
      );
    } else {
      dispatch({ type: TodosTypes.DELETE_ALL_COMPLETED_TODO });
      dispatch(
        showAlertWithTimeout({
          text: data.message || AlertMessage.COMPLETED_TODO_DELETED,
          error: false,
        })
      );
    }
  };
};

export const searchTodos = (value: string) => ({
  type: TodosTypes.SEARCH_TODO,
  payload: value,
});
