import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { appShowAlert } from "@store/app/AppSlice";
import { AlertMessage } from "@constants/app";
import clientApi from "src/middleware/ClientAPI";
import { ICreateTodoDto, ITodoDto } from "@constants/todo";
import { ISearchParams } from "@store/types/todos";

export const getUserTodos = createAsyncThunk(
  "todos/getUserTodos",
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
  "todos/createTodo",
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
  "todos/editTodo",
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

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async (todo: ITodoDto, thunkAPI) => {
    try {
      const response = await clientApi.patch(`/api/todos/${todo.id}`, todo);
      thunkAPI.dispatch(appShowAlert({ text: AlertMessage.TODO_COMPLETED }));
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
  "todos/deleteTodo",
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
  "todos/deleteAllCompletedTodos",
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

export const searchTodos = createAsyncThunk(
  "todos/searchTodos",
  async (params: ISearchParams, thunkAPI) => {
    try {
      const response = await clientApi.get("/api/todos/search", { params });
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
