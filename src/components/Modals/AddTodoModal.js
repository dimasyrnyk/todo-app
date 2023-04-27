import { useState } from "react";
import { useDispatch } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import "./Modals.css";
import { createTodo } from "../../store/todos/actions";
import TodoInput from "../Inputs/TodoInput";

const getInitState = (creationDate, expirationDate) => {
  return {
    creationDate: creationDate,
    expirationDate: expirationDate,
  };
};

export default function AddTodoModal({
  inputTitle,
  setInputTitle,
  creationDate,
  expirationDate,
}) {
  const [data, setData] = useState(getInitState(creationDate, expirationDate));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handleCreationDate(moment) {
    const date =
      moment instanceof Object ? moment.format("DD.MM.YYYY HH:mm") : moment;
    setData({ ...data, creationDate: date });
  }

  function handleExpirationDate(moment) {
    const date =
      moment instanceof Object ? moment.format("DD.MM.YYYY HH:mm") : moment;
    setData({ ...data, expirationDate: date });
  }

  function handleSubmit() {
    const newItem = {
      id: Date.now(),
      title: inputTitle,
      isDone: false,
      creationDate: data.creationDate,
      expirationDate: data.expirationDate,
    };

    dispatch(createTodo(newItem));
    setData(getInitState(creationDate, expirationDate));
    setIsOpen(false);
    setInputTitle("");
  }

  function handleClose() {
    setIsOpen(false);
    setData(getInitState(creationDate, expirationDate));
  }

  return (
    <div>
      <button
        className="modal__btn-add"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal__body">
            <h3 className="modal__title">Add todo</h3>
            <span className="modal__row">
              <span className="row__title">Title:</span>
              <TodoInput
                inputValue={inputTitle}
                setInputValue={setInputTitle}
                onKeyDown={handleSubmit}
              />
            </span>
            <span className="modal__row">
              <span className="row__title">Creation date: </span>
              <Datetime
                inputProps={{ className: "modal__datetime" }}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                initialValue={data.creationDate}
                onChange={handleCreationDate}
              />
            </span>
            <span className="modal__row">
              <span className="row__title">Expiration date: </span>
              <Datetime
                inputProps={{ className: "modal__datetime" }}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                initialValue={data.expirationDate}
                onChange={handleExpirationDate}
              />
            </span>
            <div className="modal__controls-wrapper">
              <button
                className="modal__controls-btn"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="modal__controls-btn"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
