import { FC } from "react";
import { useSelector } from "react-redux";

import "./Main.scss";
import TodosList from "../../components/Todos/TodosList";
import { RootState } from "../../store";
import { ITodo } from "../../types/todo";

const Main: FC = () => {
  const todosFilteredByValue = useSelector((state: RootState) => {
    return state.todos.allTodos.filter((todo: ITodo) =>
      todo.title.toLowerCase().includes(state.todos.searchValue)
    );
  });

  return (
    <main>
      <TodosList todos={todosFilteredByValue} />
    </main>
  );
};

export default Main;
