import { FC } from "react";
import { useSelector } from "react-redux";

import "./Main.scss";
import TodosList from "../../components/Todos/TodosList";
import { RootState } from "../../store";

const Main: FC = () => {
  const todos = useSelector((state: RootState) => state.todos);

  return (
    <main>
      <TodosList todos={todos} />
    </main>
  );
};

export default Main;
