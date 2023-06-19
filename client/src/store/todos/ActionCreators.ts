import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { appShowAlert } from "@store/app/AppSlice";
import { AlertMessage } from "@constants/app";
import clientApi from "src/middleware/ClientAPI";
import { ICreateTodoDto, ITodoDto } from "@constants/todo";

export const getUserTodos = createAsyncThunk(
  "auth/getUserTodos",
  async (_, thunkAPI) => {
    try {
      const response = await clientApi("/api/user-todos");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createTodo = createAsyncThunk(
  "auth/createTodo",
  async (todo: ICreateTodoDto, thunkAPI) => {
    try {
      const response = await clientApi.post("/api/todo", todo);
      thunkAPI.dispatch(appShowAlert({ text: AlertMessage.TODO_CREATED }));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editTodo = createAsyncThunk(
  "auth/editTodo",
  async (todo: ITodoDto, thunkAPI) => {
    try {
      const response = await clientApi.patch(`/api/todos/${todo.id}`, todo);
      thunkAPI.dispatch(appShowAlert({ text: AlertMessage.TODO_EDITED }));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "auth/deleteTodo",
  async (id: string, thunkAPI) => {
    try {
      await clientApi.delete(`/api/todos/${id}`);
      thunkAPI.dispatch(appShowAlert({ text: AlertMessage.TODO_DELETED }));
      return id;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteAllCompletedTodos = createAsyncThunk(
  "auth/deleteAllCompletedTodos",
  async (_, thunkAPI) => {
    try {
      await clientApi.delete("/api/todos/completed");
      thunkAPI.dispatch(
        appShowAlert({ text: AlertMessage.COMPLETED_TODO_DELETED })
      );
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
