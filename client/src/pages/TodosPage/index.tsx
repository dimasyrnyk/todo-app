import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  deleteAllCompletedTodos,
  searchTodos,
} from "@store/todos/ActionCreators";
import { setActiveTab } from "@store/todos/TodosSlice";
import { ActiveTab } from "@store/types/todos";
import { NavBarTabs } from "@constants/app";
import TodosNavBar from "@components/TodosNavBar/TodosNavBar";
import { ModalMessage } from "@constants/auth";
import TodosList from "@components/TodosList/TodosList";

const TodosPage: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, activeTab, searchValue } = useAppSelector(
    (state) => state.todos
  );
  const [prevTodosLength, setPrevTodosLength] = useState<number>(todos.length);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const params = searchValue ? { searchTerm: searchValue } : {};

  function handleTabClick(tab: ActiveTab) {
    dispatch(setActiveTab(tab));
  }

  function handleRemoveTodos() {
    const confirmed = window.confirm(ModalMessage.REMOVE_ALL_COMPLETED);
    if (confirmed) {
      dispatch(deleteAllCompletedTodos());
      dispatch(setActiveTab(NavBarTabs.All));
    }
  }

  useEffect(() => {
    if (activeTab === NavBarTabs.All) {
      dispatch(searchTodos({ ...params }));
    } else if (activeTab === NavBarTabs.Active) {
      dispatch(searchTodos({ ...params, isCompleted: false }));
    } else if (activeTab === NavBarTabs.Completed) {
      dispatch(searchTodos({ ...params, isCompleted: true }));
    }
    setPrevTodosLength(0);
  }, [activeTab]);

  useEffect(() => {
    if (!todos.length && prevTodosLength) {
      dispatch(setActiveTab(NavBarTabs.All));
    }
    if (todos.length) {
      setPrevTodosLength(todos.length);
    }
  }, [todos.length]);

  return (
    <>
      <TodosNavBar
        activeTab={activeTab}
        showRemoveButton={!!completedTodos.length}
        handleClick={handleTabClick}
        handleRemove={handleRemoveTodos}
      />
      <TodosList todos={todos} />
    </>
  );
};

export default TodosPage;
