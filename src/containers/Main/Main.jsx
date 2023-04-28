import { useSelector } from "react-redux";

import "./Main.scss";
import TodosList from "../../components/Todos/TodosList";

export default function Main() {
  const todos = useSelector((state) => state.todos);
  return (
    <main>
      <TodosList todos={todos} />
    </main>
  );
}
