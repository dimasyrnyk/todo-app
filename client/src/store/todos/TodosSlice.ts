import { ITodoDto } from "@constants/todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodosState } from "@store/types/todos";
import {
  createTodo,
  deleteAllCompletedTodos,
  deleteTodo,
  editTodo,
  getUserTodos,
} from "./ActionCreators";

const initialState: TodosState = {
  todos: [],
  searchValue: "",
  isLoading: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    searchTodos(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserTodos.fulfilled,
        (state, action: PayloadAction<ITodoDto[]>) => {
          state.todos = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getUserTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTodos.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        createTodo.fulfilled,
        (state, action: PayloadAction<ITodoDto>) => ({
          ...state,
          todos: [...state.todos, action.payload],
        })
      )
      .addCase(
        editTodo.fulfilled,
        (state, action: PayloadAction<ITodoDto>) => ({
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo
          ),
        })
      )
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<string>) => ({
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        })
      )
      .addCase(deleteAllCompletedTodos.fulfilled, (state) => ({
        ...state,
        todos: state.todos.filter((todo) => !todo.isCompleted),
      }));
  },
});

export const { searchTodos } = todosSlice.actions;

export default todosSlice.reducer;
