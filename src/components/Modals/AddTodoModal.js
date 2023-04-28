import { useState } from "react";
import { useDispatch } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

import "./Modals.scss";
import { createTodo } from "../../store/todos/actions";
import TodoInput from "../Inputs/TodoInput";

const isValid = (current) => {
  const yesterday = moment().subtract(1, "day");
  return current.isAfter(yesterday);
};

const isValidEndDate = (currentDate, selectedDate) => {
  return currentDate.isAfter(selectedDate);
};

export default function AddTodoModal({ inputTitle, setInputTitle }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "day"));
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handleStartDate(date) {
    setStartDate(date);
    if (!endDate.isAfter(date)) {
      const newDate = moment(date);
      setEndDate(newDate.add(1, "day"));
    }
  }

  function handleSubmit() {
    const newItem = {
      id: Date.now(),
      title: inputTitle,
      isDone: false,
      creationDate: startDate.format("DD.MM.YYYY HH:mm"),
      expirationDate: endDate.format("DD.MM.YYYY HH:mm"),
    };

    dispatch(createTodo(newItem));
    setStartDate(moment());
    setEndDate(moment().add(1, "day"));
    setInputTitle("");
    setIsOpen(false);
  }

  function handleClose() {
    setStartDate(moment());
    setEndDate(moment().add(1, "day"));
    setIsOpen(false);
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
                value={startDate}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                isValidDate={isValid}
                onChange={handleStartDate}
                inputProps={{ className: "modal__datetime", readOnly: true }}
              />
            </span>
            <span className="modal__row">
              <span className="row__title">Expiration date: </span>
              <Datetime
                value={endDate}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                isValidDate={(current) => isValidEndDate(current, startDate)}
                onChange={setEndDate}
                inputProps={{ className: "modal__datetime", readOnly: true }}
              />
            </span>
            <div className="modal__controls-wrapper">
              <button
                className="modal__controls-btn"
                onClick={handleSubmit}
                disabled={inputTitle === ""}
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
