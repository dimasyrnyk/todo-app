import { FC } from "react";

import "./Todos.scss";
import TodoItem from "./TodoItem";
import { ITodo } from "../../types/todo";

type Props = {
  todos: ITodo[];
};

const TodosList: FC<Props> = ({ todos }) => {
  if (!todos.length) {
    return <div className="todo-items__empty-page">No todos...</div>;
  }

  return (
    <ul>
      {todos.map((i) => (
        <TodoItem
          key={i.id}
          todo={i}
        />
      ))}
    </ul>
  );
};

export default TodosList;
