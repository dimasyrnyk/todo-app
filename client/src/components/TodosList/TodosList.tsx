import { FC, useEffect, useRef, useState } from "react";

import "./TodosList.scss";
import { useAppSelector } from "src/hooks/redux";
import { CURRENT_PAGE, NavBarTabs } from "@constants/app";
import TodoItem from "@components/TodoItem/TodoItem";
import Pagination from "@components/Pagination/Pagination";
import { ITodoDto } from "@constants/todo";

type Props = {
  todos: ITodoDto[];
};

const TodosList: FC<Props> = ({ todos }) => {
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  const { activeTab } = useAppSelector((state) => state.todos);
  const [currentTodos, setCurrentTodos] = useState<ITodoDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

  useEffect(() => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

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
        setPage={setCurrentPage}
      />
    </>
  );
};

export default TodosList;
