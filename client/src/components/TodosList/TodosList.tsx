import { FC, RefObject, useState } from "react";

import "./TodosList.scss";
import { useAppSelector } from "src/hooks/redux";
import { NavBarTabs } from "@constants/app";
import TodoItem from "@components/TodoItem/TodoItem";
import Pagination from "@components/Pagination/Pagination";
import { ITodoDto } from "@constants/todo";

type Props = {
  todos: ITodoDto[];
  scrollToTopRef: RefObject<HTMLDivElement>;
};

const TodosList: FC<Props> = ({ todos, scrollToTopRef }) => {
  const { activeTab } = useAppSelector((state) => state.todos);
  const [currentTodos, setCurrentTodos] = useState<ITodoDto[]>([]);

  if (!todos.length) {
    return (
      <div className="todos-list__empty-page">
        No {activeTab !== NavBarTabs.All ? activeTab.toLowerCase() : null} todos
      </div>
    );
  }

  return (
    <>
      <ul>
        {currentTodos.map((i) => (
          <TodoItem
            key={i.id}
            todo={i}
          />
        ))}
      </ul>
      <Pagination
        todos={todos}
        setTodos={setCurrentTodos}
        scrollToTopRef={scrollToTopRef}
      />
    </>
  );
};

export default TodosList;
