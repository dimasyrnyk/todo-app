import { useDispatch } from "react-redux";

import "./Todos.scss";
import { completeTodo } from "../../store/todos/actions";

export default function TodoItem({ todo }) {
  const classes = todo.isCompleted ? " checked" : "";
  const dispatch = useDispatch();

  function hendleCheckbox() {
    dispatch(completeTodo(todo.id));
  }

  return (
    <li className={"todo-item" + classes}>
      <div className="todo-item__container">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={hendleCheckbox}
        />
        <div className="todo-item__dates">
          <span>Created at: {todo.creationDate}</span>
          <span>Expired at: {todo.expirationDate}</span>
        </div>
        <div className={"todo-item__title" + classes}>{todo.title}</div>
      </div>
    </li>
  );
}
