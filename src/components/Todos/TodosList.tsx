import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Todos.scss";
import TodoItem from "./TodoItem";
import { ITodo } from "../../types/todo";
import NavBar from "../NavBar/NavBar";
import { deleteAllCompletedTodo } from "../../store/todos/actions";
import { AppDispatch } from "../../store";
import { NavBarTabs } from "../../types/app";

type Props = {
  todos: ITodo[];
};

const TodosList: FC<Props> = ({ todos }) => {
  const [showedTodos, setShowedTodos] = useState<ITodo[]>(todos);
  const [activeTab, setActiveTab] = useState<string>(NavBarTabs.All);
  const [prevTodosLength, setPrevTodosLength] = useState<number>(0);

  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
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
  }, [todos, activeTab]);

  useEffect(() => {
    if (todos.length > prevTodosLength) {
      setActiveTab(NavBarTabs.All);
    }
    setPrevTodosLength(todos.length);
  }, [todos.length, prevTodosLength]);

  if (!todos.length) {
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
          <div className="todo-items__empty-page">No {activeTab} todos</div>
        )}
      </ul>
    </>
  );
};

export default TodosList;
