import { FC } from "react";

import "./Main.scss";
import TodosList from "@components/Todos/TodosList";

const Main: FC = () => {
  return (
    <main>
      <TodosList />
    </main>
  );
};

export default Main;
