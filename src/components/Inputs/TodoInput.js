import { useState } from "react";
import "./Input.css";

export default function TodoInput({ inputValue, setInputValue, onKeyDown }) {
  const [showError, setShowError] = useState(false);

  function handleChange(event) {
    const str = event.target.value;
    const regex = /^[^`~!?@#$%^&*()_+=[\]{};':"\\|,.<>/]*$/;

    if (regex.test(str) && str.trim().length !== 0) {
      setInputValue(event.target.value);
    } else {
      setShowError(true);
      setInputValue("");
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (inputValue !== "") {
        onKeyDown();
      }
    }
  }

  return (
    <span className="input__container">
      <form className="input__wrapper">
        <input
          className="input__body"
          type="text"
          value={inputValue}
          placeholder="Enter your todo..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>

      {showError ? (
        <div className="input__error">
          {`~!?@#$%^&*()_+=[\\]{};':"\\\\|,.<>\\/"`} are not allowed!
        </div>
      ) : null}
    </span>
  );
}
