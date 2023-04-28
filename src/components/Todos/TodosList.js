import "./Todos.scss";
import TodoItem from "./TodoItem";

export default function TodosList({ todos }) {
  if (!todos.length > 0)
    return <div className="todo-items__empty-page">No todos...</div>;

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
}
