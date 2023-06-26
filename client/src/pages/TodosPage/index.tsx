import { FC, useEffect, useRef, useState } from "react";

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
  const scrollToTopRef = useRef<HTMLDivElement>(null);

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
    dispatch(searchTodos());
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
    <div ref={scrollToTopRef}>
      <TodosNavBar
        activeTab={activeTab}
        showRemoveButton={!!completedTodos.length}
        handleClick={handleTabClick}
        handleRemove={handleRemoveTodos}
      />
      <TodosList
        todos={todos}
        scrollToTopRef={scrollToTopRef}
      />
    </div>
  );
};

export default TodosPage;
