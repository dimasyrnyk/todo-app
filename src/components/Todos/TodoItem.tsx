import { FC } from "react";
import { useDispatch } from "react-redux";
import { TfiTrash } from "react-icons/tfi";

import "./Todos.scss";
import { completeTodo, deleteTodo } from "../../store/todos/actions";
import TodoBtn from "../TodoBtn/TodoBtn";
import { ITodo } from "../../types/todo";
import { AppDispatch } from "../../store";

type Props = {
  todo: ITodo;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const classes = todo.isCompleted ? " checked" : "";
  const dispatch: AppDispatch = useDispatch();

  function toggleCheckbox() {
    dispatch(completeTodo(todo.id));
  }

  function hendleRemove() {
    dispatch(deleteTodo(todo.id));
  }

  return (
    <li className={"todo-item" + classes}>
      <div className="todo-item__container">
        <label className="todo-item__checkbox_label">
          <input
            className="todo-item__checkbox"
            aria-label="an appropriate label"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={toggleCheckbox}
          />
        </label>

        <div className="todo-item__dates">
          <span>Created at: {todo.creationDate}</span>
          <span>Expired at: {todo.expirationDate}</span>
        </div>
        <div className={"todo-item__title" + classes}>{todo.title}</div>
        <TodoBtn onClick={hendleRemove}>
          <TfiTrash />
        </TodoBtn>
      </div>
    </li>
  );
};

export default TodoItem;