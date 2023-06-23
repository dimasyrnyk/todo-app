import { FC, useEffect, useState } from "react";

import "./TodosList.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  deleteAllCompletedTodos,
  searchTodos,
} from "@store/todos/ActionCreators";
import { setActiveTab } from "@store/todos/TodosSlice";
import { ActiveTab } from "@store/types/todos";
import { NavBarTabs } from "@constants/app";
import TodoItem from "@components/TodoItem/TodoItem";
import TodosNavBar from "@components/TodosNavBar/TodosNavBar";
import { ModalMessage } from "@constants/auth";

const TodosList: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, activeTab, searchValue } = useAppSelector(
    (state) => state.todos
  );
  const [prevTodosLength, setPrevTodosLength] = useState<number>(todos.length);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const params = searchValue ? { searchTerm: searchValue } : {};

  useEffect(() => {
    if (activeTab === NavBarTabs.All) {
      dispatch(searchTodos({ ...params }));
    } else {
      dispatch(
        searchTodos({
          ...params,
          isCompleted: activeTab === NavBarTabs.Completed,
        })
      );
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

  if (!todos.length && activeTab === NavBarTabs.All) {
    return <div className="todos-list__empty-page">No todos...</div>;
  }

  return (
    <>
      <TodosNavBar
        activeTab={activeTab}
        showRemoveButton={!!completedTodos.length}
        handleClick={handleTabClick}
        handleRemove={handleRemoveTodos}
      />
      <ul>
        {todos.length ? (
          todos.map((i) => (
            <TodoItem
              key={i.id}
              todo={i}
            />
          ))
        ) : (
          <div className="todos-list__empty-page">
            No {activeTab.toLowerCase()} todos
          </div>
        )}
      </ul>
    </>
  );
};

export default TodosList;
