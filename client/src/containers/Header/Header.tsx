import { FC, useState } from "react";

import "./Header.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { createTodo } from "@store/todos/ActionCreators";
import { ICreateTodoDto } from "@constants/todo";
import { InputPlaceholder } from "@constants/app";
import { getDate } from "@utils/dateUtils";
import TodoModal from "@components/TodoModal/TodoModal";
import TodoInput from "@components/Inputs/TodoInput";
import Search from "@components/Search/Search";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import PlusIcon from "@components/Icons/PlusIcon";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleSubmit(start = getDate(), end = getDate(1)) {
    if (user) {
      const newItem: ICreateTodoDto = {
        title: value,
        isCompleted: false,
        creationDate: start,
        expirationDate: end,
        creator: user.id,
      };

      dispatch(createTodo(newItem));
      setValue("");
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
          <PrimaryBtn
            className="header__btn-add"
            onClick={handleOpen}
          >
            <PlusIcon />
          </PrimaryBtn>
        </div>
        <Search />
        {isOpen && (
          <TodoModal
            modalTitle="Add todo"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            inputTitle={value}
            setInputTitle={setValue}
            start={getDate()}
            end={getDate(1)}
            onSave={handleSubmit}
          />
        )}
      </span>
    </header>
  );
};

export default Header;
