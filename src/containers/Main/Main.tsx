import { FC } from "react";
import { useSelector } from "react-redux";

import "./Main.scss";
import TodosList from "../../components/Todos/TodosList";
import { RootState } from "../../store";
import { ITodo } from "../../types/todo";

const Main: FC = () => {
  const { todosFilteredByValue, allTodos } = useSelector((state: RootState) => {
    const filteredTodos = state.todos.allTodos.filter((todo: ITodo) =>
      todo.title.toLowerCase().includes(state.todos.searchValue)
    );
    return {
      todosFilteredByValue: filteredTodos,
      allTodos: state.todos.allTodos,
    };
  });

  return (
    <main>
      <TodosList
        filteredTodos={todosFilteredByValue}
        allTodos={allTodos}
      />
    </main>
  );
};

export default Main;
