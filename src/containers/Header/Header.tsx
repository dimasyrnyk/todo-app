import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

import "./Header.scss";
import { timeNow, tomorrow } from "../../utils/dateUtils";
import TodoModal from "../../components/TodoModal/TodoModal";
import TodoInput from "../../components/Inputs/TodoInput";
import { createTodo, searchTodos } from "../../store/todos/actions";
import { AppDispatch, RootState } from "../../store";
import { ITodo } from "../../types/todo";
import { InputPlaceholder } from "../../types/app";
import Search from "../../components/Search/Search";

const Header: FC = () => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchValue = useSelector(
    (state: RootState) => state.todos.searchValue
  );
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
    if (searchValue) {
      dispatch(searchTodos(""));
    }
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <header>
      <h1>Todo App</h1>
      <span className="header__body">
        <div className="header__add-todo-section">
          <TodoInput
            inputValue={value}
            setInputValue={setValue}
            onKeyDown={handleSubmit}
            placeholder={InputPlaceholder.EnterTodo}
          />
          <button
            className="header__btn-add"
            onClick={handleOpen}
          >
            <FaPlus />
          </button>
        </div>
        <Search />
        {isOpen && (
          <TodoModal
            modalTitle="Add todo"
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
