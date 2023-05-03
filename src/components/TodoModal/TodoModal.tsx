import { useState, FC, useEffect } from "react";
import { DateTime } from "luxon";

import "./TodoModal.scss";
import TodoInput from "../Inputs/TodoInput";
import {
  nextDay,
  formatLocaleToISO,
  formatISOToLocale,
} from "../../utils/dateUtils";

type Props = {
  modalTitle: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  start: string;
  end: string;
  onSave: (startDate: string, endDate: string) => void;
  inputTitle: string;
  setInputTitle: (value: string) => void;
};

const TodoModal: FC<Props> = ({
  modalTitle,
  isOpen,
  setIsOpen,
  start,
  end,
  onSave,
  inputTitle,
  setInputTitle,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    setStartDate(start);
    setEndDate(end);
  }, [isOpen]);

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const startDateObj: DateTime = DateTime.fromISO(e.target.value);
    const endDateObj: DateTime = DateTime.fromFormat(
      endDate,
      "dd.MM.yyyy HH:mm"
    );

    setStartDate(startDateObj.toFormat("dd.MM.yyyy HH:mm"));

    if (startDateObj > endDateObj) {
      const newEndDate: string = startDateObj
        .plus({ days: 1 })
        .toFormat("dd.MM.yyyy HH:mm");
      setEndDate(newEndDate);
    }
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(formatISOToLocale(e.target.value));
  }

  function handleSave() {
    onSave(startDate, endDate);
    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="modal">
      <div className="modal__body">
        <h3 className="modal__title">{modalTitle}</h3>
        <span className="modal__row">
          <span className="row__title">Title:</span>
          <TodoInput
            inputValue={inputTitle}
            setInputValue={setInputTitle}
            onKeyDown={handleSave}
          />
        </span>

        <span className="modal__row">
          <label
            className="row__title"
            htmlFor="startDate"
          >
            Creation date:{" "}
          </label>
          <input
            id="startDate"
            className="row__datetime-input"
            type="datetime-local"
            value={formatLocaleToISO(startDate)}
            onChange={handleStartDateChange}
            min={formatLocaleToISO(start)}
          />
        </span>
        <span className="modal__row">
          <label
            className="row__title"
            htmlFor="endDate"
          >
            Expiration date:{" "}
          </label>
          <input
            id="endDate"
            className="row__datetime-input"
            type="datetime-local"
            value={formatLocaleToISO(endDate)}
            onChange={handleEndDateChange}
            min={formatLocaleToISO(nextDay(startDate))}
          />
        </span>
        <div className="modal__controls-wrapper">
          <button
            className="modal__controls-btn"
            onClick={handleSave}
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
  );
};

export default TodoModal;
