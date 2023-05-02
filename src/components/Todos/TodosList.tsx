import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Todos.scss";
import TodoItem from "./TodoItem";
import { ITodo } from "../../types/todo";
import NavBar from "../NavBar/NavBar";
import { deleteAllCompletedTodo } from "../../store/todos/actions";
import { AppDispatch } from "../../store";

type Props = {
  todos: ITodo[];
};

const TodosList: FC<Props> = ({ todos }) => {
  const [showedTodos, setShowedTodos] = useState<ITodo[]>(todos);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [prevTodosLength, setPrevTodosLength] = useState<number>(0);
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const dispatch: AppDispatch = useDispatch();

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  function handleRemoveTodos() {
    dispatch(deleteAllCompletedTodo());
    setActiveTab("all");
    setShowedTodos(todos);
  }

  useEffect(() => {
    if (activeTab === "all") {
      setShowedTodos(todos);
    } else if (activeTab === "active") {
      setShowedTodos(activeTodos);
    } else if (activeTab === "completed") {
      setShowedTodos(completedTodos);
    }
  }, [todos, activeTab]);

  useEffect(() => {
    if (todos.length > prevTodosLength) {
      setActiveTab("all");
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
