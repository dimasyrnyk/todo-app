import "./Todos.scss";

export default function TodoItem({ todo }) {
  return (
    <li className="todo-item__wrapper">
      <div className="todo-item">
        <div className="todo-item__dates">
          <span>Created at: {todo.creationDate}</span>
          <span>Expired at: {todo.expirationDate}</span>
        </div>
        <div className="todo-item__title">{todo.title}</div>
      </div>
    </li>
  );
}
