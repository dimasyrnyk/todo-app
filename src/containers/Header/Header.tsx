import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";

import "./Header.scss";
import { timeNow, tomorrow } from "../../utils/dateUtils";
import TodoModal from "../../components/TodoModal/TodoModal";
import TodoInput from "../../components/Inputs/TodoInput";
import { createTodo } from "../../store/todos/actions";
import { AppDispatch } from "../../store";
import { ITodo } from "../../types/todo";

const Header: FC = () => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  function handleSubmit(start = timeNow(), end = tomorrow()) {
    const newItem: ITodo = {
      id: Date.now().toString(),
      title: value,
      isCompleted: false,
      creationDate: start,
      expirationDate: end,
    };

    dispatch(createTodo(newItem));
    setValue("");
  }

  function handleOpen() {
    setIsOpen(true);
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

        <button
          className="header__btn-add"
          onClick={handleOpen}
        >
          <FaPlus />
        </button>

        {isOpen && (
          <TodoModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            inputTitle={value}
            setInputTitle={setValue}
            start={timeNow()}
            end={tomorrow()}
            onSave={handleSubmit}
          />
        )}
      </span>
    </header>
  );
};

export default Header;
