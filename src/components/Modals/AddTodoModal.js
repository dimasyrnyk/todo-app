import { useState } from "react";
import { useDispatch } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { DateTime } from "luxon";

import "./Modals.scss";
import { createTodo } from "../../store/todos/actions";
import TodoInput from "../Inputs/TodoInput";

const now = DateTime.local();
const nextDay = now.plus({ days: 1 });

const isValid = (selectedDate) => {
  const selectedDateTime = DateTime.fromJSDate(selectedDate._d);
  return selectedDateTime > now.plus({ days: -1 });
};

const isValidEndDate = (selectedDate, startDate) => {
  const selectedDateTime = DateTime.fromJSDate(selectedDate._d);
  return selectedDateTime > startDate;
};

export default function AddTodoModal({ inputTitle, setInputTitle }) {
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(nextDay);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function handleStartDate(moment) {
    const date = DateTime.fromJSDate(moment._d);
    setStartDate(date);
    if (date > endDate) {
      setEndDate(date.plus({ days: 1 }));
    }
  }

  function handleEndDate(moment) {
    const date = DateTime.fromJSDate(moment._d);
    setEndDate(date);
  }

  function handleSubmit() {
    const newItem = {
      id: Date.now(),
      title: inputTitle,
      isDone: false,
      creationDate: startDate.toFormat("dd.MM.yyyy HH:mm"),
      expirationDate: endDate.toFormat("dd.MM.yyyy HH:mm"),
    };

    dispatch(createTodo(newItem));
    setStartDate(now);
    setEndDate(nextDay);
    setInputTitle("");
    setIsOpen(false);
  }

  function handleClose() {
    setStartDate(now);
    setEndDate(nextDay);
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
                value={startDate.toFormat("dd.MM.yyyy HH:mm")}
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
                value={endDate.toFormat("dd.MM.yyyy HH:mm")}
                dateFormat="DD.MM.YYYY"
                timeFormat="HH:mm"
                isValidDate={(selected) => isValidEndDate(selected, startDate)}
                onChange={handleEndDate}
                inputProps={{ className: "modal__datetime", readOnly: true }}
              />
            </span>
            <div className="modal__controls-wrapper">
              <button
                className="modal__controls-btn"
                onClick={handleSubmit}
                disabled={!inputTitle}
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
