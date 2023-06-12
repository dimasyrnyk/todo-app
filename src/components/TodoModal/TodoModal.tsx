import React, { useState, FC, useEffect } from "react";
import { DateTime } from "luxon";

import "./TodoModal.scss";
import { DateFormats, InputPlaceholder } from "@constants/app";
import {
  getDate,
  formatLocaleToISO,
  formatISOToLocale,
} from "@utils/dateUtils";
import PrimaryBtn from "@components/Buttons/PrimaryBtn/PrimaryBtn";
import TodoInput from "../Inputs/TodoInput";

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
      DateFormats.localFormat
    );

    setStartDate(startDateObj.toFormat(DateFormats.localFormat));

    if (startDateObj > endDateObj) {
      const newEndDate: string = startDateObj
        .plus({ days: 1 })
        .toFormat(DateFormats.localFormat);
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
    <div className="modal ">
      <div className="modal__body background">
        <h3 className="modal__title">{modalTitle}</h3>
        <span className="modal__row">
          <span className="row__title">Title:</span>
          <TodoInput
            inputValue={inputTitle}
            setInputValue={setInputTitle}
            onKeyDown={handleSave}
            placeholder={InputPlaceholder.EnterTodo}
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
            className="row__datetime-input background text"
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
            className="row__datetime-input background text"
            type="datetime-local"
            value={formatLocaleToISO(endDate)}
            onChange={handleEndDateChange}
            min={formatLocaleToISO(getDate(1, startDate))}
          />
        </span>
        <div className="modal__controls-wrapper">
          <PrimaryBtn
            className="modal__controls-btn"
            title="Save"
            onClick={handleSave}
            disabled={!inputTitle}
          />
          <PrimaryBtn
            className="modal__controls-btn"
            title="Close"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
