import { useState } from "react";
import { useDispatch } from "react-redux";

import "./Header.css";
import { createTodo } from "../../store/todos/actions";
import AddTodoModal from "../../components/Modals/AddTodoModal";
import TodoInput from "../../components/Inputs/TodoInput";

const formatDate = (date) => {
  const ye = new Intl.DateTimeFormat("ua", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("ua", { month: "2-digit" }).format(date);
  const da = new Intl.DateTimeFormat("ua", { day: "2-digit" }).format(date);
  const ho = new Intl.DateTimeFormat("ua", { hour: "2-digit" }).format(date);
  const mi = new Intl.DateTimeFormat("ua", { minute: "2-digit" }).format(date);

  return `${da}.${mo}.${ye} ${ho}:${mi}`;
};
const date = new Date();
const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);

export default function Header() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  function handleSubmit() {
    const newItem = {
      id: Date.now(),
      title: value,
      isDone: false,
      creationDate: formatDate(date),
      expirationDate: formatDate(nextDay),
    };

    dispatch(createTodo(newItem));
    setValue("");
  }

  return (
    <header>
      <h1>Todo App</h1>
      <span className="header__body">
        <TodoInput
          inputValue={value}
          setInputValue={setValue}
          onKeyDown={handleSubmit}
        />
        <AddTodoModal
          inputTitle={value}
          setInputTitle={setValue}
          creationDate={formatDate(date)}
          expirationDate={formatDate(nextDay)}
        />
      </span>
    </header>
  );
}
