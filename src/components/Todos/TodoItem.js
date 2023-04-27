import "./Todos.css";

export default function TodoItem({ todo }) {
  return (
    <li className="todo-item__wrapper">
      <div className="todo-item">
        <div className="todo-item__dates">
          <span>Created at: {todo.creationDate}</span>
          <span>Expired at: {todo.expirationDate}</span>
        </div>
        <span>{todo.title}</span>
      </div>
      <button>remove</button>
    </li>
  );
}
