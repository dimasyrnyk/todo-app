import { FC, useContext, useState } from "react";
import { useDispatch } from "react-redux";

import "./TodoItem.scss";
import { AppDispatch } from "@store/index";
import { deleteTodo, editTodo } from "@store/todos/actions";
import { ThemeContext } from "@context/ThemeContext";
import { ITodoDto } from "@constants/todo";
import TodoBtn from "@components/Buttons/TodoBtn/TodoBtn";
import TodoModal from "@components/TodoModal/TodoModal";
import PencilIcon from "@components/Icons/PencilIcon";
import TrashIcon from "@components/Icons/TrashIcon";

type Props = {
  todo: ITodoDto;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState<string>(todo.title);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = todo.isCompleted ? " checked" : "";

  function handleSubmit(start: string, end: string) {
    const newItem: ITodoDto = {
      id: todo.id,
      title: title,
      isCompleted: false,
      creationDate: start,
      expirationDate: end,
    };

    dispatch(editTodo(newItem));
  }

  function toggleComplete() {
    const newItem: ITodoDto = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    dispatch(editTodo(newItem));
  }

  function handleRemove() {
    dispatch(deleteTodo(todo.id));
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <li className={"todo-item item-" + theme + classes}>
      <label className="todo-item__checkbox_label">
        <input
          className="todo-item__checkbox"
          aria-label="an appropriate label"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={toggleComplete}
        />
      </label>
      <div className="todo-item__container">
        <div className={"todo-item__dates dates-" + theme}>
          <span>Created on: {todo.creationDate}</span>
          <span>Expires on: {todo.expirationDate}</span>
        </div>
        <div className={"todo-item__title" + classes}>{todo.title}</div>
      </div>
      <span className="todo-item__btn-wrapper">
        <TodoBtn
          showButton={!todo.isCompleted}
          onClick={handleOpen}
        >
          <PencilIcon />
        </TodoBtn>

        {isOpen && (
          <TodoModal
            modalTitle="Edit todo"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            inputTitle={title}
            setInputTitle={setTitle}
            start={todo.creationDate}
            end={todo.expirationDate}
            onSave={handleSubmit}
          />
        )}

        <TodoBtn onClick={handleRemove}>
          <TrashIcon />
        </TodoBtn>
      </span>
    </li>
  );
};

export default TodoItem;
