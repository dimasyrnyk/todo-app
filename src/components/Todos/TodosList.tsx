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
  filteredTodos: ITodo[];
  allTodos: ITodo[];
};

const TodosList: FC<Props> = ({ filteredTodos, allTodos }) => {
  const [showedTodos, setShowedTodos] = useState<ITodo[]>(filteredTodos);
  const [activeTab, setActiveTab] = useState<string>(NavBarTabs.All);
  const [prevTodosLength, setPrevTodosLength] = useState<number>(0);

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
  }, [filteredTodos, activeTab]);

  useEffect(() => {
    if (allTodos.length > prevTodosLength) {
      setActiveTab(NavBarTabs.All);
    }
    setPrevTodosLength(allTodos.length);
  }, [allTodos.length, prevTodosLength]);

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
          <div className="todo-items__empty-page">No {activeTab} todos</div>
        )}
      </ul>
    </>
  );
};

export default TodosList;
