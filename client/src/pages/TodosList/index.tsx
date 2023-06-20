import { FC, useEffect, useState } from "react";

import "./TodosList.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { deleteAllCompletedTodos } from "@store/todos/ActionCreators";
import { setSearchValue } from "@store/todos/TodosSlice";
import { ITodoDto } from "@constants/todo";
import { NavBarTabs } from "@constants/app";
import TodoItem from "@components/TodoItem/TodoItem";
import TodosNavBar from "@components/TodosNavBar/TodosNavBar";
import { ModalMessage } from "@constants/auth";

const TodosList: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, searchValue } = useAppSelector((state) => ({
    todos: state.todos.todos,
    searchValue: state.todos.searchValue,
  }));

  const [showedTodos, setShowedTodos] = useState<ITodoDto[]>(todos);
  const [activeTab, setActiveTab] = useState<string>(NavBarTabs.All);
  const [prevTodosLength, setPrevTodosLength] = useState<number>(todos.length);
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  function handleRemoveTodos() {
    const confirmed = window.confirm(ModalMessage.REMOVE_ALL_COMPLETED);
    if (confirmed) {
      dispatch(deleteAllCompletedTodos());
      setActiveTab(NavBarTabs.All);
      setShowedTodos(todos);
    }
  }

  useEffect(() => {
    if (activeTab === NavBarTabs.All) {
      setShowedTodos(todos);
    } else if (activeTab === NavBarTabs.Active) {
      setShowedTodos(activeTodos);
    } else if (activeTab === NavBarTabs.Completed) {
      setShowedTodos(completedTodos);
    }
  }, [todos, activeTab, searchValue]);

  useEffect(() => {
    if (
      todos.length > prevTodosLength ||
      (todos.length < prevTodosLength && !todos.length)
    ) {
      setActiveTab(NavBarTabs.All);
      setPrevTodosLength(todos.length);
      // dispatch(setSearchValue(""));
    }
  }, [todos.length]);

  if (!todos.length) {
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
        {showedTodos.length ? (
          showedTodos.map((i) => (
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
