import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Todos.scss";
import TodoItem from "./TodoItem";
import { ITodo } from "../../types/todo";
import NavBar from "../NavBar/NavBar";
import { deleteAllCompletedTodo, searchTodos } from "../../store/todos/actions";
import { AppDispatch, RootState } from "../../store";
import { NavBarTabs } from "../../types/app";

const TodosList: FC = () => {
  const { todos, searchValue } = useSelector((state: RootState) => ({
    todos: state.todos.todos,
    searchValue: state.todos.searchValue,
  }));

  const filteredTodos = todos.filter((todo: ITodo) =>
    todo.title.toLowerCase().includes(searchValue)
  );
  const [showedTodos, setShowedTodos] = useState<ITodo[]>(filteredTodos);
  const [activeTab, setActiveTab] = useState<string>(NavBarTabs.All);
  const [prevTodosLength, setPrevTodosLength] = useState<number>(todos.length);
  const activeTodos = filteredTodos.filter((todo) => !todo.isCompleted);
  const completedTodos = filteredTodos.filter((todo) => todo.isCompleted);
  const dispatch: AppDispatch = useDispatch();

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  function handleRemoveTodos() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all completed todos?"
    );
    if (confirmed) {
      dispatch(deleteAllCompletedTodo());
      setActiveTab(NavBarTabs.All);
      setShowedTodos(filteredTodos);
    }
  }

  useEffect(() => {
    if (activeTab === NavBarTabs.All) {
      setShowedTodos(filteredTodos);
    } else if (activeTab === NavBarTabs.Active) {
      setShowedTodos(activeTodos);
    } else if (activeTab === NavBarTabs.Completed) {
      setShowedTodos(completedTodos);
    }
  }, [todos, activeTab, searchValue]);

  useEffect(() => {
    if (todos.length > prevTodosLength) {
      setActiveTab(NavBarTabs.All);
      setPrevTodosLength(todos.length);
    } else if (todos.length < prevTodosLength && !filteredTodos.length) {
      dispatch(searchTodos(""));
    }
  }, [todos.length]);

  if (!filteredTodos.length) {
    return <div className="todo-items__empty-page">No todos...</div>;
  }

  return (
    <>
      <NavBar
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
          <div className="todo-items__empty-page">
            No {activeTab.toLowerCase()} todos
          </div>
        )}
      </ul>
    </>
  );
};

export default TodosList;
