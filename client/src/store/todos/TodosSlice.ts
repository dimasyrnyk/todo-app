import { ITodoDto } from "@constants/todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveTab, TodosState } from "@store/types/todos";
import {
  completeTodo,
  createTodo,
  deleteAllCompletedTodos,
  deleteTodo,
  editTodo,
  getUserTodos,
  searchTodos,
} from "./ActionCreators";
import { NavBarTabs } from "@constants/app";

const initialState: TodosState = {
  todos: [],
  activeTab: NavBarTabs.All,
  searchValue: "",
  isLoading: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setActiveTab(state, action: PayloadAction<ActiveTab>) {
      state.activeTab = action.payload;
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
          todos: [action.payload, ...state.todos],
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
        completeTodo.fulfilled,
        (state, action: PayloadAction<ITodoDto>) => ({
          ...state,
          todos:
            state.activeTab === NavBarTabs.All
              ? state.todos.map((todo) =>
                  todo.id === action.payload.id ? action.payload : todo
                )
              : state.todos.filter((todo) => todo.id !== action.payload.id),
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
      }))
      .addCase(
        searchTodos.fulfilled,
        (state, action: PayloadAction<ITodoDto[]>) => ({
          ...state,
          todos: action.payload,
          isLoading: false,
        })
      )
      .addCase(searchTodos.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(searchTodos.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});
export const { setSearchValue, setActiveTab } = todosSlice.actions;

export default todosSlice.reducer;
