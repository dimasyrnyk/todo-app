import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { TfiTrash } from "react-icons/tfi";
import { TfiPencil } from "react-icons/tfi";

import "./Todos.scss";
import { completeTodo, deleteTodo, editTodo } from "../../store/todos/actions";
import TodoBtn from "../TodoBtn/TodoBtn";
import { ITodo } from "../../types/todo";
import { AppDispatch } from "../../store";
import TodoModal from "../TodoModal/TodoModal";

type Props = {
  todo: ITodo;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = todo.isCompleted ? " checked" : "";
  const dispatch: AppDispatch = useDispatch();

  function handleSubmit(start: string, end: string) {
    const newItem: ITodo = {
      id: todo.id,
      title: title,
      isCompleted: false,
      creationDate: start,
      expirationDate: end,
    };

    dispatch(editTodo(newItem));
  }

  function toggleCheckbox() {
    dispatch(completeTodo(todo.id));
  }

  function handleRemove() {
    dispatch(deleteTodo(todo.id));
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <li className={"todo-item" + classes}>
      <label className="todo-item__checkbox_label">
        <input
          className="todo-item__checkbox"
          aria-label="an appropriate label"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={toggleCheckbox}
        />
      </label>
      <div className="todo-item__container">
        <div className="todo-item__dates">
          <span>Created at: {todo.creationDate}</span>
          <span>Expired at: {todo.expirationDate}</span>
        </div>
        <div className={"todo-item__title" + classes}>{todo.title}</div>
      </div>
      <span className="todo-item__btn-wrapper">
        <TodoBtn
          showButton={!todo.isCompleted}
          onClick={handleOpen}
        >
          <TfiPencil />
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
          <TfiTrash />
        </TodoBtn>
      </span>
    </li>
  );
};

export default TodoItem;
