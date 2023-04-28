import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import "./Header.scss";
import { createTodo } from "../../store/todos/actions";
import AddTodoModal from "../../components/Modals/AddTodoModal";
import TodoInput from "../../components/Inputs/TodoInput";

export default function Header() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  function handleSubmit() {
    const date = moment().format("DD.MM.YYYY HH:mm");
    const nextDay = moment().add(1, "days").format("DD.MM.YYYY HH:mm");

    const newItem = {
      id: Date.now(),
      title: value,
      isDone: false,
      creationDate: date,
      expirationDate: nextDay,
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
        />
      </span>
    </header>
  );
}
